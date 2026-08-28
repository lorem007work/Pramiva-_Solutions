<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

// Rules MUST mirror src/lib/validation.ts:
// name 2-100 | email valid, <=200 | company OPTIONAL, <=150
// phone <=30 optional | interest optional, MUST be one of INTEREST_OPTIONS
// message 10-3000
// website MUST be empty (honeypot) | loadedAt >=2 seconds ago
// rate limit: 5 attempts per IP in 10 minutes
//
// `interest` is whitelisted rather than accepted as free text. Its value is
// written into an email that staff will open, so it is attacker-controlled
// until proven otherwise. Keep this list identical to `contactInterests` in
// src/lib/validation.ts — the client's copy is never trusted, it is re-checked
// here, so the two drifting apart shows up as a rejected valid submission.
const INTEREST_OPTIONS = [
    'Digital Marketing',
    'Customer Service and Systems',
    'AI and Automation',
    'Careers',
    'Something Else',
];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function textValue(array $input, string $key): string
{
    $value = $input[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
}

function sameOriginRequest(): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return true;
    }

    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    $requestHost = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    $requestHost = preg_replace('/:\d+$/', '', $requestHost) ?? '';

    return $originHost !== '' && hash_equals($requestHost, $originHost);
}

function rateLimitAllowed(string $ipAddress): ?bool
{
    $directory = defined('RATE_LIMIT_DIR')
        ? (string) RATE_LIMIT_DIR
        : sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'pramiva-contact-rate';

    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        return null;
    }

    // Sweep on ~1% of requests. One file per IP, never pruned, grows toward
    // inode exhaustion under IPv6 rotation.
    if (random_int(1, 100) === 1) {
        $stale = time() - 600;
        foreach (glob($directory . DIRECTORY_SEPARATOR . '*.json') ?: [] as $file) {
            if (@filemtime($file) < $stale) {
                @unlink($file);
            }
        }
    }

    $path = $directory . DIRECTORY_SEPARATOR . hash('sha256', $ipAddress) . '.json';
    $handle = fopen($path, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return null;
    }

    $contents = stream_get_contents($handle);
    $decoded = is_string($contents) ? json_decode($contents, true) : [];
    $timestamps = is_array($decoded) ? $decoded : [];
    $cutoff = time() - 600;
    $timestamps = array_values(array_filter(
        $timestamps,
        static fn ($timestamp): bool => is_int($timestamp) && $timestamp >= $cutoff,
    ));

    $allowed = count($timestamps) < 5;
    if ($allowed) {
        $timestamps[] = time();
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($timestamps));
        fflush($handle);
    }

    flock($handle, LOCK_UN);
    fclose($handle);

    return $allowed;
}

function logDeliveryError(string $message): void
{
    $entry = sprintf("[%s] %s%s", gmdate('c'), $message, PHP_EOL);

    if (defined('CONTACT_ERROR_LOG')) {
        error_log($entry, 3, (string) CONTACT_ERROR_LOG);
        return;
    }

    error_log($entry);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

if (!sameOriginRequest()) {
    respond(403, ['ok' => false, 'message' => 'This request could not be accepted.']);
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (str_contains($contentType, 'application/json')) {
    $decoded = json_decode((string) file_get_contents('php://input'), true);
    $input = is_array($decoded) ? $decoded : [];
} else {
    $input = $_POST;
}

// Honeypot: report success without sending so automated submitters learn nothing.
if (textValue($input, 'website') !== '') {
    respond(200, ['ok' => true, 'message' => 'Thank you.']);
}

$loadedAt = $input['loadedAt'] ?? 0;
$loadedAt = is_numeric($loadedAt) ? (int) $loadedAt : 0;
$elapsedMilliseconds = (int) round(microtime(true) * 1000) - $loadedAt;
if ($loadedAt <= 0 || $elapsedMilliseconds < 2000 || $elapsedMilliseconds > 86400000) {
    respond(400, [
        'ok' => false,
        'message' => 'Please wait a moment, then try again.',
    ]);
}

$name = textValue($input, 'name');
$email = textValue($input, 'email');
$company = textValue($input, 'company');
$phone = textValue($input, 'phone');
$interest = textValue($input, 'interest');
$message = textValue($input, 'message');
$errors = [];

if (textLength($name) < 2 || textLength($name) > 100) {
    $errors['name'] = 'Enter your name using 2 to 100 characters.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || textLength($email) > 200) {
    $errors['email'] = 'Enter a valid email address.';
}
// Optional: only the ceiling applies, and only if something was typed.
if (textLength($company) > 150) {
    $errors['company'] = 'Enter a company name using up to 150 characters.';
}
if (textLength($phone) > 30) {
    $errors['phone'] = 'Enter a phone number using up to 30 characters.';
}
if ($interest !== '' && !in_array($interest, INTEREST_OPTIONS, true)) {
    $errors['interest'] = 'Choose one of the listed options.';
}
if (textLength($message) < 10 || textLength($message) > 3000) {
    $errors['message'] = 'Enter a message using 10 to 3,000 characters.';
}

if ($errors !== []) {
    respond(422, [
        'ok' => false,
        'message' => 'Check the highlighted fields and try again.',
        'errors' => $errors,
    ]);
}

$documentRoot = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), DIRECTORY_SEPARATOR);
$defaultConfig = $documentRoot === ''
    ? ''
    : dirname($documentRoot) . DIRECTORY_SEPARATOR . 'pramiva-mail-config.php';
$configPath = getenv('PRAMIVA_MAIL_CONFIG') ?: $defaultConfig;

if ($configPath === '' || !is_readable($configPath)) {
    logDeliveryError('Private mail configuration is missing or unreadable.');
    respond(503, [
        'ok' => false,
        'message' => 'The form is not ready to send enquiries yet. Please try again later.',
    ]);
}

require $configPath;

$rateLimit = rateLimitAllowed((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
if ($rateLimit === null) {
    respond(503, [
        'ok' => false,
        'message' => 'The form is temporarily unavailable. Please try again later.',
    ]);
}
if ($rateLimit === false) {
    respond(429, [
        'ok' => false,
        'message' => 'Too many enquiries were sent. Please try again in 10 minutes.',
    ]);
}

$requiredConstants = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_SECURE',
    'SMTP_USER',
    'SMTP_PASS',
    'MAIL_FROM_NAME',
    'MAIL_TO',
];
foreach ($requiredConstants as $constant) {
    if (!defined($constant) || constant($constant) === '') {
        logDeliveryError('Private mail configuration is incomplete.');
        respond(503, [
            'ok' => false,
            'message' => 'The form is not ready to send enquiries yet. Please try again later.',
        ]);
    }
}

require_once __DIR__ . '/lib/Exception.php';
require_once __DIR__ . '/lib/PHPMailer.php';
require_once __DIR__ . '/lib/SMTP.php';

try {
    // Flatten every single-line field, not just header ones: interior newlines
    // let a sender forge extra body lines. Only $message stays multi-line.
    $flatten = static fn (string $value): string =>
        preg_replace('/[\r\n]+/', ' ', $value) ?? $value;

    $safeName = $flatten($name);
    $safeCompany = $flatten($company);
    $safePhone = $flatten($phone);
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string) SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = (string) SMTP_USER;
    $mail->Password = (string) SMTP_PASS;
    $mail->SMTPSecure = (string) SMTP_SECURE;
    $mail->Port = (int) SMTP_PORT;
    $mail->Timeout = 10;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;

    $mail->setFrom((string) SMTP_USER, (string) MAIL_FROM_NAME);
    $mail->addAddress((string) MAIL_TO);
    $mail->addReplyTo($email, $safeName);
    $mail->Subject = 'New website enquiry from ' . $safeName;
    $mail->Body = implode(PHP_EOL, [
        'Name: ' . $safeName,
        'Email: ' . $email,
        'Company: ' . ($safeCompany !== '' ? $safeCompany : 'Not provided'),
        'Phone: ' . ($safePhone !== '' ? $safePhone : 'Not provided'),
        'Area of interest: ' . ($interest !== '' ? $interest : 'Not specified'),
        '',
        'Message:',
        $message,
    ]);
    $mail->send();

    respond(200, [
        'ok' => true,
        'message' => 'Thank you. We will respond as soon as we can.',
    ]);
} catch (Exception $exception) {
    logDeliveryError('SMTP delivery failed: ' . $exception->getMessage());
    respond(502, [
        'ok' => false,
        'message' => 'We could not send your enquiry. Please try again in a moment.',
    ]);
}

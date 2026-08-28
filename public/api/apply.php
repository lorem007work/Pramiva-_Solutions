<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

const APPLICATION_ROLES = [
    'Sales',
    'Marketing',
    'Graphic Design',
    'General Application',
];

const APPLICATION_MAX_CV_BYTES = 5 * 1024 * 1024;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function applicationRespond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function applicationText(array $input, string $key): string
{
    $value = $input[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function applicationTextLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
}

function applicationSameOrigin(): bool
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

function applicationRateLimitAllowed(string $ipAddress): ?bool
{
    $directory = defined('APPLICATION_RATE_LIMIT_DIR')
        ? (string) APPLICATION_RATE_LIMIT_DIR
        : sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'pramiva-application-rate';

    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        return null;
    }

    if (random_int(1, 100) === 1) {
        $stale = time() - 3600;
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
    $cutoff = time() - 3600;
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

function applicationLogError(string $message): void
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
    applicationRespond(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

if (!applicationSameOrigin()) {
    applicationRespond(403, [
        'ok' => false,
        'message' => 'This request could not be accepted.',
    ]);
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (!str_contains($contentType, 'multipart/form-data')) {
    applicationRespond(415, [
        'ok' => false,
        'message' => 'Submit the application form with a PDF CV.',
    ]);
}

if (applicationText($_POST, 'website') !== '') {
    applicationRespond(200, [
        'ok' => true,
        'message' => 'Thank you. Your application has been received.',
    ]);
}

$name = applicationText($_POST, 'name');
$email = applicationText($_POST, 'email');
$phone = applicationText($_POST, 'phone');
$address = applicationText($_POST, 'address');
$role = applicationText($_POST, 'role');
$introduction = applicationText($_POST, 'introduction');
$academyAgreement = applicationText($_POST, 'academyAgreement');
$errors = [];

if (applicationTextLength($name) < 2 || applicationTextLength($name) > 100) {
    $errors['name'] = 'Enter your full name using 2 to 100 characters.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || applicationTextLength($email) > 200) {
    $errors['email'] = 'Enter a valid email address.';
}
if (applicationTextLength($phone) < 7 || applicationTextLength($phone) > 30) {
    $errors['phone'] = 'Enter a phone number using 7 to 30 characters.';
}
if (applicationTextLength($address) < 3 || applicationTextLength($address) > 300) {
    $errors['address'] = 'Enter your current address using 3 to 300 characters.';
}
if (!in_array($role, APPLICATION_ROLES, true)) {
    $errors['role'] = 'Choose one of the listed positions.';
}
if (
    applicationTextLength($introduction) < 20 ||
    applicationTextLength($introduction) > 2000
) {
    $errors['introduction'] = 'Introduce yourself using 20 to 2,000 characters.';
}
if ($academyAgreement !== 'yes') {
    $errors['academyAgreement'] =
        'Confirm that you agree to complete the mandatory Academy assessment.';
}

$cv = $_FILES['cv'] ?? null;
$cvPath = '';
if (!is_array($cv) || (int) ($cv['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    $errors['cv'] = 'Upload your CV as a PDF file.';
} else {
    $cvPath = is_string($cv['tmp_name'] ?? null) ? $cv['tmp_name'] : '';
    $cvName = is_string($cv['name'] ?? null) ? $cv['name'] : '';
    $cvSize = is_int($cv['size'] ?? null) ? $cv['size'] : (int) ($cv['size'] ?? 0);

    if ($cvSize <= 0) {
        $errors['cv'] = 'Upload your CV as a PDF file.';
    } elseif ($cvSize > APPLICATION_MAX_CV_BYTES) {
        $errors['cv'] = 'Upload a PDF no larger than 5 MB.';
    } elseif (strtolower((string) pathinfo($cvName, PATHINFO_EXTENSION)) !== 'pdf') {
        $errors['cv'] = 'Upload your CV as a PDF file.';
    } elseif ($cvPath === '' || !is_uploaded_file($cvPath)) {
        $errors['cv'] = 'The CV upload could not be verified.';
    } elseif (!function_exists('finfo_open')) {
        applicationLogError('The PHP fileinfo extension is unavailable.');
        applicationRespond(503, [
            'ok' => false,
            'message' => 'CV uploads are temporarily unavailable. Please try again later.',
        ]);
    } else {
        $fileInfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = $fileInfo === false ? '' : (string) finfo_file($fileInfo, $cvPath);
        if ($fileInfo !== false) {
            finfo_close($fileInfo);
        }

        $handle = fopen($cvPath, 'rb');
        $signature = $handle === false ? '' : (string) fread($handle, 5);
        if (is_resource($handle)) {
            fclose($handle);
        }

        if ($mimeType !== 'application/pdf' || $signature !== '%PDF-') {
            $errors['cv'] = 'Upload your CV as a valid PDF file.';
        }
    }
}

if ($errors !== []) {
    applicationRespond(422, [
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
    applicationLogError('Private mail configuration is missing or unreadable.');
    applicationRespond(503, [
        'ok' => false,
        'message' => 'The application form is not ready yet. Please try again later.',
    ]);
}

require $configPath;

$rateLimit = applicationRateLimitAllowed((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
if ($rateLimit === null) {
    applicationRespond(503, [
        'ok' => false,
        'message' => 'The application form is temporarily unavailable. Please try again later.',
    ]);
}
if ($rateLimit === false) {
    applicationRespond(429, [
        'ok' => false,
        'message' => 'Too many applications were submitted. Please try again later.',
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
        applicationLogError('Private mail configuration is incomplete.');
        applicationRespond(503, [
            'ok' => false,
            'message' => 'The application form is not ready yet. Please try again later.',
        ]);
    }
}

require_once __DIR__ . '/lib/Exception.php';
require_once __DIR__ . '/lib/PHPMailer.php';
require_once __DIR__ . '/lib/SMTP.php';

function applicationMailer(): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string) SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = (string) SMTP_USER;
    $mail->Password = (string) SMTP_PASS;
    $mail->SMTPSecure = (string) SMTP_SECURE;
    $mail->Port = (int) SMTP_PORT;
    $mail->Timeout = 15;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    // Not MAIL_FROM_NAME — that reads "Website enquiry", which is wrong on a
    // job application and on the receipt the candidate gets back.
    $fromName = defined('CAREERS_MAIL_FROM_NAME') && CAREERS_MAIL_FROM_NAME !== ''
        ? (string) CAREERS_MAIL_FROM_NAME
        : 'Pramiva Careers';
    $mail->setFrom((string) SMTP_USER, $fromName);
    return $mail;
}

$flatten = static fn (string $value): string =>
    preg_replace('/[\r\n]+/', ' ', $value) ?? $value;
$safeName = $flatten($name);
$safePhone = $flatten($phone);
$safeAddress = $flatten($address);
$safeRole = $flatten($role);
$reference = sprintf(
    'PR-%s-%s',
    gmdate('Ymd'),
    strtoupper(bin2hex(random_bytes(3))),
);
$recipient = defined('CAREERS_MAIL_TO') && CAREERS_MAIL_TO !== ''
    ? (string) CAREERS_MAIL_TO
    : (string) MAIL_TO;

try {
    $recruitmentMail = applicationMailer();
    $recruitmentMail->addAddress($recipient);
    $recruitmentMail->addReplyTo($email, $safeName);
    $recruitmentMail->Subject = sprintf('[%s] %s application — %s', $reference, $safeRole, $safeName);
    $recruitmentMail->Body = implode(PHP_EOL, [
        'Application reference: ' . $reference,
        'Name: ' . $safeName,
        'Email: ' . $email,
        'Phone: ' . $safePhone,
        'Address: ' . $safeAddress,
        'Position: ' . $safeRole,
        'Academy agreement: Confirmed',
        '',
        'Introduction:',
        $introduction,
        '',
        'The applicant CV is attached as a verified PDF.',
    ]);
    $recruitmentMail->addAttachment(
        $cvPath,
        strtolower($reference) . '-cv.pdf',
        PHPMailer::ENCODING_BASE64,
        'application/pdf',
    );
    $recruitmentMail->send();

    try {
        $confirmationMail = applicationMailer();
        $confirmationMail->addAddress($email, $safeName);
        $confirmationMail->Subject = 'Application received — ' . $reference;
        $confirmationMail->Body = implode(PHP_EOL, [
            'Hello ' . $safeName . ',',
            '',
            'Thank you for applying to Pramiva Solutions.',
            'Application reference: ' . $reference,
            'Position: ' . $safeRole,
            '',
            'The recruitment team will review your application. If it is suitable, the Academy administrator will send your Pramiva Academy access instructions.',
            '',
            'Passing the mandatory Academy assessment makes you eligible to continue in the recruitment process. It does not guarantee employment.',
        ]);
        $confirmationMail->send();
    } catch (\Throwable $exception) {
        applicationLogError(
            'Applicant confirmation failed for ' . $reference . ': ' . $exception->getMessage(),
        );
    }

    applicationRespond(200, [
        'ok' => true,
        'reference' => $reference,
        'message' => 'Your application has been submitted successfully.',
    ]);
} catch (\Throwable $exception) {
    applicationLogError('Application delivery failed: ' . $exception->getMessage());
    applicationRespond(502, [
        'ok' => false,
        'message' => 'We could not submit your application. Please try again in a moment.',
    ]);
}

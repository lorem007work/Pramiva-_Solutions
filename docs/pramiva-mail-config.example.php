<?php

// Copy this file to /home/YOUR_CPANEL_USER/pramiva-mail-config.php.
// It must remain outside public_html and must never be committed with secrets.

define('SMTP_HOST', 'mail.example.com');
define('SMTP_PORT', 465);
define('SMTP_SECURE', 'ssl');
define('SMTP_USER', 'website@example.com');
define('SMTP_PASS', 'REPLACE_WITH_A_STRONG_MAILBOX_PASSWORD');
define('MAIL_FROM_NAME', 'Website enquiry');
define('MAIL_TO', 'inbox@example.com');

// Both paths must be writable by PHP and should remain outside public_html.
define('RATE_LIMIT_DIR', '/home/YOUR_CPANEL_USER/private/pramiva-rate-limit');
define('CONTACT_ERROR_LOG', '/home/YOUR_CPANEL_USER/private/pramiva-contact-errors.log');

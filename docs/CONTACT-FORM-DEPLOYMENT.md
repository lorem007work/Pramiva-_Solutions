# Contact form deployment

The frontend and PHP handler are complete. Delivery intentionally fails visibly until the private mail configuration is installed on cPanel.

## Information still required

- The public email address shown on the website (Q7).
- The mailbox that should receive enquiries (Q10).
- SMTP host, port, security mode, username and password for a domain mailbox.

## cPanel setup

1. Copy `docs/pramiva-mail-config.example.php` to `/home/YOUR_CPANEL_USER/pramiva-mail-config.php`.
2. Replace every example value with the real SMTP and destination details.
3. Create `/home/YOUR_CPANEL_USER/private/` and ensure PHP can write to it.
4. Keep the configuration outside `public_html`. Never upload it with the static export.
5. Upload the built `out/` contents. Confirm `api/contact.php` and the four `api/lib/` files are present.
6. Send one real enquiry and confirm it reaches the destination inbox and that Reply-To uses the visitor's email.
7. Test invalid input, a filled honeypot, a submission under two seconds, and the sixth request inside ten minutes.

The handler returns an error whenever configuration or SMTP delivery fails. It never reports success unless PHPMailer confirms delivery.

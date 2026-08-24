# Deployment runbook — cPanel

**Target:** `pramivasolutions.com.np` → `110.232.143.166` (LiteSpeed, cPanel)
**Artifact:** `deploy/pramiva-site.zip`
**Rollback:** `deploy/pramiva-site-previous.zip`

---

## State at first deploy (2026-08-24)

- DNS resolves ✅ — the domain went live overnight
- `public_html` contains only `cgi-bin` and `php.ini` — **the site has never been uploaded**, nothing to overwrite
- Served on **port 80 only**; AutoSSL has not issued a certificate yet
- Directory listing is **enabled** — the empty web root is publicly browsable. Uploading `index.html` fixes this by itself.

---

## Build the artifact

```bash
npm run lint && npm run build     # must both pass; emits out/
```

Then package. **Do not use PowerShell `Compress-Archive` or `ZipFile::CreateFromDirectory`** — on PowerShell 5.1 both write Windows backslash separators, which violate ZIP spec 4.4.17.1. cPanel's extractor then creates literal files named `about\index.html` instead of directories, and every page except the homepage 404s. Use the loop in this file's git history, or any tool that writes forward slashes.

Verify before uploading:

| Check | Expected |
|---|---|
| Backslash entries in archive | **0** |
| `.htaccess` present | yes — dotfiles are the thing zip tools drop |
| `api/contact.php` + 3 `api/lib/*.php` | present |
| `about/`, `services/`, `careers/`, `contact/` index.html | present |
| Any `*config*.php` | **none** — a leak means SMTP credentials are shipping publicly |

---

## Step 1 — Upload the site

1. cPanel → **File Manager** → `public_html`
2. **Settings → Show Hidden Files (dotfiles)** — turn this on now. `.htaccess` is invisible otherwise, and a missing `.htaccess` is a silent failure: no HTTPS redirect, no 404 page, no caching, no `noindex` guard.
3. Upload `deploy/pramiva-site.zip`
4. Select it → **Extract** → into `public_html`
5. Delete the zip from the server
6. Confirm `.htaccess`, `index.html` and `api/contact.php` are all present

Leave `cgi-bin` and `php.ini` alone.

## Step 2 — Enable HTTPS

cPanel → **SSL/TLS Status** → select the domain → **Run AutoSSL**.

Wait for the certificate before testing. The `.htaccess` forces HTTP→HTTPS, so until the certificate exists the redirect sends visitors to a URL that cannot be served.

Then confirm `https://pramivasolutions.com.np` loads with a valid padlock.

## Step 3 — Mail configuration (required for the form)

The form deliberately returns a visible "not ready to send" error until this exists. It never reports false success.

1. Create the mailbox in cPanel → **Email Accounts** (e.g. `website@pramivasolutions.com.np`)
2. Create `/home/YOUR_CPANEL_USER/private/` — **outside** `public_html`
3. Copy `docs/pramiva-mail-config.example.php` to `/home/YOUR_CPANEL_USER/pramiva-mail-config.php`

   The handler resolves this path as `dirname(DOCUMENT_ROOT)/pramiva-mail-config.php`, so with a document root of `/home/user/public_html` it must sit at `/home/user/pramiva-mail-config.php`.
4. Fill in every constant: `SMTP_HOST` `SMTP_PORT` `SMTP_SECURE` `SMTP_USER` `SMTP_PASS` `MAIL_FROM_NAME` `MAIL_TO`, plus `RATE_LIMIT_DIR` and `CONTACT_ERROR_LOG` pointing inside `private/`
5. Ensure PHP can write to `private/`

**Never** place this file in `public_html`, in `public/`, or in the repository.

## Step 4 — Verify the form

- [ ] One real enquiry arrives at `MAIL_TO`
- [ ] `Reply-To` is the visitor's address, not the mailbox
- [ ] Invalid input is rejected with field-level errors
- [ ] A filled honeypot returns success but sends nothing
- [ ] A submission under 2 seconds is rejected
- [ ] The 6th request inside 10 minutes returns 429
- [ ] A direct `POST` to `contact.php` with junk is rejected — the JS bundle is public, so PHP is the real gate

---

## 🔴 Before this is a public launch

The deployed build still carries **three placeholders** — display email (Q7), phone (Q8), postal address (Q27) — and unapproved `[DRAFT]` copy.

`.htaccess` therefore sends `X-Robots-Tag: noindex, nofollow`. **Leave it.** Removing it is a numbered Phase 9 step. An indexed placeholder page outlives the deploy that created it, and getting it out of a search index is far slower than keeping it out.

Treat this deploy as a **review URL for management**, not a launch.

## Rollback

Re-extract `deploy/pramiva-site-previous.zip` over `public_html`. Always rotate the current archive to `-previous` before building a new one — there is no staging host and no rollback button.

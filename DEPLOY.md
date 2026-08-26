# Deploying to cPanel

Target: **`/home/hardtrex/pramivasolutions.com.np/`**

Upload bundle: **`pramiva-deploy.zip`** — 1.44 MB, 92 files, rebuilt with
`npm run build` then zipped from `out/`.

---

## 🔴 Never upload into `public_html`

On this account `public_html` is a **live WordPress site** for a different
business — it holds `wp-config.php`, `wp-admin`, `wp-content`. Uploading the
Pramiva build there overwrites a running site.

Pramiva is an addon domain. `/home/hardtrex/pramivasolutions.com.np/` is the
only directory you touch.

This account also hosts hardtrex.com.au, academy.hardtrex.com,
demo.hardtrex.live, niraj-dev, turfman-dev and a Moodle data directory. Do not
delete anything outside the Pramiva folder.

---

## Before you start

### 1. Turn on hidden files

File Manager → **Settings** (top right) → tick **Show Hidden Files (dotfiles)**
→ Save.

Do this first. `.htaccess` is hidden by default and carries the HTTPS redirect,
caching, security headers and the 404 page. If it stays invisible you will
neither delete the old one nor notice the new one is missing — the site will
look fine and be silently unprotected.

### 2. Back up, and move the backup out of the web root

Select everything inside `pramivasolutions.com.np`, choose **Compress**, name it
`pramiva-backup-2026-08-26.zip`.

Then move that zip into `/home/hardtrex/_backups`. Left in the web directory it
is downloadable by anyone who guesses the name.

---

## Clear the old build

### 3. Delete everything except four entries

Navigate into `pramivasolutions.com.np` and delete its contents, keeping:

| Entry          | Action     | Why                          |
| -------------- | ---------- | ---------------------------- |
| `cgi-bin`      | **Keep**   | Server directory, not yours  |
| `.well-known`  | **Keep**   | SSL certificate renewal      |
| `.user.ini`    | **Keep**   | PHP settings for the form    |
| `php.ini`      | **Keep**   | PHP settings for the form    |
| everything else| **Delete** | Previous build, replaced     |

**Why delete rather than upload over the top.** A static export only writes the
files it currently produces; it never removes files it used to produce.
Overwriting leaves orphans — that is exactly how a 1.57 MB design mockup ended
up publicly served from the site.

---

## Upload the new build

### 4. Upload the zip

Inside `pramivasolutions.com.np`, click **Upload** and select
`pramiva-deploy.zip`.

One transfer instead of 92, and it cannot half-finish and leave the site broken.

### 5. Extract in place

Right-click `pramiva-deploy.zip` → **Extract** → accept the current directory.

The zip contains the files themselves, not a wrapping folder, so they land
exactly where they belong.

### 6. Delete the zip

Remove `pramiva-deploy.zip` from the web directory once extracted.

### 7. Confirm `.htaccess` arrived

With hidden files showing, check `.htaccess` is present and roughly **5 KB**.
If it is missing or still the old 3.8 KB version, the security headers and the
prefetch fix did not deploy.

---

## Verify

| Check | Expected |
| --- | --- |
| `https://pramivasolutions.com.np/` | Dark hero, tagline, brand mark |
| `/api/error_log` | **403 Forbidden.** Text here means your SMTP host is publicly readable |
| `/sitemap.xml` | Five URLs, all on pramivasolutions.com.np, no `example.com` |
| `http://pramivasolutions.com.np` | Redirects to https |
| Send one real enquiry | Arrives in the inbox — the only proof the PHP handler works |
| About / Services / Careers / Contact | All load, navigation feels instant |
| Load on a phone | No sideways scroll, menu opens and closes |

---

## If something breaks

**Everything 404s except the homepage** — `.htaccess` is missing or was not
extracted. Re-check with hidden files enabled.

**Contact form errors** — the mail config is at
`/home/hardtrex/pramiva_mail_private`, outside the web root, and nothing in this
deployment touches it. Check `.user.ini` and `php.ini` were kept in step 3.

**Undo everything** — delete the web directory contents and extract the dated
backup from `/home/hardtrex/_backups`. This is why step 2 is not optional.

---

## Rebuilding the bundle

```bash
npm run lint && npm run build
```

Then zip the **contents** of `out/` (not the folder) as `pramiva-deploy.zip`.
On Windows PowerShell:

```powershell
Remove-Item -Force pramiva-deploy.zip -ErrorAction SilentlyContinue
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory(
  (Resolve-Path out).Path,
  (Join-Path (Get-Location).Path 'pramiva-deploy.zip'),
  [System.IO.Compression.CompressionLevel]::Optimal,
  $false)
```

Always `Remove-Item -Recurse -Force out, .next` first. Next never cleans `out/`,
so stale files from a previous build accumulate and ship.

---

## Known, unresolved — not fixed by deploying

- The five client brand names on the homepage still lack a documented consent
  citation. See CLAUDE.md rule 4 and `src/data/brands.ts`.
- The homepage H1 carries no service keywords. Service terms survive in the h3
  pillar titles and the lead.

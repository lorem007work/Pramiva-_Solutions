# Content Inventory

**Version:** 1.0
**Date:** 2026-08-23
**Source:** Internal company induction / training material (audio transcript + logo asset)

---

## ⚠ Read this before using anything in this file

Every item below came from **internal induction material**. Brief [documntation.md](../documntation.md) §3 is explicit:

> *"Information obtained from internal induction/training material must not automatically be published publicly."*

Knowing a fact is not the same as being cleared to publish it. This file is a **staging area**, not approved copy.

### Status tags

| Tag | Meaning |
|---|---|
| `[CONFIRMED]` | Management has approved publication in writing |
| `[DRAFT]` | Known from internal material, written up, **awaiting sign-off** — do not publish |
| `[BLOCKED]` | Contradictory or missing — cannot proceed |
| `[RISK]` | Publishing may cause commercial or legal harm — needs explicit written approval, possibly from a third party |

Everything is `[DRAFT]`, `[BLOCKED]` or `[RISK]` until the manager returns the questionnaire.

---

## 1. Company name — mostly resolved ✅

| Spelling | Source | Weight |
|---|---|---|
| **Pramiva** Solutions | Official logo [logo.png](../logo.png) | Designed artwork |
| **pramivasolutions**.com.np | **Registered domain** | Official registration |
| **Promeva** Solutions Private Limited | Spoken audio + transcript | Claimed legal entity |
| **Promea** | Spoken audio, occasional | Mishearing |

**Two independent official artefacts — the logo and the registered domain — agree on "Pramiva".** The transcript's "Promeva" is almost certainly a mishearing of the audio. The website uses **Pramiva Solutions**.

### The one part still open

Whether the **registered legal entity** matches. `.com.np` registration requires submitting company documents, so whoever registered the domain saw the certificate — ask them which name was on it.

If the certificate reads *Promeva Solutions Private Limited* while the domain and logo read *Pramiva*, the public brand and the legal name differ. That is survivable — trading names differ from registered names routinely — but it matters for:

- Privacy Policy and Terms, which name the legal entity
- Invoices and contracts
- `Organization` JSON-LD, which should carry the legal name

Not a build blocker. Worth one message to confirm.

The name still lives **only** in `src/data/site.ts`, so a correction remains a one-line change.

---

## 2. Company facts — `[DRAFT]`

| Fact | Value from source | Publish? | Note |
|---|---|---|---|
| Legal name | Promeva Solutions Private Limited | ☐ | See §1. Verify against registration certificate. |
| Location | Lalitpur, Nepal | ☑ city | Transcript renders it "Lalpur"; confirmed 2026-08-24 as **Lalitpur**. The city is settled, the postal address is not — still needed for the Contact page (Q27) |
| Founded | 2025 | ☐ | See positioning note below |
| Team size | ~10, "young, fast-growing" | ☐ | See positioning note below |
| Tagline | Think Bold. Build Smart. Scale Fast. | ☑ | Safe — it is on the logo, publicly branded already |

### Positioning note on "founded 2025" and "10 people"

Both are true and both are `[DRAFT]`. But whether to publish them is a *positioning* decision, not a factual one, and it is management's call:

- **Founded 2025** — for a company selling back-office reliability to international clients, a founding year inside the last 12 months can read as unproven. It can also read as modern and hungry. Either framing is legitimate; the site should pick one deliberately rather than state the year by default.
- **"Around 10 people"** — exact headcount goes stale immediately and is tedious to keep accurate. If a size signal is wanted, a band ("a team of 10+") ages better and does not need editing every quarter.

**Recommendation:** publish neither number in v1 unless the manager specifically wants them. Nothing on a corporate site requires a founding year. Omitting a number is not a gap a visitor notices; a stale one is.

---

## 3. Value proposition — `[DRAFT]`

In the speaker's words, from the transcript:

> They help other businesses run smoothly by handling critical behind-the-scenes back-office and operations work, so clients can focus strictly on growth.

> They act as an "engine room" that combines real-world experience with innovative solutions to help businesses everywhere grow smarter.

**"Engine room" is the strongest asset in this entire document.** It is concrete, it is visual, it is not what a template would say, and it survives translation into a design direction — machinery, precision, the part of the ship nobody sees but everything depends on. It should anchor the hero.

**Draft hero copy for approval** — not approved, not final:

> **The engine room behind growing businesses.**
> We handle the back-office and operations work that keeps a business running, so our clients can put their attention where it earns.

This needs management sign-off as the approved company description (Questionnaire A6 / Q6).

---

## 4. Corporate values — `[DRAFT]`

| Value | Source wording | Note |
|---|---|---|
| Honesty & Trust | Stated as the number-one rule | |
| Pride in Work | Doing tasks knowing a real person overseas relies on the output | Unusually specific and genuinely good — most "values" copy is interchangeable, this is not |
| Clear Communication | | |

Suited to an About or Culture page. Low publication risk — these assert nothing verifiable about performance.

---

## 5. Services — `[CONFIRMED]` ✅

Approved by management on 2026-08-24. Keep these descriptions concise; do not expand them into benefits, performance claims, or internal process detail without a new approval.

### Digital marketing
- **Search and content marketing** — Create useful, search-friendly content that helps people discover and understand a business online.
- **Social media management** — Plan, publish and manage social content that keeps a business active and connected with its audience.
- **Google and Facebook paid advertising** — Set up and manage targeted advertising campaigns across Google and Facebook to reach relevant audiences.

### Customer systems and service
- **Customer-system setup and management** — Set up and maintain customer systems so contact details, conversations and follow-up information stay organised.
- **Customer service through calls, text and email** — Handle customer enquiries through calls, text and email with clear, professional communication.

### Future direction
- **AI and automation solutions** — A future service direction focused on practical AI and automation for suitable business tasks.

**Note the tension with §7 below:** the company sells AI and automation services while its own training academy bans AI tools during assessments. Both positions are defensible, but they should not appear on the same website without a sentence reconciling them.

---

## 6. Client brands — `[RISK]` 🔴 DO NOT PUBLISH WITHOUT WRITTEN CLEARANCE FROM BOTH PARTIES

### The problem

The source describes Promeva as an independent company whose primary partnership is with **SNS Multiservices (Australia)**, operating these consumer brands behind the scenes:

Turf Man · Perth Landscaper · Cleaning Team · Carry or Drag · Hardrex · Public Shed

Publishing an "Our Brands" page means publicly stating that **Perth-facing local consumer businesses have their operations run from Nepal.**

That single disclosure carries four distinct risks:

1. **Client consent.** Naming SNS Multiservices publicly is naming a client. Most back-office and BPO agreements restrict this. There may be a confidentiality clause that a portfolio page breaches outright.
2. **Harm to the client's own brands.** Turf Man and Perth Landscaper trade on being local Perth businesses. A turf buyer choosing between suppliers may well prefer the one that reads as local. Promeva's website could measurably damage the commercial position of the client it depends on.
3. **It is not Promeva's disclosure to make alone.** Even with the manager's enthusiastic approval, SNS is the party whose brands are being exposed. Their written consent is needed too.
4. **Competitive exposure.** It publishes the client list to competitors and tells them exactly who to approach.

### The counter-argument, which is also real

For a B2B operations company, this portfolio is by far the strongest proof of capability on the site. "We run six consumer brands across two continents" is worth more than any amount of adjectives. Six live brands is a genuinely impressive credential and I am not recommending it be discarded.

### The three options, in order of preference

| Option | What it looks like | Risk |
|---|---|---|
| **A. Anonymised** *(recommended for v1)* | "We operate six consumer brands across turf supply, landscaping, cleaning, e-commerce, equipment hire and home goods for an Australian partner." Sectors and scale, no names. | None — no client identified |
| **B. Named, with written consent from SNS** | Full brand cards as drafted below | Low once consent is in writing. Highest credibility. |
| **C. Named without consent** | — | **Do not.** Potential contract breach and damage to the client's brands. |

Option A delivers most of the credibility with none of the exposure, and it can be upgraded to Option B later once consent exists. Launching with A costs nothing and forecloses nothing.

### Draft brand cards — held for Option B only

Written up so they are ready if consent arrives. **Not for publication in v1.**

**Turf Man** — turf & lawn supply
Location: Welshpool, Perth, Australia — ⚠ transcript reads "Welsh, Perth"; almost certainly Welshpool, a Perth industrial suburb. **Verify before publishing.**
Supplies real grass grown and delivered by the roll, plus lawn products, delivery and professional installation support. Positioned as the brand that makes the whole lawn decision easy for Perth homeowners, tradespeople and businesses — soil preparation, choosing the right turf, fertilisers and wetting agents.

**Perth Landscaper** — landscaping & heavy outdoor work
Garden upgrades, site preparation, reticulation, general landscaping labour. Deliberately kept separate from Turf Man so Turf Man stays a simple buying brand while Perth Landscaper carries the heavy physical projects.

**Cleaning Team** — residential & commercial cleaning
Home cleaning, office cleaning, one-off specialist cleans, scheduled maintenance. Built on a simple promise: dependable cleaners, a clear scope of work, consistent standards.

**Carry or Drag** — e-commerce travel retail
Fully online. Suitcases as the hero range, plus luggage, handbags and travel accessories. Long-term vision is a one-stop online destination for travellers.

**Hardrex** — equipment hire
Currently powered wheelbarrow-style equipment, expanding toward larger machinery.
⚠ **Do not publish** the detail that Hardrex infrastructure hosts Promeva's internal training academy. That is internal architecture, it confuses the brand's public purpose, and it is of no interest to a customer hiring equipment.

**Public Shed** — home storage & decor
Practical home storage, organisation and decor products aimed at everyday household problems.

---

## 7. Training academy & careers — `[DRAFT]`

**Academy.** New hires receive structured, step-by-step training on products, brands and job-specific operational skills. Genuinely good content for a Careers page — it says the company invests in people rather than just hiring cheap.

**Assessment integrity policy.** No AI tools, search engines, or outside help permitted during evaluations, so that only honest, certified staff are placed with international clients.

Two cautions before this goes on a public page:

1. **It contradicts the AI services offering (§5).** A company that sells "AI and automation solutions" and advertises that it bans AI in its own assessments looks inconsistent unless the distinction is stated plainly — that the ban tests individual competence, while AI is a tool deployed deliberately in client work. One sentence fixes it. Omitting that sentence invites the question.
2. **Audience.** This policy speaks to recruits in Nepal. The rest of the site speaks to prospective clients abroad. It belongs on a Careers page, not the homepage — a client visiting the homepage does not need the company's internal exam rules.

**Scope note:** a Careers page was listed as out of scope in [PRD.md](PRD.md) §3. Adding it is a scope change — small, but it should be a decision rather than a drift.

---

## 8. What this changes

**Confirmed by the manager** — Q5: six public service titles, concise descriptions and the short Services overview (2026-08-24).

**New blockers created** — the name spelling (§1), which outranks every other open question, and the client-brand disclosure decision (§6).

**Still missing** — display email, display phone, full postal address, enquiry destination inbox, domain, DNS access, named approvers, launch date.

The net effect is positive: the manager's job changes from *writing content* to *ticking boxes and correcting drafts*, which is a far easier thing to get returned quickly.

---
name: content-guard
description: Prevents fabricated or unapproved company information from entering the Pramiva/Promeva Solutions website. Load BEFORE writing any user-facing copy, editing src/data/*.ts, writing page metadata or JSON-LD, or filling in company details such as name spelling, email, phone, address, client or partner brand names, statistics, team size, founding year, testimonials, or service descriptions. Triggers on "write the copy", "add the services", "fill in contact details", "add metadata", "write the about section", "add the brands", "add the portfolio", or any task producing text a visitor will read.
---

# Content Guard

Two failure modes on this project, both worse than any bug:

1. **Publishing something untrue** — an invented statistic or claim.
2. **Publishing something true that was not cleared** — a client's name, an internal detail, a fact from induction material.

The second is the live risk here, because a large body of internal material now exists in [docs/CONTENT-INVENTORY.md](../../../docs/CONTENT-INVENTORY.md). **That file is a staging area, not approved copy.** A `[DRAFT]` tag means written up and awaiting sign-off. It does not mean cleared.

**A visible gap is safe. An invented fact is not. An unapproved disclosure can be worse than either.**

## 🔴 Two hard blocks

### 1. The company name is unresolved

The logo says **Pramiva**. The stated legal entity is **Promeva Solutions Private Limited**. Management has not said which is correct.

- The name appears in exactly one place: `site.name` in `src/data/site.ts`
- Never type either spelling anywhere else — metadata, JSON-LD, headings, alt text, comments
- If asked to write copy containing the name, reference `site.name`; do not inline it

### 2. Client brand names are embargoed

**Never publish:** SNS Multiservices · Turf Man · Perth Landscaper · Cleaning Team · Carry or Drag · Hardrex · Public Shed

These are a client's consumer brands, several of which trade as local Perth businesses. Publishing them discloses that their operations run from Nepal — which may breach a confidentiality clause, may damage the client's own market position, and is **not this company's disclosure to make alone**. SNS's written consent is required in addition to management's.

Default for v1 is the **anonymised** form: sectors and scale, no names. For example — "six consumer brands across turf supply, landscaping, cleaning, e-commerce, equipment hire and home goods."

Also never publish: that Hardrex infrastructure hosts the internal training academy. Internal architecture, no public purpose.

See [docs/CONTENT-INVENTORY.md](../../../docs/CONTENT-INVENTORY.md) §6 for the full reasoning and the approval path.

## Never invent

Not as a placeholder, not as a "realistic example", not as lorem-ipsum-with-flavour:

- Client or customer names
- Statistics of any kind — clients served, projects delivered, satisfaction %, growth %, uptime, response time
- Employee or team size
- Founding year or "years of experience"
- Awards, certifications, accreditations
- Partnerships or integrations
- Revenue, funding, market position
- Testimonials or quotes attributed to anyone
- Case studies or project outcomes
- Office addresses, phone numbers, email addresses
- Geographic coverage or office locations
- Team member names, roles, or photographs
- Service descriptions not present in approved material

## Instead, write a placeholder

```ts
// src/data/site.ts
email:   "PLACEHOLDER: display email address (Q7)",
phone:   "PLACEHOLDER: display phone number (Q8)",
address: "PLACEHOLDER: office address (Q9)",
```

Format: `PLACEHOLDER: <what is needed> (Q<n>)` where `Q<n>` is the open question number from [docs/PRD.md](../../../docs/PRD.md) §9.

Why this format: it is greppable (`grep -rn "PLACEHOLDER:" src/` is a launch gate), it is obviously not real content in a rendered page, and it names the question that unblocks it.

If a needed fact has no question number, add one to the PRD open-question register and tell the user it must go to management.

## Where content is allowed to live

Only `src/data/*.ts`. Never hard-coded in a component.

| File | Holds |
|---|---|
| `src/data/site.ts` | Name, tagline, description, email, phone, address, social |
| `src/data/navigation.ts` | Nav and footer link structures |
| `src/data/services.ts` | Service catalogue |
| `src/data/seo.ts` | Per-route titles and descriptions |

Reason: when management answers, one file changes instead of forty components — and the surface where a fabrication can hide is one directory, not the whole tree.

## Sources ranked

1. **Written management approval** — publishable
2. **Items tagged `[CONFIRMED]`** in [PRD.md](../../../docs/PRD.md) or [CONTENT-INVENTORY.md](../../../docs/CONTENT-INVENTORY.md) — publishable
3. **The tagline** — *Think Bold. Build Smart. Scale Fast.* is on the logo, already public. Publishable.
4. **Items tagged `[DRAFT]`** in [CONTENT-INVENTORY.md](../../../docs/CONTENT-INVENTORY.md) — **NOT publishable.** Known, written up, awaiting sign-off. Use them to draft for review, never to ship.
5. **Items tagged `[RISK]`** — **NOT publishable** without written consent from every party named. See the client-brand block above.
6. **Internal induction/training material directly** — **NOT publishable.** Brief §3 is explicit. It informs questions to ask management; it does not become website copy.
7. **AI general knowledge about the company** — there is none. Anything that feels like recall here is invention.

## Structural copy is fine

This skill restricts *claims*, not *language*. You may freely write:

- Section headings and eyebrows — "What we do", "How we work"
- CTA labels, button text, form labels, error messages
- Navigation labels
- Generic connective copy that asserts nothing factual
- Alt text describing what is visibly in an image

The test: **could this sentence be false?** "We support growing businesses with operational and marketing functions" — needs approval, it describes the business. "Get in touch" — cannot be false, write it.

## Metadata and structured data

Page titles, meta descriptions, and OG tags are published content — same rules.

`Organization` JSON-LD is **not emitted at all** until Q6–Q9 are answered. Structured data asserting a false address or phone number is indexed by search engines and republished into knowledge panels. A placeholder string is worse there than an absent block.

## Before finishing a content task

- [ ] Every factual claim traces to management approval or a `[CONFIRMED]` item
- [ ] No statistic, date, count, or name that was not supplied
- [ ] No `[DRAFT]` or `[RISK]` content shipped as final copy
- [ ] Company name not written outside `src/data/site.ts`
- [ ] No client brand name anywhere — SNS Multiservices, Turf Man, Perth Landscaper, Cleaning Team, Carry or Drag, Hardrex, Public Shed
- [ ] Founding year (2025) and headcount (~10) omitted unless management asked for them
- [ ] All unknowns written as `PLACEHOLDER: <need> (Q<n>)`
- [ ] Nothing hard-coded outside `src/data/*.ts`
- [ ] JSON-LD omitted if Q6–Q9 are unanswered
- [ ] New unknowns reported to the user for the manager's list

Then state plainly which placeholders were added and what management must supply. Do not report a content task complete without naming its gaps.

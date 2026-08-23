# Pramiva Solutions Website Project Brief & Development Specification

**Document Version:** 0.1
**Project:** Pramiva Solutions Corporate Website
**Development Platform:** Next.js
**Status:** Initial Requirements / Pre-Development
**Primary Purpose:** Design and develop a modern, premium corporate website for Pramiva Solutions.

---

## 1. Project Overview

Pramiva Solutions requires a new corporate website that communicates the company professionally while presenting a modern and technology-focused brand image.

The website should avoid the appearance of a generic corporate template. Its visual direction will follow a **Tech-Driven Minimalist** approach inspired by premium digital agencies and modern technology companies.

The design will emphasize:

* Strong typography
* Large editorial headings
* Generous whitespace
* Minimal use of decorative elements
* Structured content grids
* Subtle animation
* Premium interactive details
* Strong technical performance
* Responsive behavior across desktop, tablet, and mobile

### Reference Website

Primary visual reference:

**https://www.webnique.de/en**

The reference website should be used for **design inspiration only**.

The Pramiva Solutions website should not directly copy its layout, content, branding, animations, or visual assets.

---

## 2. Company Identity

### Confirmed Company Name

**Pramiva Solutions**

### Brand Tagline

**Think Bold. Build Smart. Scale Fast.**

### Logo

An official Pramiva Solutions logo asset is available.

The logo contains:

* Green/teal graphical elements
* Blue/teal company-name typography
* Dark neutral tagline typography
* White background

The logo should be treated as the primary reference for the initial website colour system.

Exact HEX/RGB values should be extracted from the official digital logo asset during implementation rather than estimated visually.

---

## 3. Business Information Currently Available

The existing company induction material describes Pramiva Solutions as a business and operations company supporting other businesses with operational, marketing, customer-service and related functions.

The following areas have been mentioned in internal company material and should be considered **potential website content pending management approval**:

* Search and content marketing
* Social media management
* Google and Facebook paid advertising
* Customer-system setup and management
* Customer service by phone, text and email
* Administrative support
* Marketing support
* Reporting
* Operational support
* AI and automation solutions

### Important Content Rule

Information obtained from internal induction/training material must not automatically be published publicly.

Management must approve:

* Service descriptions
* Customer/client names
* Company statistics
* Team size
* Founding year
* Partnerships
* Claims about company performance
* Locations
* Any commercially sensitive information

---

## 4. Primary Website Objective

**Status: Requires management confirmation**

The exact business objective has not yet been confirmed.

The expected general objective is to create a strong professional online presence for Pramiva Solutions and allow prospective customers or partners to understand the company and contact it.

Management must confirm whether the primary objective is:

* Lead generation
* Building corporate credibility
* Explaining company services
* Recruitment
* Supporting existing clients
* Attracting international clients
* Generating consultation requests
* A combination of these

---

## 5. Primary Call to Action

**Status: Requires management confirmation**

The main visitor action has not yet been officially decided.

Recommended initial CTA:

**Contact Us**

Possible alternatives include:

* Start a Conversation
* Talk to Our Team
* Work With Us
* Request a Consultation
* Get in Touch
* Discuss Your Project

One CTA should eventually become the primary conversion action across the website.

---

## 6. Target Audience

**Status: Requires management confirmation**

Current internal information suggests that Pramiva Solutions supports growing businesses locally and internationally.

The final website requirements should identify:

* Primary countries
* Target industries
* Business size
* Type of decision-maker visiting the site
* B2B or B2C focus
* Priority markets

The design should initially assume a **professional B2B audience** unless management specifies otherwise.

---

# 7. Proposed Website Architecture

Management has not yet provided a final sitemap.

The following structure is recommended as the initial minimum viable corporate website.

## 7.1 Home

Purpose:

Introduce Pramiva Solutions, communicate its positioning quickly and direct visitors toward the primary CTA.

Suggested sections:

1. Navigation
2. Hero
3. Company positioning statement
4. Services overview
5. Value proposition / Why Pramiva
6. Selected metrics or capabilities — only when verified
7. Working approach/process
8. Company introduction
9. Final CTA
10. Footer

---

## 7.2 About

Suggested sections:

* Company introduction
* Story
* Mission
* Vision
* Values
* Approach
* Team information if approved
* Company growth/story if approved

---

## 7.3 Services

Suggested sections:

* Services introduction
* Service categories
* Individual service descriptions
* Benefits
* Process
* CTA

Potential services should be taken from approved company material rather than invented by AI.

---

## 7.4 Contact

Suggested sections:

* Contact heading
* Short introductory text
* Contact form
* Company email
* Phone
* Office address
* Social links where applicable

Contact information is currently incomplete and requires management confirmation.

---

## 7.5 Future Optional Pages

The following should only be introduced if there is a genuine business requirement:

* Careers
* Case Studies
* Insights/Blog
* Partners
* Client Portal
* Privacy Policy
* Terms
* Academy/Training Portal
* Individual service pages

---

# 8. Visual Design Direction

## Design Style

**Tech-Driven Minimalist**

The website should feel:

* Premium
* Modern
* Technical
* Confident
* Clean
* Editorial
* Sophisticated
* Fast
* Purposeful

It should NOT feel like:

* A generic Bootstrap corporate template
* A typical marketing-agency template
* An icon-heavy SaaS landing page
* A stock-photo business website
* An excessively animated experimental website

---

# 9. Layout Philosophy

The website should use a high-contrast visual system.

### Canvas

Primary background:

**Pure or near-pure white**

Primary text:

**Black / near-black**

Brand accents:

Use colours derived from the official Pramiva Solutions logo.

### Whitespace

Whitespace should be intentionally generous.

Sections should have sufficient vertical spacing so that information feels premium rather than crowded.

### Grid

Use a consistent responsive grid system for:

* Content alignment
* Services
* Metrics
* Company information
* Footer
* Cards
* Supporting information

Avoid arbitrary positioning.

---

# 10. Typography

Typography will be one of the main visual elements.

The system should use an **extreme but controlled scale difference**.

For example:

### Display Headings

Very large typography for:

* Hero statements
* Section titles
* Key statements

### Body Copy

Smaller, crisp, highly readable text for supporting information.

The contrast between large headings and restrained body text should create the editorial appearance.

Typography should remain readable on smaller devices using responsive `clamp()` sizing or equivalent responsive rules.

Avoid excessive font families.

Recommended maximum:

* One primary typeface
* Optional secondary typeface only if justified

---

# 11. Imagery and Visual Assets

Avoid generic stock photography.

Preferred visual content:

* Official Pramiva brand elements
* Real company photographs
* Real office photographs
* Real team photographs
* Abstract compositions derived from the brand
* Typography
* Lines
* Grids
* Numbers
* Geometric brand treatments

Decorative icons should be used sparingly.

Icons should only appear where they improve usability or understanding.

---

# 12. Interaction & Motion

Motion should feel subtle and premium.

Recommended interactions include:

### Scroll Effects

* Fade-in
* Slight vertical reveal
* Staggered content appearance
* Controlled section transitions

### Hover Effects

Buttons:

* Smooth colour transition
* Text/arrow movement
* Border/background transition

Cards:

* Small transform
* Border transition
* Background transition
* Content reveal where appropriate

Links:

* Underline animation
* Arrow movement
* Controlled opacity changes

### Motion Principle

Animation should support the interface rather than become the interface.

Avoid:

* Excessive parallax
* Large 3D effects
* Heavy animation libraries without justification
* Scroll hijacking
* Long page-transition delays
* Animations that compromise performance

Users with `prefers-reduced-motion` enabled should receive reduced or disabled motion.

---

# 13. Technical Stack

Although the visual brief mentioned lightweight platforms such as Webflow as an example of desired performance, the actual implementation requirement is:

## Framework

**Next.js**

Recommended configuration:

* Next.js App Router
* TypeScript
* React
* Tailwind CSS
* ESLint

### Development Environment

* Visual Studio Code
* Claude extension for AI-assisted development
* Git for version control

---

# 14. Proposed Project Architecture

```text
src/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   │
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── about.tsx
│   │   ├── process.tsx
│   │   └── cta.tsx
│   │
│   └── ui/
│       ├── button.tsx
│       ├── container.tsx
│       └── section-heading.tsx
│
├── data/
│   ├── site.ts
│   ├── navigation.ts
│   └── services.ts
│
└── lib/
```

The final structure may change as requirements become clearer.

---

# 15. Content Architecture

Business information should be separated from presentation components.

For example:

```text
data/site.ts
data/services.ts
```

This prevents company names, addresses, phone numbers and service information from being hard-coded repeatedly throughout React components.

This is especially important while requirements are still being confirmed.

---

# 16. Contact Form

A working contact form is expected.

Initial fields:

* Name
* Email
* Company
* Phone — optional
* Message
* Submit button

Potential future fields:

* Service required
* Budget range
* Project type

These additional fields should not be introduced until management confirms that they are useful.

### Form Requirements

The form should include:

* Client-side validation
* Server-side validation
* Error handling
* Success state
* Loading state
* Spam protection
* Accessible form labels
* Secure handling of submissions

### Submission Destination

**To be confirmed**

Management must decide where enquiries should be delivered:

* Company email
* CRM
* Database
* External form platform

---

# 17. Responsive Requirements

The website must be fully responsive.

Target categories:

* Mobile
* Tablet
* Laptop
* Desktop
* Large desktop

Layouts should be designed intentionally for each size rather than simply shrinking desktop content.

Priority should be given to mobile usability.

---

# 18. Performance Requirements

Performance is a major project requirement.

The implementation should prioritize:

* Minimal JavaScript
* Optimized images
* Next.js Image where appropriate
* Modern image formats
* Lazy loading
* Efficient fonts
* Minimal third-party dependencies
* Server Components where appropriate
* Small client-component footprint
* Efficient animation
* Semantic HTML

Avoid installing dependencies simply because Claude recommends them.

Every dependency should have a clear purpose.

---

# 19. Accessibility

The website should follow modern accessibility practices.

Requirements include:

* Semantic HTML
* Proper heading hierarchy
* Keyboard-accessible navigation
* Visible focus states
* Accessible labels
* Sufficient colour contrast
* Descriptive image alt text
* Reduced-motion support
* Accessible contact form errors

---

# 20. SEO Foundation

Initial SEO implementation should include:

* Page titles
* Meta descriptions
* Open Graph metadata
* Favicon
* Canonical configuration where required
* Sitemap
* robots.txt
* Semantic page structure
* Descriptive URLs
* Appropriate heading hierarchy

Example routes:

```text
/
/about
/services
/contact
```

More advanced SEO work will depend on the company's marketing strategy.

---

# 21. Deployment

Deployment is part of the project.

Recommended initial deployment platform:

**Vercel**

This is a recommendation rather than a confirmed company requirement.

Management must provide or approve:

* Production domain
* Domain ownership
* DNS access
* Hosting account
* Analytics requirements
* Production contact-form destination

A staging deployment should be created before connecting the production domain.

---

# 22. Development Methodology

The website will be developed incrementally rather than generated in one AI request.

Recommended order:

### Phase 1 — Requirements

* Finalize project documentation
* Obtain missing company information
* Gather brand assets
* Confirm sitemap
* Confirm CTA

### Phase 2 — Foundation

* Create Next.js project
* Configure TypeScript
* Configure Tailwind
* Initialize Git
* Create architecture
* Add fonts
* Add design tokens

### Phase 3 — Global Components

* Navbar
* Footer
* Button system
* Container
* Typography system
* Responsive spacing system

### Phase 4 — Homepage

Develop sections separately:

1. Hero
2. Services
3. Company introduction
4. Value proposition
5. Process/capabilities
6. CTA
7. Footer integration

### Phase 5 — Internal Pages

* About
* Services
* Contact

### Phase 6 — Interactions

* Hover effects
* Scroll reveals
* Navigation interaction
* Mobile menu
* Micro-interactions

### Phase 7 — Functional Development

* Contact form
* Form delivery
* Error states
* Spam protection

### Phase 8 — Quality Assurance

Test:

* Desktop
* Tablet
* Mobile
* Chrome
* Safari
* Firefox where possible
* Broken links
* Forms
* Accessibility
* Performance

### Phase 9 — SEO & Production

* Metadata
* Sitemap
* robots.txt
* Analytics
* Production build
* Staging approval
* Domain configuration
* Production release

---

# 23. AI-Assisted Development Rules

Claude will be used as an implementation assistant, not as the source of business requirements.

Claude must follow these rules:

1. Inspect relevant existing files before modifying code.
2. Do not invent Pramiva Solutions business information.
3. Use placeholders where approved information does not exist.
4. Work on one component or feature at a time.
5. Avoid modifying unrelated files.
6. Avoid unnecessary dependencies.
7. Keep components reusable.
8. Maintain TypeScript correctness.
9. Maintain responsive behavior.
10. Maintain accessibility.
11. Explain assumptions.
12. Run lint/build checks after meaningful implementation stages.
13. Preserve existing working functionality.
14. Do not replace established design decisions without approval.
15. Never fabricate testimonials, customers, statistics or company claims.

---

# 24. Version Control Requirements

Git should be initialized before significant AI-generated development.

Recommended commit pattern:

```text
Initial Next.js project setup
Add global design system
Build responsive navigation
Build homepage hero section
Add services section
Add about section
Implement contact form
Add responsive improvements
Add website animations
Add SEO metadata
Prepare production deployment
```

Changes should be committed after stable milestones.

This will allow AI-generated changes to be safely reviewed or reverted.

---

# 25. Content Verification Requirements

No unsupported factual claim should be published.

Particular care is required for:

* Number of employees
* Founding year
* Customer names
* Largest-client statements
* Partnership claims
* Performance statistics
* Awards
* Satisfaction statistics
* Revenue
* Market position
* Geographic coverage

Internal source material previously contained several such claims without supporting documentation, so management approval is required before they are placed on the public website.

---

# 26. Information Still Required From Management

Before the website can be considered production-ready, the following should be confirmed:

1. What is the primary business goal of the website?
2. Who exactly is the target audience?
3. What pages must be included?
4. What is the primary website CTA?
5. What is the final approved description of Pramiva Solutions?
6. Which services may be publicly advertised?
7. Are existing client names allowed to appear publicly?
8. Are testimonials or case studies available?
9. What company email should be displayed?
10. What phone number should be displayed?
11. What office address should be displayed?
12. Where should Contact Form submissions be sent?
13. Does the company already own a domain?
14. Who controls the domain/DNS?
15. Are Google Analytics or other analytics required?
16. Are social-media accounts available?
17. Are professional company/team photographs available?
18. Are there additional official brand guidelines?
19. Who provides final design approval?
20. Who provides final content approval?
21. What is the target launch date?
22. Are Privacy Policy and Terms pages required?
23. Where will the website be hosted?

---

# 27. Current Project Decisions

| Item               | Current Decision                             |
| ------------------ | -------------------------------------------- |
| Company            | Pramiva Solutions                            |
| Project Type       | Corporate website                            |
| Framework          | Next.js                                      |
| Language           | TypeScript recommended                       |
| Styling            | Tailwind CSS recommended                     |
| Design Direction   | Tech-Driven Minimalist                       |
| Primary Background | White                                        |
| Typography         | High-contrast editorial typography           |
| Stock Photography  | Avoid                                        |
| Decorative Icons   | Minimize                                     |
| Animation          | Subtle scroll reveals and micro-interactions |
| Mobile Responsive  | Required                                     |
| Contact Form       | Required                                     |
| Deployment         | Required                                     |
| Reference Website  | Webnique                                     |
| Git Repository     | No mandatory existing repository             |
| Deadline           | Not yet provided                             |
| Final Sitemap      | Not yet approved                             |
| Main CTA           | Not yet approved                             |

---

# 28. Design Success Criteria

The design can be considered successful when:

* It clearly looks like Pramiva Solutions rather than a template.
* The brand is recognizable without relying on excessive logo placement.
* Typography provides strong visual hierarchy.
* Whitespace is intentionally used.
* Navigation is simple.
* Services are easy to understand.
* Mobile experience feels designed rather than compressed.
* Animations feel refined and subtle.
* Every significant interaction has appropriate feedback.
* Pages remain fast despite visual polish.
* There is a clear path toward contacting the company.

---

# 29. Technical Success Criteria

Before production deployment:

* `npm run lint` passes.
* Production build passes.
* No significant TypeScript errors remain.
* Navigation works.
* All intended routes work.
* Contact form functions correctly.
* Forms have loading, error and success states.
* Website works on mobile and desktop.
* Images are optimized.
* Metadata is present.
* No dummy company information remains.
* No placeholder links remain.
* No unsupported business claims remain.
* Domain and production form configuration are verified.

---

# 30. Immediate Next Step

Development should begin only with the foundation while management answers the outstanding business questions.

The immediate technical milestone is:

**Create the Next.js project → initialize Git → establish the design system → build navigation and layout → build the homepage hero.**

Content that has not yet been approved should remain clearly marked as placeholder content.

This document should remain the project's source of truth and be updated whenever management approves or changes a requirement.

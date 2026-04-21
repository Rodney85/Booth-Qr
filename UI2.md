# Craft Silicon Booth Lead Capture — Content Spec
**Event**: Annual OSR Growth Conference 2026  
**Venue**: Tamarind Tree Hotel, Nairobi  
**Dates**: 22–23 April 2026  
**Version**: 2.0 (Copywriting audit applied)  
**Last Updated**: 2026-04-21

---

## Screen 1 — Name

### Stats Band
| Stat | Label |
|------|-------|
| 4 | Live Counties |
| 25+ | Revenue Streams |
| 10 yr | Revenue Tech |

### Step Label
`STEP 1 OF 5`

### Headline
> Welcome to the Craft Silicon booth.

### Subtext
> Counties leave revenue on the table every day — because systems don't talk to each other. We fix that. Let's start with your name.

### Field
- **Label:** `FULL NAME`
- **Placeholder:** `Enter your name...`
- **Type:** text
- **Autocomplete:** name

### CTA Button
`Continue →`

---

## Screen 2 — Organisation

### Step Label
`STEP 2 OF 5`

### Headline (name injected)
> Nice to meet you, [Name]. Where do you work?

### Subtext
> Knowing your organisation tells us which platform is most relevant — and who on our team should reach out after the conference.

### Field
- **Label:** `ORGANISATION / ROLE`
- **Placeholder:** `e.g. Homa Bay County / Director of Revenue`
- **Type:** text
- **Autocomplete:** organization

### Context Cards (3 rows — not selectable, informational only)
| Title | Description |
|-------|-------------|
| I work in revenue collection | OSR automation, land rates, SBP, market fees — reconciled to IFMIS. Live in 4 counties. |
| I work in HR or payroll | Biometric payroll, ghost-worker elimination, KDSP II KRA 2 aligned. |
| I work in health services | DHA-certified HMIS, SHA-integrated at point of care. Level 1–6 facility coverage. |

### CTA Button
`Next →`

---

## Screen 3 — Contact Details

### Step Label
`STEP 3 OF 5`

### Headline (name injected)
> Where should we send your brief, [Name]?

### Subtext
> One follow-up. Relevant to your county's situation. No noise.

### Fields
| Field | Label | Placeholder | Type | Required |
|-------|-------|-------------|------|----------|
| Email | `DIRECT EMAIL` | `your@email.com` | email | Yes |
| Phone | `PHONE | `+254 700 000 000` | tel | No |

### Proof Card
- **Title:** `Personalised to your county`
- **Description:** `Includes deployment examples from live counties and relevant product modules`

### CTA Button
`Select your area of interest →`

---

## Screen 4 — Interest Cards

### Step Label
`STEP 4 OF 5`

### Headline (name injected)
> Which area sparks your interest, [Name]?

### Subtext
> Select one. Your brief will be built around it.

### Cards (2×2 grid)

**Card 1 — Revenue Growth (CRMS)**
- **Title:** `Revenue Growth`
- **Description:** `OSR automation — collect more, leak less, reconcile to IFMIS by morning. Live in 4 counties.`
- **Proof stat:** `Live in Homa Bay, Meru, Kajiado & Mandera`

**Card 2 — HR & Payroll (StaffSYNC)**
- **Title:** `HR & Payroll`
- **Description:** `Eliminate ghost workers. Pass your next payroll audit. KDSP II KRA 2 evidence built in.`
- **Proof stat:** `12 modules · SHA, NSSF, KRA, Housing Levy`

**Card 3 — Health Systems (HMIS)**
- **Title:** `Health Systems`
- **Description:** `Every patient treated. Every SHA claim paid. DHA-certified, Level 1–6 ready.`
- **Proof stat:** `Certified under Digital Health Act 2023`

**Card 4 — Livestock & Trade (Flockr)**
- **Title:** `Livestock & Trade`
- **Description:** `Every animal verified. Every trade receipted. M-Pesa escrow, movement permits, no cash risk.`
- **Proof stat:** `5+ species · 90+ data points per animal`

### CTA Button (dynamic — updates to match selected card)
| Selected card | Button text |
|---------------|-------------|
| Revenue Growth | `Prepare my Revenue brief →` |
| HR & Payroll | `Prepare my HR & Payroll brief →` |
| Health Systems | `Prepare my Health Systems brief →` |
| Livestock & Trade | `Prepare my Flockr brief →` |
| Nothing selected | `Prepare my brief →` |

### Skip Link
`Not sure yet — just connect me`

---

## Screen 5 — Success

### Headline (name injected)
> You're connected, [Name].

### Subtext (dynamic — varies by card selected on Screen 4)

| Selection | Subtext |
|-----------|---------|
| Revenue Growth | `Our county revenue team is preparing your brief. Expect a message within 24 hours.` |
| HR & Payroll | `Our HR and payroll team will reach out with your KDSP II brief shortly.` |
| Health Systems | `Our health systems team will prepare your SHA and HMIS brief and be in touch soon.` |
| Livestock & Trade | `The Flockr team will send you a county pilot brief and reach out shortly.` |
| Skipped | `A member of the Craft Silicon team will be in touch with a tailored brief within 24 hours.` |

### Interest Tag (dynamic — pulled from Screen 4 selection)
| Selection | Tag |
|-----------|-----|
| Revenue Growth | `Revenue Growth · CRMS` |
| HR & Payroll | `HR & Payroll · StaffSYNC` |
| Health Systems | `Health Systems · HMIS` |
| Livestock & Trade | `Livestock & Trade · Flockr` |
| Skipped | `Craft Silicon` |

### Next Steps Block
**Label:** `NEXT STEPS`

| Step | Text |
|------|------|
| 1 | Our team reviews your organisation and selected interest |
| 2 | You receive a personalised brief within 24 hours |
| 3 | We schedule a discovery call or send product materials — your call |

### Secondary Action Button
`Download Products›` ##this is a button that will download the products pdf or we could show just for the one they selected.

---

## Booth Screen Display (QR Code Screen)

The following copy sits on the physical booth display, above or below the QR code.

**Primary line (large):**
> Scan to connect with Craft Silicon

**Secondary line (small):**
> Revenue · HR · Health · Livestock — built for Kenya's counties

---

## Admin Dashboard Copy

| Element | Copy |
|---------|------|
| Page title | `Booth Leads` |
| Lead count label | `{n} collected` |
| Export button | `Export CSV` |
| Search placeholder | `Search by name, county, or organisation…` |
| Organisation column header | `County / Organisation` |
| New badge tooltip | `New today` |
| Empty state (no leads yet) | `No leads yet — share the QR code!` |
| Empty state (no search results) | `No matches found.` |
| Export filename | `craft-silicon-osr-2026-leads.csv` |

---

## Copy Rules (Applied Throughout)

These rules governed every copy decision and must be maintained if copy is edited later.

1. **One idea per screen.** Each screen asks one question. No screen combines two asks.
2. **Outcome before feature.** Cards describe what the delegate gets, not what the product does.
3. **Customer language.** Context cards on Screen 2 use "I work in…" framing — how delegates describe themselves, not how Craft Silicon categorises products.
4. **No fabricated claims.** Every statistic (4 counties, 25+ revenue streams, 10 yr, KDSP II KRA 2, DHA Act 2023) is sourced directly from Craft Silicon product briefs.
5. **No implied guarantees.** "Within 24 hours" is a commitment, not a guarantee. "Discovery call or product materials — your call" removes forced demo framing.
6. **Specificity over vagueness.** Placeholder uses "Homa Bay County / Director of Revenue" — a real live county — not a generic example.
7. **CTA describes what the user gets.** "Prepare my Revenue brief →" tells the delegate exactly what happens next, not what they're doing.

---

## Copywriting Audit Log

| Screen | Element | Status | Issue | Fix applied |
|--------|---------|--------|-------|-------------|
| Screen 1 | Subtext | ✅ Fixed | Feature stack — 3 products in 1 sentence | Single outcome: "Counties leave revenue on the table every day…" |
| Screen 2 | Context card labels | ✅ Fixed | Company category names, not customer language | Rewritten as "I work in…" statements |
| Screen 2 | Subtext | ✅ Pass | — | No change |
| Screen 2 | Placeholder | ✅ Pass | — | No change |
| Screen 3 | Subtext | ✅ Pass | — | No change |
| Screen 3 | Proof card | ✅ Pass | — | No change |
| Screen 4 | Card descriptions | ✅ Fixed | Feature-only, no outcome | Feature → Outcome chain applied to all 4 cards |
| Screen 4 | CTA button | ✅ Fixed | "Confirm selection" describes action, not outcome | Dynamic "Prepare my [X] brief →" |
| Screen 4 | Skip link | ✅ Pass | — | No change |
| Screen 5 | Subtext | ✅ Pass | — | No change |
| Screen 5 | Step 3 | ✅ Pass | — | No change |
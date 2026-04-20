# PRD — Craft Silicon Booth Lead Capture
**Product**: Booth Lead Capture  
**Owner**: Craft Silicon / Dexor Studio  
**Event**: Annual OSR Growth Conference 2026  
**Status**: Planning → Build (URGENT — event in 2 days)  
**Version**: 2.0  
**Last Updated**: 2026-04-20

---

## 1. Event Intelligence

| Field | Detail |
|-------|--------|
| **Event** | Annual OSR Growth Conference 2026 |
| **Theme** | Catalyzing Growth in Subnationals Through Sustainable Financing and Revenue Innovation |
| **Dates** | 22nd–23rd April 2026 |
| **Venue** | Tamarind Tree Hotel, Nairobi |
| **Organiser** | Ecocapp Capital Ltd |
| **Craft Silicon's Role** | **Silver Sponsor** |
| **Time to event** | **2 days** |

**What this means for the build:** There is no room for scope creep. The form must be live and tested before 8:00 AM on 22nd April 2026. Every feature not in Phase 1 is cut.

---

## 2. Audience Profile

This is not a general consumer event. The OSR Growth Conference brings together Kenya's senior subnational finance and governance leaders. The visitor scanning Craft Silicon's QR code is likely one of the following:

| Role | Organisation Type |
|------|------------------|
| County Governor | County Government |
| County Executive Committee Member (CECM) | County Government — Lands, Finance, Urban Development |
| County Attorney / Legal Officer | County Government |
| Director of Revenue | County Revenue Authority |
| Permanent Secretary | National Government Ministry |
| Municipal / City Manager | Municipal Board |
| Urban Planner / Surveyor | Professional Body (ISK, KIP) |
| Development Partner Representative | Donor / NGO |
| Private Sector Executive | Real Estate, Infrastructure, Fintech |

**Implication for the form:** These are senior professionals. The form must feel as credible and polished as Craft Silicon's booth presence. A sloppy UI reflects on the brand. The copy must speak their language — public finance, digital transformation, county revenue systems.

**The Organisation field is the most valuable data point** for Craft Silicon's sales team. Knowing which county or institution a lead represents determines which product line (Core Banking, Revenue Administration, Digital Lending) to pitch in the follow-up.

---

## 3. Overview

A QR-code-triggered lead capture web app deployed for Craft Silicon's Silver Sponsor booth at the OSR Growth Conference 2026. A screen at the booth displays a branded QR code. Delegates scan it on their phones, fill a short form, and are captured as leads. An admin dashboard gives the Craft Silicon team operator real-time visibility into submissions with CSV export.

**Core flow:**

```
Booth screen (QR + "Scan to Connect") 
  → Delegate's phone → Form → Submit → Success 
                                          ↓
                         Craft Silicon operator → Admin dashboard (live)
```

---

## 4. Goals

| Goal | Metric |
|------|--------|
| Capture quality leads in < 30 seconds per visitor | Form completions ≥ 70% of scans |
| Identify organisation/county for every lead | Organisation field 100% required |
| Operator sees leads in real time at the booth | < 1s latency via Convex live query |
| Zero dependency on venue WiFi for visitors | Form loads and submits on mobile data |
| Data survives the event — portable immediately | CSV export available at any time |

---

## 5. Non-Goals (v1 — event constraint)

These are cut for the 2-day deadline. They go in a post-event backlog.

- Email autoresponder to the delegate
- Role/title dropdown field (adds friction; organisation covers the value)
- Multi-event management
- CRM sync (HubSpot, Salesforce)
- Resend end-of-day summary email to operator
- QR code generator built-in

---

## 6. Users

| User | Description | Entry Point |
|------|-------------|-------------|
| **Delegate** | Senior county/government/private sector attendee | `/` — public form, reached by QR scan |
| **Operator** | Craft Silicon team member at the booth | `/#admin` or gear icon → Clerk login |

---

## 7. Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Vite + React | Pure SPA — no SSR needed. Faster build for tight deadline. |
| Styling | Tailwind CSS + shadcn/ui | Utility-first. shadcn for accessible form primitives. |
| Icons | Lucide Icons | Consistent set across form and admin. |
| Backend | Convex | Real-time DB. Live query powers instant admin updates. |
| Auth | Clerk | Admin route only. Public form is unauthenticated. |
| Animation | Framer Motion | Form card entrance only. One transition, no decoration. |
| Analytics | PostHog | Form funnel tracking — views, starts, completions. |
| Errors | Sentry | Client-side crash reporting. |
| Hosting | Netlify | Free tier, auto-deploy on push, global edge. |

---

## 8. Features

### 8.1 Public Form (`/`)

**Craft Silicon branding on the form:**
- Wordmark "CRAFT SILICON" at top — 11px, all caps, muted white, tracking wide
- Horizontal divider line in `#0A6AE2` (brand blue) below wordmark
- Event context line: "OSR Growth Conference 2026 · Tamarind Tree Hotel" in tertiary muted text

**Fields (in order — easiest first):**

| # | Field | Type | Required | Validation | Keyboard |
|---|-------|------|----------|------------|---------|
| 1 | Full Name | Text | Yes | Non-empty | `text` |
| 2 | Email Address | Email | Yes | Valid email format | `email` |
| 3 | Phone Number | Tel | Yes | 6–18 digits, optional `+` | `tel` |
| 4 | Organisation | Text | Yes | Non-empty | `text` |

**Organisation field placeholder copy:** `"County, Ministry, or Company"`  
This single placeholder tells the visitor what we're looking for without adding a dropdown or instruction text.

**CTA Button Copy:**
> Connect with Craft Silicon →

Not "Submit" — not generic. This is intentional. The visitor is connecting with a fintech company, not filling a government form.

**Privacy line below button:**
> Your details are kept private and used only for follow-up.

**Admin access:**  
Gear icon `⚙` at the bottom of the form. `rgba(255,255,255,0.08)` — functionally invisible to delegates. Navigates to Clerk sign-in.

---

### 8.2 Success Screen (`/success`)

| Element | Copy |
|---------|------|
| Confirmation mark | Circle ring + checkmark in `#0A6AE2` |
| Headline | "You're connected." |
| Subtext | "A member of the Craft Silicon team will be in touch shortly." |
| Secondary action | "Submit another response" → resets form, returns to `/` |

The subtext sets an expectation — the delegate knows a follow-up is coming. This is intentional for a high-value conference context. It also signals to the visitor that this wasn't a hollow gesture.

---

### 8.3 Admin Dashboard (`/admin`)

Protected by Clerk. Craft Silicon team members with access can view in real time from their phones or a laptop at the booth.

**Stats row:**

| Card | Value |
|------|-------|
| Total Leads | All-time count |
| Today | Submissions since midnight |
| Day 2 | Will show 23rd April count (uses rolling date) |

**Leads table columns:**

| Column | Notes |
|--------|-------|
| Name | Bold, 15px, primary |
| Organisation | **Bold-highlighted** — most strategically valuable column |
| Email | Secondary |
| Phone | Secondary |
| Time | `HH:MM` format — at a 2-day event, time matters more than date |
| New badge | Gold dot on leads from the past 30 minutes |

**Column priority:** Organisation is placed in column 2 (right after Name) — not column 4. At a conference, the operator is scanning the table to spot which counties and institutions are represented. That column needs to be immediately visible.

**Controls:**
- Search — filters by name, organisation, or email (client-side)
- Export CSV — downloads `craft-silicon-osr-leads.csv`
- Sign out — Clerk sign-out

**Real-time:** Convex live query. New leads appear without refresh.

---

## 9. Copy — Full Reference

| Element | Copy |
|---------|------|
| Wordmark (top) | `CRAFT SILICON` |
| Event context | `OSR Growth Conference 2026 · Tamarind Tree Hotel` |
| Form headline | `Let's Connect` |
| Form subtext | `Drop your details and our team will be in touch.` |
| Name label | `FULL NAME` |
| Email label | `EMAIL ADDRESS` |
| Phone label | `PHONE NUMBER` |
| Organisation label | `ORGANISATION` |
| Organisation placeholder | `County, Ministry, or Company` |
| CTA button | `Connect with Craft Silicon →` |
| Privacy note | `Your details are kept private and used only for follow-up.` |
| Success headline | `You're connected.` |
| Success subtext | `A member of the Craft Silicon team will be in touch shortly.` |
| Success secondary action | `Submit another response` |
| QR screen callout (on booth display) | `Scan to connect with Craft Silicon` |
| Admin empty state | `No leads yet — share the QR code!` |

---

## 10. Data Schema (Convex)

### Table: `leads`

```ts
leads: defineTable({
  name:         v.string(),
  email:        v.string(),
  phone:        v.string(),
  organisation: v.string(),
  eventId:      v.string(),     // hardcode "osr-2026" for this deployment
  createdAt:    v.number(),     // Unix timestamp (ms)
})
  .index("by_createdAt", ["createdAt"])
  .index("by_eventId",   ["eventId"])
```

### Convex Functions

| Function | Type | Auth | Description |
|----------|------|------|-------------|
| `leads.submit` | Mutation | Public | Validates and inserts a new lead. Sets `eventId: "osr-2026"`. |
| `leads.list` | Query | Clerk | Returns all leads for `eventId: "osr-2026"`, ordered by `createdAt` desc. |
| `leads.stats` | Query | Clerk | Returns `{ total, today }`. |
| `leads.exportAll` | Action | Clerk | Returns full dataset for CSV download. |

---

## 11. Routes

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/` | `<LeadForm />` | Public | Delegate-facing form |
| `/success` | `<SuccessScreen />` | Public | Post-submission confirmation |
| `/admin` | `<AdminDashboard />` | Clerk | Real-time lead management |

---

## 12. PostHog Tracking Plan

| Event | Trigger | Properties |
|-------|---------|------------|
| `form_viewed` | `/` load | `event_id: "osr-2026"` |
| `form_started` | First field focus | `first_field`, `event_id` |
| `form_field_errored` | Validation triggers | `field`, `error_message` |
| `form_submitted` | Successful mutation | `event_id` |
| `form_submission_failed` | Mutation error | `error` |
| `admin_viewed` | `/admin` load | — |
| `leads_exported` | CSV download | `lead_count` |

---

## 13. Environment Variables

```env
VITE_CONVEX_URL=
VITE_CLERK_PUBLISHABLE_KEY=
VITE_POSTHOG_KEY=
VITE_SENTRY_DSN=
```

Convex deployment key managed via `npx convex deploy`.

---

## 14. Folder Structure

```
/
├── convex/
│   ├── schema.ts
│   ├── leads.ts
│   └── _generated/
├── src/
│   ├── components/
│   │   ├── LeadForm.tsx
│   │   ├── SuccessScreen.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── ui/
│   ├── lib/
│   │   ├── validation.ts
│   │   ├── analytics.ts
│   │   └── export.ts
│   ├── App.tsx
│   └── main.tsx
├── .env.local
├── vite.config.ts
└── tailwind.config.ts
```

---

## 15. Build Plan — COMPRESSED FOR 2-DAY DEADLINE

The event is 22–23 April 2026. Today is 20 April. You have **one build day** (21 April) and a **morning deployment window** before doors open on the 22nd.

### Day 1 — 21 April (Full Build Day)

**Morning (4 hours)**

- [ ] Scaffold Vite + React project
- [ ] Install and configure Tailwind CSS, shadcn/ui, Lucide Icons
- [ ] Set up Convex project, define `leads` schema, write `submit`, `list`, `stats`, `exportAll`
- [ ] Set up Clerk project, configure Convex + Clerk JWT integration
- [ ] Set up Netlify project, connect repo for auto-deploy on push

**Afternoon (4 hours)**

- [ ] Build `<LeadForm />` — all fields, validation, Convex mutation, loading states
- [ ] Build `<SuccessScreen />` with confirmation mark and copy
- [ ] Build `<AdminDashboard />` — stats row, leads table, search, CSV export
- [ ] Protect `/admin` with Clerk `<SignedIn>` / `<SignedOut>` redirect
- [ ] Add PostHog events (`form_viewed`, `form_started`, `form_submitted`)
- [ ] Add Sentry error boundary on `<LeadForm />`
- [ ] Add Framer Motion entrance animation on form card (single transition)

**Evening (2 hours)**

- [ ] Set all env vars in Netlify dashboard
- [ ] Deploy to Netlify, verify production URL loads on mobile
- [ ] Test full flow on real Android and iOS devices: QR scan → form → submit → admin update
- [ ] Verify CSV export downloads correctly
- [ ] Verify Convex real-time: submit on phone → appear in admin without refresh
- [ ] Generate QR code pointing to production URL (use qr.io)
- [ ] Print or prepare QR code display asset for the booth screen

### Day 2 Morning — 22 April (Event Day 1 — Pre-doors)

- [ ] Final smoke test: submit a test lead, confirm it appears in admin
- [ ] Brief Craft Silicon operator on how to access `/admin` on their phone
- [ ] Clear test leads from Convex dashboard before doors open
- [ ] QR code on screen, brightness up, form URL correct

### Day 3 Morning — 23 April (Event Day 2)

- [ ] Check admin for overnight/early submissions
- [ ] Export CSV at end of day — `craft-silicon-osr-leads.csv`

---

## 16. Operator Briefing Notes

Give this to the Craft Silicon team member managing the booth:

**To access the admin dashboard:**
1. On your phone or laptop, go to: `[production URL]/admin`
2. Sign in with your Clerk credentials
3. The leads table updates automatically — no need to refresh

**To export leads:**
- Tap / click "Export CSV" in the top-right of the admin dashboard
- File downloads as `craft-silicon-osr-leads.csv`
- Open in Excel or Google Sheets

**If someone can't scan the QR:**
- Share the URL directly via WhatsApp or SMS
- The URL works on any smartphone browser — no app needed

**At end of day:**
- Export the CSV before leaving the venue
- The data is also safely stored in Convex cloud — it does not disappear

---


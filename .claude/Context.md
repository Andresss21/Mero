# Context — Mero

## The Business

Mero is a PC components business run by 2 brothers in El Salvador. Small operation, lean by design.

**No physical store. No fixed catalog. No online payments. No sales agents.**

They have a strategic relationship with a large distributor that gives them access to a wide range of PC products. From that pool they hand-pick a small rotating selection — the rotation period is flexible, could be 2 weeks, a month, 20 days. Whatever makes sense at the time.

**They don't hold inventory.** The model is: make the sale first, then buy from the distributor, receive, and deliver to the client. Zero stock risk.

## How They Operate Today

| Channel | Purpose |
|---|---|
| Facebook (catalog) | Display current available products |
| Instagram | Notify existing audience of current stock |
| TikTok | Top-of-funnel, attract new clients |
| WhatsApp | Close deals, customer communication |
| Google Sheets | Internal operations, planning, automation |

This is a real working system. It runs. The goal is not to replace it — it's to extend it without breaking it.

## The Core Problem We're Solving

**Learning curve between the final user and the application.**

If we build something too complex, it won't be adopted. Mero's operators are not developers. Any tool we introduce has to integrate into their existing workflow — Google Sheets, WhatsApp — not compete with it. Every feature we add has to pass the test: does this make their life easier, or does it add a new thing to manage?

## Integration Strategy

- **Google Sheets** — source of truth for product catalog and operations. The platform reads from it, not the other way around.
- **WhatsApp** — primary sales channel. We plan integration so leads/orders flow into WhatsApp naturally.
- Other integrations TBD as we move into later phases.

## Project Phases

**Phase 0 — Landing Page (current)**
Establish brand presence. Retro-Futurism design. Single `index.html`. No backend. Goal: credibility, top-of-funnel, convert visitors to WhatsApp conversations.

**Phase 1+ — Dashboard, Architecture, Database, Integrations**
TBD as we progress. Will be defined progressively — we don't over-engineer ahead of what's needed.

## What This Means for Every Decision

- **Don't overbuild.** If a feature adds complexity without clear user value, cut it.
- **Google Sheets is not the enemy.** Build around it.
- **WhatsApp is the conversion point.** CTAs should drive there.
- **The catalog is dynamic.** Nothing in the UI should assume a fixed product list.
- **Operators are non-technical.** Any admin-facing feature must be near-zero learning curve.

---

## Brand

**Positioning:** Modern · Gaming · Professional

The webpage is itself a brand statement. High-level design, animations, and visual effects are not decoration — they signal that the people behind Mero are genuinely from the PC world. A gamer or builder should land on this page and immediately feel like it was built by someone who speaks their language.

**Tone:** Technical but accessible. Confident without being corporate. The brand doesn't talk down to its audience — it talks with them.

**What the site must communicate without saying it directly:** These are PC people. They know what they're selling.

---

## Ideal Customer Profile (ICP)

- **Programmers** — buy for performance, care about specs, research before purchasing
- **Gaming community** — driven by builds, benchmarks, and community validation
- **Enthusiasts** — follow the hardware market, know pricing, recognize value immediately

**Common thread:** They are informed buyers. They don't need to be sold to — they need to trust the seller.

**Budget sensitivity:** High. This audience watches prices. They know when something is fairly priced and when they're being taken advantage of.

---

## Decision Factors

**Price integrity is the core differentiator.**

Mero studies and compares against local competition before selecting any product. They only offer products they believe are fairly priced. When market conditions make fair pricing impossible — like current GPU prices inflated by AI demand — Mero pulls those products entirely rather than pass an unfair price to the customer.

This is not just a business decision. It's a values statement. Mero is explicitly on the customer's side.

**What makes someone choose Mero:**
- They trust the price is fair — not inflated, not padded
- The catalog is curated, not overwhelming — every product there is there for a reason
- The people selling are PC people — credibility through authenticity
- WhatsApp access — real person, fast response, no ticket system

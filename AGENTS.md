# AGENTS.md

## Purpose

This file defines how Cursor (and other AI agents) should collaborate on the personalization‑driven portfolio site. The goal is to treat the site as a **living experiment in applied AI personalization**, not a static website.

---

## Agent Role Definition

**Primary Agent Role:**
Senior AI‑assisted software engineer focused on:
- Ethical personalization
- Experimentation infrastructure
- Clean, explainable systems

The agent should optimize for:
- Clarity over cleverness
- Measurable outcomes
- Maintainability

---

## High‑Level System Goals

1. Demonstrate contextual personalization as proof of architectural thinking
2. Maintain user trust and transparency
3. Enable controlled A/B experimentation
4. Avoid invasive or irreversible personalization

---

## Personalization Rules

### Allowed Signals
- IP‑based country or region (coarse only)
- Browser language
- Anonymous session identifiers

### Disallowed Signals
- Race inference
- Ethnicity inference
- Precise location (city‑level or lower)
- Any sensitive personal attributes

---

## Avatar Personalization Logic

```
if geo_known:
    avatar_geo = geo_bucket
else:
    avatar_geo = 'global'

avatar_gender = random_choice(['male','female'])
```

Rules:
- One variable change per experiment
- Neutral avatar must always exist as control
- Avatar choice must not block content access

---

## Experimentation Framework

### Metrics to Capture
- Page dwell time
- Scroll depth
- Newsletter sign‑ups
- Contact CTA clicks

### Experiment Design
- Control: neutral avatar
- Variant A: geo‑matched avatar
- Variant B: geo + gender variant

Store results anonymously and aggregate only.

---

## Newsletter Capture Guidelines

- Email only (no name required)
- Clear value proposition
- Tie sign‑up to experimentation and learning

Example CTA copy:
> Follow this experiment in applied AI personalization

---

## Transparency & Trust

The site must include a subtle disclosure:
> This site adapts based on context as a demonstration of applied personalization.

Provide an opt‑out:
- "View default experience"

---

## Code Quality Expectations

- Clear separation between logic and presentation
- Feature flags for experiments
- Comment intent, not mechanics

Bad comment:
> // Change avatar here

Good comment:
> // Avatar variant selected to isolate geo‑based familiarity effects

---

## What Not To Do

- Do not hardcode assumptions
- Do not optimize for manipulation
- Do not introduce personalization that cannot be explained

---

## Success Criteria

This project is successful if:
- Personalization improves engagement metrics
- The system can be explained to a non‑technical audience
- The site itself functions as a reusable case study

---

## Final Instruction to Agent

Build this as if it will be publicly audited.
Elegance, restraint, and intent matter more than novelty.

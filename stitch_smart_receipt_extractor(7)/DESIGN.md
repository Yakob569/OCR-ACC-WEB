# Design System Specification: The Architectural Ledger

## 1. Overview & Creative North Star
### Creative North Star: "The Financial Atelier"
In an industry dominated by rigid grids and "safe" blue boxes, this design system breaks the mold by treating financial data with the reverence of a high-end editorial publication. We are moving away from "Utility Software" and toward a "Digital Atelier"—a space that feels bespoke, curated, and intentionally structured.

The system rejects the "template" look. We achieve authority through **intentional asymmetry**, **tonal depth**, and **expansive white space**. We don't use lines to separate data; we use the "breath" between elements to guide the eye. This is a secure, professional environment that feels premium because it refuses to be cluttered.

---

## 2. Colors: Tonal Architecture
The palette is rooted in deep, authoritative greens and blues, balanced by a sophisticated range of grays.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning or layout containment. Boundaries must be defined solely through background color shifts. Use `surface-container-low` for large secondary sections sitting on a `surface` background to create a "pave" effect.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical layers. Instead of a flat grid, use the Tiered Surface model:
*   **Base:** `surface` (#f8f9fa)
*   **Secondary Content Area:** `surface-container-low` (#f2f4f5)
*   **Interactive Cards:** `surface-container-lowest` (#ffffff) for maximum "lift."
*   **High-Detail Overlays:** `surface-container-high` (#e7e8e9)

### The "Glass & Gradient" Rule
To inject "soul" into the financial experience, avoid flat color blocks for major calls-to-action.
*   **CTAs:** Use a subtle linear gradient from `primary` (#005148) to `primary_container` (#006b5f) at a 135-degree angle.
*   **Floating Navigation:** Use **Glassmorphism**. Apply a semi-transparent `surface_container_lowest` with a 20px backdrop-blur. This makes the UI feel integrated and modern rather than "stuck on" to the page.

---

## 3. Typography: Editorial Authority
We utilize a triad of sans-serifs to establish a clear hierarchy: **Manrope** for impact, **Work Sans** for data clarity, and **Inter** for utility.

*   **Display & Headline (Manrope):** Large, bold, and slightly tracking-tight. Use `display-lg` (3.5rem) for high-level dashboard summaries to give them a "headline" feel.
*   **Body (Work Sans):** Chosen for its exceptional legibility in numerical data. `body-md` (0.875rem) is the workhorse for all ledger entries.
*   **Labels (Inter):** Used for micro-copy and metadata. `label-md` (0.75rem) should always be in all-caps with +5% letter spacing to maintain a "technical" look.

---

## 4. Elevation & Depth: Tonal Layering
Depth is communicated through light and material, not structural outlines.

*   **The Layering Principle:** Place a `surface-container-lowest` card on top of a `surface-container-low` background. The contrast in value creates a natural "edge" without a border.
*   **Ambient Shadows:** For floating elements (Modals/Popovers), use an extra-diffused shadow: `box-shadow: 0 12px 40px rgba(25, 28, 29, 0.06)`. Note the use of `on_surface` (#191c1d) at very low opacity to mimic natural ambient light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., input fields), use `outline_variant` (#bec9c8) at **20% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons: The Kinetic Anchor
*   **Primary:** Gradient of `primary` to `primary_container`. `md` (0.375rem) corner radius. No border.
*   **Secondary:** `secondary_container` (#d4e4f4) background with `on_secondary_container` text.
*   **Tertiary:** Text-only using `primary`. On hover, add a `surface-container-highest` background tint.

### Input Fields: The Quiet Collector
*   **Style:** No background color. Only a bottom-aligned "Ghost Border" (20% `outline_variant`). 
*   **Focus State:** The border transitions to `primary` (#005148) at 100% opacity, with a subtle 4px `primary_fixed` outer glow.

### Cards & Financial Lists
*   **The Divider Forbiddance:** Never use horizontal lines between list items. Use 16px of vertical spacing (Spacing Scale) or alternating background shifts between `surface` and `surface_container_low`.
*   **Nesting:** Place charts inside a `surface_container_lowest` card with an `xl` (0.75rem) corner radius for a soft, premium feel.

### Dashboard Stats (Special Component)
*   **Anatomy:** `display-sm` (Manrope) for the value, `label-sm` (Inter, All-Caps) for the metric name, and a micro-sparkline using a `tertiary` (#005145) stroke.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Use wide left margins for typography and condensed right columns for data actions.
*   **Use Tonal Shifts:** Define a sidebar by making it `surface_container_high` against a `surface` main stage.
*   **Prioritize Breathing Room:** If you think there is enough white space, add 20% more.

### Don’t:
*   **Don't use 1px Dividers:** They clutter the interface and make the software feel dated and "boxed in."
*   **Don't use Pure Black:** Always use `on_surface` (#191c1d) for text to maintain a soft, high-end feel.
*   **Don't use Standard Shadows:** Avoid the "fuzzy grey" look. Shadows must be wide, soft, and tinted by the background.
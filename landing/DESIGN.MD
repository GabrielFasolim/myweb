# Design System Document: High-End Editorial
 
## 1. Overview & Creative North Star
 
### Creative North Star: "The Architectural Monolith"
This design system is a rejection of the "templated" web. It is inspired by the meticulous spacing of premium fashion lookbooks and the structural integrity of brutalist architecture. The goal is to create a digital experience that feels curated, not assembled.
 
We break the "standard" UI look through:
- **Intentional Asymmetry:** Headings that bleed off the grid or sit in unexpected gutters.
- **Scale as Power:** Massive typography contrasted against tiny, precise metadata.
- **Negative Space as Content:** Treating whitespace not as "empty" but as a structural element that forces focus.
 
The experience should feel quiet but authoritative—a "black-tie" approach to digital interface design.
 
---
 
## 2. Colors
 
The palette is rooted in absolute darkness, using tonal shifts rather than hues to define structure.
 
| Token | Value | Role |
| :--- | :--- | :--- |
| `background` | `#050505` | The canvas. Pure, deep black to maximize contrast. |
| `surface` | `#131313` | Primary container background for subtle lift. |
| `on_surface` | `#e8e6e0` | Off-white/Cream for primary text. Soft on eyes. |
| `primary` | `#ffffff` | Pure white for high-impact display type. |
| `outline_variant` | `#474747` | The "Ghost Border" color for thin, structural lines. |
| `surface_container_highest`| `#353534` | Interaction states and high-visibility cards. |
 
### The "No-Line" Rule
Prohibit the use of standard 1px solid borders for sectioning. Boundaries must be defined by:
1. **Background Shifting:** A section transitioning from `background` (#050505) to `surface_container_low` (#1c1b1b).
2. **Generous Gaps:** Using the Spacing Scale (120px+) to denote a change in context.
 
### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of fine paper.
- **Layer 0:** `background` (#050505)
- **Layer 1 (Cards):** `surface_container_lowest` (#0e0e0e)
- **Layer 2 (Floating/Modals):** `surface_bright` (#3a3939)
 
### Signature Textures
To add "soul," use a subtle radial gradient on the `background` (transitioning from `#131313` at the center to `#050505` at the edges) to mimic a studio spotlight.
 
---
 
## 3. Typography
 
The hierarchy is extreme. We use scale to create a "rhythm of reading" that moves from massive statements to technical details.
 
*   **Display (Epilogue):** `120px - 180px`. Used for section headers. These should bleed off the container or overlap images. Tracking: `-0.04em`.
*   **Headline (Epilogue):** `headline-lg` (2rem). For sub-storytelling.
*   **Body (Manrope):** `body-lg` (1rem). Set in `#e8e6e0` with a line height of `1.6` for premium readability.
*   **Label (Space Grotesk):** `label-md` (0.75rem). Monospace for metadata (dates, tags, small-caps links).
 
---
 
## 4. Elevation & Depth
 
In a luxury dark system, traditional shadows are often too "muddy." We use **Tonal Layering**.
 
### The Layering Principle
Depth is achieved by placing a `surface_container_low` element onto a `background` base. The contrast is barely perceptible but enough to register "lift" to the human eye.
 
### Ambient Shadows
For floating elements, use "The Void Shadow":
- **Blur:** 80px
- **Spread:** -10px
- **Color:** `rgba(0, 0, 0, 0.6)`
This creates a sense of the element emerging from the darkness.
 
### The "Ghost Border" Fallback
If containment is required (e.g., input fields), use `outline_variant` at **20% opacity**. It should be a suggestion of a border, not a hard line.
 
---
 
## 5. Components
 
### Navigation
- **Style:** Minimalist, fixed to the top.
- **Typography:** `label-md` (Space Grotesk), Small-Caps.
- **Interaction:** A simple opacity shift from 60% to 100% on hover. No underlines.
 
### Buttons
- **Primary:** Rectangle, 0px radius. `on_primary_container` background with `on_primary` text.
- **Secondary:** Transparent background, Ghost Border (20% opacity `outline`).
- **Interaction:** On hover, the primary button should invert colors or expand slightly in width.
 
### Accordions (Portfolio "Why Work With Me")
- **Border:** Use a single 1px line of `outline_variant` at the bottom of each item.
- **Typography:** The title uses `headline-sm`, the content uses `body-md`.
- **Icon:** A simple 45-degree arrow (`arrow_outward`) that rotates to 90-degrees on open.
 
### Cards
- **Radius:** Strictly `0px`.
- **Background:** `surface_container_low`.
- **Spacing:** `48px` internal padding to maintain the "Editorial" feel.
 
---
 
## 6. Do's and Don'ts
 
### Do
- **Do** allow text to overflow its container for a bespoke, "print" feel.
- **Do** use `120px` to `200px` of vertical spacing between sections.
- **Do** implement scroll-triggered animations: `y: 40, opacity: 0` to `y: 0, opacity: 1` with a long duration (1.2s) and "Power4.out" easing.
 
### Don't
- **Don't** use rounded corners (`0px` only). Roundedness kills the architectural feel.
- **Don't** use vibrant accent colors. Gold, blue, or red will break the sophisticated monochromatic immersion.
- **Don't** use "Drop Shadows" with high opacity. They look "cheap" against a pure black background.
- **Don't** use icons unless absolutely necessary. Rely on typography first.
 
---
 
## 7. Interaction Patterns
 
Every interaction must feel deliberate and weighted.
*   **Hover States:** Subtle. A shift in text color or a very slight background brightness increase.
*   **Transitions:** Use "Staggered Reveals." When a section enters the viewport, the metadata (monospace) appears first, followed by the massive display heading, then the body text.
# Design System: Liquid Obsidian

This system defines a "Masterpiece" visual and interaction language for the OSR Growth Conference 2026. It leverages Apple's "Liquid Glass" principles (spatiality and refraction) to create a premium, immersive dialogue experience.

## 1. Visual Theme & Atmosphere
**The "Liquid Obsidian" Movement**
The atmosphere is **"Dimensional Silence."** The interface is treated as a physical artifact—a slab of dark, translucent obsidian suspended in a field of refracted light. Surfaces react to movement; they aren't static backgrounds but adaptive materials. Depth is established through layer-stacking and Backdrop-Blur, creating a "Museum" quality focus on the conversation.

## 2. Color Palette & Refraction
*   **Obsidian Depth (#071426)**: The foundational material. Rendered as a `Radial Gradient` (at center: #0A1B33, edges: #071426) to simulate depth.
*   **CS-Electric Blue (#26D0CE)**: The "Light Path." Used for active refraction—buttons don't just have background colors; they "glow" and cast light onto the obsidian surfaces.
*   **Translucent Steel (#FFFFFF1A)**: The "Edge." Used for the 1px high-precision borders that define the glass panels.
*   **Crystal White (#FFFFFF)**: The high-vibrancy layer. Used for text that must appear to float above the glass.
*   **Subtle Ether (#94A3B866)**: Secondary hierarchy. Provides a ghost-like presence for guidance text.

## 3. Typography & Vibrancy
*   **Font Stack**: Inter (Sans-Serif) with tight tracking (-0.022em) for that Apple-like density.
*   **Vibrancy Mode**: Typography uses a "Vibrant" filter—it subtly changes tone based on what's behind the glass layer, ensuring perfect legibility and a cohesive feel.

## 4. Component Stylings (Masterpiece Tier)
*   **Glass Conversational Panels**: 
    - `Backdrop-Blur` (32px) with a subtle "Glass Grain" texture.
    - **Inner Stroke**: A 0.5px white internal highlight line at the top edge to simulate light hitting the bevel.
*   **Liquid Buttons**: 
    - Pill-shaped with a **Mesh Gradient** transition.
    - `Box-Shadow`: A concentric shadow system (0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)).
*   **Refractive Tiles**: 
    - Cards that appear to have thickness (Z-index depth).
    - On-tap "Liquid Ripple" integration in CS-Electric Blue.

## 5. Layout & Motion (Design Spells)
*   **The "Magnetic Field"**: Buttons and interactive tiles have a subtle "pull" (Magnetic Magic) towards the user's cursor or tap-point.
*   **Spring Physics Transitions**: All step transitions use `stiffness: 260, damping: 20` to feel organic and fluid, never linear.
*   **Adaptive Padding**: The interface expands and contracts slightly (breathing room) based on the length of the conversational inputs.
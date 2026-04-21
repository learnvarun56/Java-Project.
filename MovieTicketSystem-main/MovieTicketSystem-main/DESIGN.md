# Design System: Movie Booking System (The Cinematic Editorial)

## 1. Typography
The system uses a narrative hierarchy with three distinct typefaces to distinguish between cinematic impact and functional clarity.

- **Headline/Display Font**: `Epilogue`
    - *Usage*: Movie titles, hero statements, and high-impact headers.
    - *Style*: Bold weights mimic film posters. Recommended `-0.02em` letter-spacing for editorial feel.
- **Body Font**: `Manrope`
    - *Usage*: Synopses, section headers, and general descriptive text.
    - *Style*: Sophisticated sans-serif, optimized for readability on dark backgrounds.
- **Label Font**: `Inter`
    - *Usage*: Metadata (durations, ratings, timestamps), navigation labels.
    - *Style*: Precise and functional.

## 2. Color Palette
Rooted in the immersive darkness of a cinema, using high-contrast accents for focal points.

### Core Colors
| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Primary (Cinema Red)** | `#ff8e80` | High-intent actions, primary buttons. |
| **Primary Dim** | `#e80f16` | Accents and lower-intensity red. |
| **Secondary (Popcorn Gold)** | `#fdc003` | Ratings, VIP status, premium selections. |
| **Background** | `#0e0e0e` | Base canvas (Obsidian). |
| **Text (On Background)** | `#ffffff` | Main readability color. |

### Surface Hierarchy (Tonal Layering)
Define depth through background shifts instead of borders.
- **Level 0 (Base)**: `#0e0e0e` (Surface)
- **Level 1 (Sections)**: `#131313` (Surface Container Low)
- **Level 2 (Interaction Cards)**: `#262626` (Surface Container Highest)
- **Bright Accents**: `#2c2c2c` (Surface Bright)

## 3. Spacing & Structure
- **Spacing Scale**: `3` (Generous vertical padding, typically 32px-48px between sections).
- **No-Line Rule**: Prohibited from using 1px solid borders. Boundaries are defined by:
    1. Background Shifts (Tonal layering).
    2. Negative Space.
    3. Tonal Transitions (Subtle gradients).
- **Corner Roundness**: `ROUND_FOUR` (Approx. 4px/6px radius for a sharp, tailored cinematic look).

## 4. Visual Effects
- **Glassmorphism**: Floating elements (Nav bars, summaries) should use 70% opacity with `24px` backdrop-blur.
- **Atmospheric Shadows**: Large blur (40px+) with low opacity (6%) `on-surface` tint.
- **Signage Glow**: Primary buttons use a linear gradient from `#ff8e80` to `#ff7668` to mimic neon signage.

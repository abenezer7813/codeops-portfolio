# Habesha Eatery — Responsive Marketing Site

A responsive multi-section marketing website built for **Habesha Eatery**, an authentic Ethiopian restaurant located in Bole, Addis Ababa. 

This project was built as part of **Week 1 (CodeOps Full Stack Software Development)** to demonstrate core competency in semantic HTML5 markup, CSS architecture (Flexbox & Grid), fluid typography, and mobile-first responsive web design without external dependencies.

---

## 💡 What Was Built & Technical Implementation

### 1. Sticky Navigation (Flexbox Layout)
- Built a persistent header using CSS `position: sticky`.
- Used **Flexbox** (`justify-content: space-between`) to align the brand logo to the left and navigation links to the right.

### 2. Fluid Hero Section
- Implemented responsive fluid typography using `clamp(2rem, 5vw, 3.75rem)` for the main heading, eliminating the need for rigid pixel font size overrides.
- Styled a high-contrast Call-to-Action button that smoothly scrolls to the reservation section.

### 3. Story / About Section
- Focused on readable line lengths (`max-width: 800px`) and clean vertical rhythms using CSS custom properties (`:root` tokens).

### 4. Dynamic Menu Grid
- Constructed an automated responsive card layout using CSS Grid: `repeat(auto-fit, minmax(280px, 1fr))`.
- Cards naturally reflow from **1 column** on small mobile devices (360px), to **2 columns** on tablets, up to **3 columns** on desktop screens without requiring hardcoded media queries for columns.
- Enhanced UX with a subtle `transform: translateY(-4px)` hover transition.

### 5. Validated Reservation Form
- Applied semantic HTML5 input types (`text`, `email`, `tel`, `number`, `date`, `time`).
- Enforced native input validation using attributes like `required`, `minlength`, `min`/`max`, and regex `pattern` matching for Ethiopian mobile numbers (`^(\+251|0)[97]\d{8}$`).

### 6. Contact & Footer Section
- Organised restaurant location details (Bole Sub-City, near Bole Medhanealem Church), operating hours, and contact phone numbers into a multi-column responsive grid layout.

---

## 🎯 Why It Was Built

- **Mobile-First Realism:** Most web traffic in Ethiopia is mobile-driven over cellular data. Building mobile-first guarantees light initial payloads and optimal performance across all device viewports.
- **Pure CSS Architecture:** Mastered modern layout techniques (Flexbox, CSS Grid, custom properties) before integrating JavaScript or CSS frameworks.
- **Clean Version Control:** Maintained an atomic Git commit log with one commit per completed feature section.

---

## 🛠️ Tech Stack & Concepts Applied

- **HTML5:** Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`)
- **CSS3:** Flexbox, CSS Grid (`auto-fit`, `minmax`), CSS Custom Variables (`:root`), `clamp()`, Mobile-First queries





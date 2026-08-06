# Ethio Telecom Dashboard Layout Rebuild

This project is a layout reconstruction of an Ethio Telecom / telebirr style account dashboard built as part of the CodeOps Day 14 mini-project.

## Rebuilt Interface
* **Target Interface**: Ethio Telecom User Account Dashboard

## CSS Layout Breakdown

### CSS Grid Usage
- **Page Skeleton**: Built using `grid-template-areas` defining the `header`, `sidebar`, `main`, and `footer` areas.
- **Card Grid**: Uses `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` to create a self-responsive card system without requiring extra media queries.
- **Responsive Collapse**: A single media query at `700px` switches the page skeleton to a single column layout.

### Flexbox Usage
- **Navbar**: Aligns logo and menu options horizontally using `display: flex` with `justify-content: space-between`.
- **Toolbar**: Positions the dashboard heading and primary action button using Flexbox.

### Positioning
- **Sticky Header**: Header stays pinned to the top of the viewport using `position: sticky; top: 0`.
- **Badge Tag**: Stat cards use `position: relative` with an absolutely positioned status badge (`position: absolute; top: 10px; right: 10px`).
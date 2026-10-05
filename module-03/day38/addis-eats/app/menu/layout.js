import Categories from './Categories'
import { Suspense } from "react";
const categories = [
  "All",
  "Traditional Stews & Wat",
  "Tibs & Grills",
  "Raw & Cured Delicacies / Kitfo",
  "Fasting & Vegan / Tsom",
  "Beverages & Tej",
];

export default function MenuLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
        <Suspense fallback={null}>      <Categories categories={categories} />
</Suspense>
      <section style={{ flex: 1 }}>{children}</section>
    </div>
  );
}
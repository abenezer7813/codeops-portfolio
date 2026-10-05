// app/menu/FilterShell.jsx
"use client";
import { useState } from "react";

export default function FilterShell({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)}>
        {open ? "Hide dishes" : "Show dishes"}
      </button>
      {open && children}
    </div>
  );
}
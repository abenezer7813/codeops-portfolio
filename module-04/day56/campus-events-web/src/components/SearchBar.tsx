"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search events by title"
      aria-label="Search events by title"
      className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
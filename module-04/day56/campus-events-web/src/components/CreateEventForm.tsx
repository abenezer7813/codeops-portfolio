"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createEvent } from "@/app/services/eventService";
import type { CampusEvent } from "@/types/event";

const CATEGORIES = ["technology", "sports", "career", "arts", "academic", "social", "other"];

const emptyValues = {
  title: "",
  description: "",
  location: "",
  eventDate: "",
  category: "",
  isPublished: false,
};

type Values = typeof emptyValues;
type FieldErrors = Partial<Record<keyof Values, string>>;

function validate(values: Values): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.description.trim()) errors.description = "Description is required.";
  if (!values.location.trim()) errors.location = "Location is required.";
  if (!values.eventDate) errors.eventDate = "Choose a date and time.";
  if (!values.category) errors.category = "Choose a category.";
  return errors;
}

const inputClass =
  "w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500";

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block font-medium">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function CreateEventForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(emptyValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<CampusEvent | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;
    const next = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setValues((current) => ({ ...current, [name]: next }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 1. stop the browser's own form submission
    setServerErrors([]);
    setCreated(null);

    const errors = validate(values); // 2. check required fields
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      // 3. send the POST request
      const result = await createEvent({
        title: values.title.trim(),
        description: values.description.trim(),
        location: values.location.trim(),
        eventDate: new Date(values.eventDate).toISOString(),
        category: values.category,
        isPublished: values.isPublished,
      });

      if (!result.ok) {
        setServerErrors(result.errors); // 4. show the backend's messages
        return;
      }

      setCreated(result.event); // 4. show success
      setValues(emptyValues); // clear the form
      router.refresh(); // 5. refresh server data
    } catch {
      setServerErrors([
        "Could not reach the server. Check that the backend is running and try again.",
      ]);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {created && (
        <div className="rounded-lg border border-green-300 bg-green-50 p-4 text-green-800">
          Event created successfully.{" "}
          <Link href={`/events/${created.id}`} className="font-medium underline">
            View &ldquo;{created.title}&rdquo;
          </Link>
        </div>
      )}

      {serverErrors.length > 0 && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          <p className="mb-1 font-medium">Please fix the following:</p>
          <ul className="list-disc pl-5">
            {serverErrors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <Field label="Title" name="title" error={fieldErrors.title}>
        <input id="title" name="title" value={values.title} onChange={handleChange} className={inputClass} />
      </Field>

      <Field label="Description" name="description" error={fieldErrors.description}>
        <textarea id="description" name="description" rows={4} value={values.description} onChange={handleChange} className={inputClass} />
      </Field>

      <Field label="Location" name="location" error={fieldErrors.location}>
        <input id="location" name="location" value={values.location} onChange={handleChange} className={inputClass} />
      </Field>

      <Field label="Event date and time" name="eventDate" error={fieldErrors.eventDate}>
        <input id="eventDate" name="eventDate" type="datetime-local" value={values.eventDate} onChange={handleChange} className={inputClass} />
      </Field>

      <Field label="Category" name="category" error={fieldErrors.category}>
        <select id="category" name="category" value={values.category} onChange={handleChange} className={`${inputClass} bg-white`}>
          <option value="">Select a category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </Field>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="isPublished" checked={values.isPublished} onChange={handleChange} />
        Publish this event now
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}
import CreateEventForm from "@/components/CreateEventForm";

export default function CreateEventPage() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">Create Event</h1>
      <p className="mb-6 mt-2 text-gray-600">
        Fill in the details below to add a new campus event.
      </p>
      <CreateEventForm />
    </div>
  );
}
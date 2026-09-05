export async function load(
  url,
  signal,
  setData,
  setError,
  setLoading
) {
  try {
    setLoading(true);
    setError(null);

    const res = await fetch(url, { signal });

    if (!res.ok) {
      throw new Error("Failed to fetch dishes");
    }

    const data = await res.json();

    setData(data);
  } catch (error) {
    if (error.name !== "AbortError") {
      setError(error.message);
    }
  } finally {
    setLoading(false);
  }
}
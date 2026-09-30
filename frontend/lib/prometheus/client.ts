export async function queryPrometheus(
  kind: "query" | "query_range",
  query: string,
) {
  const url = new URL(`${process.env.PROMETHEUS_URL}/api/v1/${kind}`);

  url.searchParams.set("query", query);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Prometheus unavailable");
  }

  return response.json();
}

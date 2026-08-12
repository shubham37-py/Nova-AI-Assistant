const API_URL = "http://127.0.0.1:8000";

export async function getTasks(page = 1, limit = 20, completed = null) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (completed !== null) {
    params.append("completed", completed.toString());
  }

  const response = await fetch(
    `${API_URL}/tasks/?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}
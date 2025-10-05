const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export async function getFeedbacks(offset = "", sort = "desc") {
  const pageSize = 5;
  const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`);
  url.searchParams.append("pageSize", pageSize);
  url.searchParams.append("sort[0][field]", "Created");
  url.searchParams.append("sort[0][direction]", sort);
  if (offset) url.searchParams.append("offset", offset);

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) throw new Error("Failed to fetch feedbacks");
  return await res.json();
}

export async function createFeedback(fields) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error("Failed to create feedback");
  return await res.json();
}

export async function updateFeedback(id, fields) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error("Failed to update feedback");
  return await res.json();
}

export async function deleteFeedback(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete feedback");
  return await res.json();
}

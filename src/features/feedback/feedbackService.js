const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// ✅ Get feedbacks with pagination & sorting
export async function getFeedbacks(page = 1, sort = "desc") {
  const pageSize = 5;
  const offsetParam = page > 1 ? `&offset=${(page - 1) * pageSize}` : "";

  const res = await fetch(
    `${BASE_URL}?pageSize=${pageSize}&sort[0][field]=Created&sort[0][direction]=${sort}${offsetParam}`,
    { headers }
  );
  if (!res.ok) throw new Error("Failed to fetch feedbacks");
  return await res.json();
}

// ✅ Create feedback
export async function createFeedback(fields) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error("Failed to create feedback");
  return await res.json();
}

// ✅ Update feedback
export async function updateFeedback(id, fields) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error("Failed to update feedback");
  return await res.json();
}

// ✅ Delete feedback
export async function deleteFeedback(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete feedback");
  return await res.json();
}

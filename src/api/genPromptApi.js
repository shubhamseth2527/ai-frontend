export const sendPrompt = async (prompt) => {
  const res = await fetch("http://localhost:5000/api/gen-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  return res.json();
};
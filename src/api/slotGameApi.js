export const slotMachine = async () => {
  const res = await fetch("http://localhost:5000/api/slot-machine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  return res.json();
};
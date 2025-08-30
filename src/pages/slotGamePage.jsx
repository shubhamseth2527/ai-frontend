import React, {useState, useEffect, useRef } from "react";
  const [slots, setSlots] = useState(["❓", "❓", "❓"]);
  const [message, setMessage] = useState("");

  const spin = async () => {
     try {
          const result = await slotMachine(prompt);
          setResponse(result.response || "No response received.");
        } catch (err) {
          setResponse("Error: Failed to fetch response.");
        } finally {
          setLoading(false);
        }
    const res = await axios.get("http://localhost:5000/spin");
    setSlots(res.data.result);
    setMessage(res.data.message);
  };
  return (
    <div className="App">
      <h1>🎰 Slot Machine</h1>
      <div className="slots">
        {slots.map((s, i) => (
          <span key={i} className="slot">{s}</span>
        ))}
      </div>
      <button onClick={spin}>Spin</button>
      <p>{message}</p>
    </div>
  );
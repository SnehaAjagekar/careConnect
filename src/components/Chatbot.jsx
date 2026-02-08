import { useState } from "react";
import ReactMarkdown from "react-markdown";
const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Model ID - Using 2.0 Flash Lite for speed and efficiency
  const MODEL_NAME = "gemini-2.5-flash-lite";
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Prepare the history for the API (mapping our roles to Gemini roles)
      // Gemini expects roles: "user" and "model"
      const history = updatedMessages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));

      // Add System Instructions at the beginning of the context
      const payload = {
        contents: history,
        systemInstruction: {
          parts: [{ text: "You are a healthcare support assistant. Answer clearly and safely. Do not provide medical diagnoses or prescriptions. Always advise the user to consult a professional for serious concerns." }]
        }
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch");
      }

      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that.";

      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "I'm having trouble connecting. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

//   return (
//     <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center", color: "#2c3e50" }}>🏥 Healthcare Support AI</h2>

//       <div
//         style={{
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           padding: "15px",
//           height: "400px",
//           overflowY: "auto",
//           marginBottom: "15px",
//           backgroundColor: "#f9f9f9"
//         }}
//       >
//         {messages.map((msg, index) => (
//           <div key={index} style={{ marginBottom: "10px", textAlign: msg.role === "user" ? "right" : "left" }}>
//             <span
//               style={{
//                 display: "inline-block",
//                 padding: "8px 12px",
//                 borderRadius: "15px",
//                 backgroundColor: msg.role === "user" ? "#007bff" : "#e9ecef",
//                 color: msg.role === "user" ? "white" : "black",
//               }}
//             >
//               <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong> {msg.text}
//             </span>
//           </div>
//         ))}
//         {loading && <p style={{ fontSize: "0.9rem", color: "#666" }}><em>Assistant is thinking...</em></p>}
//       </div>

//       <div style={{ display: "flex", gap: "10px" }}>
//         <input
//           type="text"
//           placeholder="Describe your symptoms or ask a health question..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           style={{ flexGrow: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
//         />
//         <button 
//           onClick={sendMessage} 
//           disabled={loading}
//           style={{ 
//             padding: "10px 20px", 
//             backgroundColor: "#28a745", 
//             color: "white", 
//             border: "none", 
//             borderRadius: "5px",
//             cursor: loading ? "not-allowed" : "pointer"
//           }}
//         >
//           {loading ? "..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );

return (
  <div style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
    <h2 style={{ textAlign: "center", color: "#2c3e50" }}>🏥 Healthcare Support AI</h2>

    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        height: "500px",
        overflowY: "auto",
        marginBottom: "15px",
        backgroundColor: "#fcfcfc",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}
    >
      {messages.map((msg, index) => (
        <div 
          key={index} 
          style={{ 
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%"
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "18px",
              borderBottomRightRadius: msg.role === "user" ? "2px" : "18px",
              borderBottomLeftRadius: msg.role === "model" || msg.role === "bot" ? "2px" : "18px",
              backgroundColor: msg.role === "user" ? "#007bff" : "#ffffff",
              color: msg.role === "user" ? "white" : "#333",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              border: msg.role === "user" ? "none" : "1px solid #eee",
              fontSize: "0.95rem",
              lineHeight: "1.5"
            }}
          >
            <strong style={{ display: "block", marginBottom: "5px", fontSize: "0.8rem", opacity: 0.8 }}>
              {msg.role === "user" ? "You" : "Assistant"}
            </strong>

            {/* Markdown rendering happens here */}
            <div className="markdown-content">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
      
      {loading && (
        <div style={{ alignSelf: "flex-start", color: "#888", fontSize: "0.85rem" }}>
          <em>Assistant is typing...</em>
        </div>
      )}
    </div>

    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Describe symptoms or ask a health question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ 
          flexGrow: 1, 
          padding: "12px", 
          borderRadius: "8px", 
          border: "1px solid #ccc",
          outline: "none"
        }}
      />
      <button 
        onClick={sendMessage} 
        disabled={loading}
        style={{ 
          padding: "0 25px", 
          backgroundColor: "#28a745", 
          color: "white", 
          border: "none", 
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.3s"
        }}
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  </div>
);

};

export default Chatbot;
import { useState, useEffect, useRef } from "react";

const faqs = [
  {
    question: "What kind of support does Jarurat Care provide?",
    answer:
      "Jarurat Care provides emotional, financial, and practical support to cancer patients and their families throughout their treatment journey.",
  },
  {
    question: "How can I request cancer support?",
    answer:
      "You can request support by filling out the support form; our team will review your request and contact you with next steps.",
  },
  {
    question: "Is Jarurat Care’s support free?",
    answer:
      "Yes — all support services provided by Jarurat Care are free and focused on helping patients in need.",
  },
  {
    question: "How do I become a volunteer or caregiver?",
    answer:
      "To become a volunteer or caregiver, select ‘Volunteer’ in the form and share your skills and availability; our team will connect with you.",
  },
  {
    question: "What should I do if I want to donate?",
    answer:
      "You can donate through the donation page to support patient care, awareness programs, and essential services.",
  },
];

function FaqChatbot() {
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I’m here to help. Please select a question below.",
    },
  ]);  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);
  const handleQuestionClick = (faq) => {
    setChat((prevChat) => [
      ...prevChat,
      { sender: "user", text: faq.question },
      { sender: "bot", text: faq.answer },
    ]);
  };

  return (
    <div style={styles.chatbotContainer}>
      <h3 style={styles.heading}>Healthcare FAQ Assistant</h3>

      <div style={styles.chatWindow} ref={chatWindowRef}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender === "bot"
                ? styles.botMsg
                : styles.userMsg
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div>
        {faqs.map((faq, index) => (
          <button
            key={index}
            style={styles.faqButton}
            onClick={() => handleQuestionClick(faq)}
          >
            {faq.question}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  chatbotContainer: {
    width: "100%",
    maxWidth: "340px",
    margin: "0 auto",
    padding: "16px",
    borderRadius: "14px",
    backgroundColor: "#f8fafc",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    fontFamily: "'Manrope', Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  },
  heading: {
    textAlign: "center",
    margin: "0 0 14px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1b2535",
  },
  chatWindow: {
    height: "200px",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    border: "1px solid #e2e8f0",
  },
  botMsg: {
    backgroundColor: "#dbeafe",
    padding: "10px 12px",
    borderRadius: "8px",
    marginBottom: "2px",
    fontSize: "13px",
    alignSelf: "flex-start",
    maxWidth: "85%",
    wordWrap: "break-word",
    color: "#1e40af",
    lineHeight: "1.4",
  },
  userMsg: {
    backgroundColor: "#dcfce7",
    padding: "10px 12px",
    borderRadius: "8px",
    marginBottom: "2px",
    fontSize: "13px",
    alignSelf: "flex-end",
    maxWidth: "85%",
    wordWrap: "break-word",
    color: "#166534",
    lineHeight: "1.4",
  },
  faqButton: {
    width: "100%",
    margin: "6px 0",
    padding: "10px 12px",
    border: "1px solid #2563eb",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    textAlign: "left",
  },
};

export default FaqChatbot;

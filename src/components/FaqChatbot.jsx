import { useState } from "react";

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
  ]);

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

      <div style={styles.chatWindow}>
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
    maxWidth: "400px",
    margin: "40px auto",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f9fafb",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
  },
  chatWindow: {
    height: "220px",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  },
  botMsg: {
    backgroundColor: "#e3f2fd",
    padding: "8px",
    borderRadius: "5px",
    marginBottom: "6px",
    fontSize: "14px",
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  userMsg: {
    backgroundColor: "#d1fae5",
    padding: "8px",
    borderRadius: "5px",
    marginBottom: "6px",
    fontSize: "14px",
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  faqButton: {
    width: "100%",
    margin: "4px 0",
    padding: "8px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "13px",
  },
};

export default FaqChatbot;

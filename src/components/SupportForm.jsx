import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import FaqChatbot from "./FaqChatbot";

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chatbot
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    const nameValue = formData.name.trim();
    const emailValue = formData.email.trim();
    const phoneValue = formData.phone.trim();
    const roleValue = formData.role.trim();
    const messageValue = formData.message.trim();

    if (!nameValue) nextErrors.name = "Name is required.";
    if (!emailValue) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!phoneValue) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[+\d][\d\s()-]{7,}$/.test(phoneValue)) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!roleValue) nextErrors.role = "Please select your role.";
    if (!messageValue) {
      nextErrors.message = "Message is required.";
    } else if (messageValue.length < 10) {
      nextErrors.message = "Message should be at least 10 characters.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "supportRequests"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSuccessMessage("Support request submitted successfully.");
      setTimeout(() => setSuccessMessage(""), 4000);
      setFormData({ name: "", email: "", phone: "", role: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- UI STYLES ---
  const containerStyle = {
    width: "100%",
    padding: "32px",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    boxShadow: "0 18px 45px rgba(22, 32, 46, 0.18)",
    border: "1px solid rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(6px)"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    margin: "8px 0 16px 0",
    display: "inline-block",
    border: "1px solid #d7dee9",
    borderRadius: "12px",
    boxSizing: "border-box",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease"
  };

  const labelStyle = { fontWeight: "600", color: "#2d3648", fontSize: "13px", letterSpacing: "0.02em" };
  const errorTextStyle = { color: "#c0392b", fontSize: "12px", marginTop: "-14px", marginBottom: "12px" };
  const successTextStyle = { color: "#1e7e34", backgroundColor: "#e7f5ee", border: "1px solid #b7e1c2", padding: "10px 12px", borderRadius: "8px", marginBottom: "16px", textAlign: "center", fontSize: "14px" };
  const getInputStyle = (fieldName) => (
    errors[fieldName] ? { ...inputStyle, borderColor: "#e74c3c" } : inputStyle
  );

  const buttonStyle = {
    width: "100%",
    background: isSubmitting
      ? "linear-gradient(135deg, #9dd8b4, #6cc68c)"
      : "linear-gradient(135deg, #2f80ed, #1f5bcc)",
    color: "white",
    padding: "14px 20px",
    margin: "6px 0 4px",
    border: "none",
    borderRadius: "12px",
    cursor: isSubmitting ? "not-allowed" : "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "transform 0.2s ease, box-shadow 0.3s ease"
  };

  // Floating Button & Chat Window Styles
  const floatingBtnStyle = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    fontSize: "24px",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease"
  };

  const chatOverlayStyle = {
    position: "fixed",
    bottom: "100px",
    right: "30px",
    width: "400px",
    height: "550px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    zIndex: 1001,
    display: isChatOpen ? "flex" : "none", // Toggle visibility
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid #eee"
  };

  return (
    <div className="support-page">
      <div className="support-glow support-glow--one" />
      <div className="support-glow support-glow--two" />
      <div className="support-shell">
        <div className="support-intro">
          <span className="support-badge">CareConnect Support</span>
          <h1 className="support-title">Fast, friendly healthcare support.</h1>
          <p className="support-subtitle">Send your request and our care team will get back to you within 24 hours.</p>
          <div className="support-highlights">
            <div className="support-highlight">🔐 Secure + confidential submissions</div>
            <div className="support-highlight">👩‍⚕️ Human review on every request</div>
            <div className="support-highlight">📬 Easy follow-up by email</div>
          </div>
          <div className="support-micro">Need urgent help? Call your local emergency number.</div>
        </div>

        {/* 1. MAIN SUPPORT FORM */}
        <div style={containerStyle} className="support-card">
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h2 className="support-form-title">Healthcare Support</h2>
            <p className="support-form-subtitle">Tell us a bit about your need and we'll respond soon.</p>
          </div>
          {successMessage && <div style={successTextStyle}>{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Full Name</label>
          <input className="support-input" type="text" name="name" placeholder="e.g. John Doe" value={formData.name} onChange={handleChange} required style={getInputStyle("name")} />
          {errors.name && <div style={errorTextStyle}>{errors.name}</div>}

          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Email Address</label>
              <input className="support-input" type="email" name="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} required style={getInputStyle("email")} />
              {errors.email && <div style={errorTextStyle}>{errors.email}</div>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Phone Number</label>
              <input className="support-input" type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} required style={getInputStyle("phone")} />
              {errors.phone && <div style={errorTextStyle}>{errors.phone}</div>}
            </div>
          </div>

          <label style={labelStyle}>I am a...</label>
          <select className="support-input" name="role" value={formData.role} onChange={handleChange} required style={getInputStyle("role")}>
            <option value="">Select your role</option>
            <option value="Patient">Patient</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Doctor">Doctor</option>
          </select>
          {errors.role && <div style={errorTextStyle}>{errors.role}</div>}

          <label style={labelStyle}>How can we support you?</label>
          <textarea className="support-input" name="message" placeholder="Please describe your request in detail..." value={formData.message} onChange={handleChange} rows="4" required style={{ ...getInputStyle("message"), resize: "vertical", minHeight: "110px" }} />
          {errors.message && <div style={errorTextStyle}>{errors.message}</div>}

          <button className="support-button" type="submit" disabled={isSubmitting} style={buttonStyle}>
            {isSubmitting ? "Submitting..." : "Submit Support Request"}
          </button>
          <div className="support-helper">By submitting, you agree to our privacy-friendly processing.</div>
        </form>
      </div>

      {/* 2. CHATBOT OVERLAY WINDOW */}
      <div style={chatOverlayStyle}>
        {/* Header for the Chat Popup */}
        <div style={{ padding: "15px", backgroundColor: "#007bff", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ fontSize: "16px" }}>🏥 Medical Assistant</strong>
          <button onClick={() => setIsChatOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "18px" }}>✕</button>
        </div>
        {/* Chatbot Content Area */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <FaqChatbot />
        </div>
      </div>

      {/* 3. FLOATING BUTTON */}
      <button 
        style={floatingBtnStyle} 
        onClick={() => setIsChatOpen(!isChatOpen)}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      >
        {isChatOpen ? "✕" : "💬"}
      </button>
      </div>
    </div>
  );
};

export default SupportForm;
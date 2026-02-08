import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "supportRequests"), {
        ...formData,
        createdAt: serverTimestamp()
      });

      alert("Support request submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        message: ""
      });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Healthcare Support Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="Patient">Patient</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Doctor">Doctor</option>
        </select>

        <br /><br />

        <textarea
          name="message"
          placeholder="Describe your issue or support needed"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
        />

        <br /><br />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default SupportForm;

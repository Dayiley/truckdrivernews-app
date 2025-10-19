import { useState } from "react";
import { createFeedback } from "./feedbackServices.js";
import styles from "./FeedbackForm.module.css";

export default function FeedbackForm({ onFeedbackAdded }) {
  const [form, setForm] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.message) {
      setError("Please fill all fields.");
      return;
    }

    setStatus("loading");
    try {
      await createFeedback({
        Name: form.name,
        Email: form.email,
        Message: form.message,
      });
      setForm({ name: "", email: "", message: "" });
      setStatus("success");
      onFeedbackAdded();
    } catch {
      setStatus("error");
      setError("Failed to submit.");
    } finally {
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>

      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Your email (optional)"
        value={form.email}
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Your feedback"
        value={form.message}
        onChange={handleChange}
        rows="3"
        className={styles.textarea}
      />

      {error && <p className={styles.error}>{error}</p>}

      <button disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Add Feedback"}
      </button>

      {status === "success" && (
        <p className={styles.success}>Feedback added ✅</p>
      )}
    </form>
  );
}

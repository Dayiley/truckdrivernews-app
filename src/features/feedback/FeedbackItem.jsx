import { useState } from "react";
import { updateFeedback, deleteFeedback } from "./feedbackService.js";
import styles from "./FeedbackItem.module.css";

export default function FeedbackItem({ feedback, onReload }) {
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(feedback.fields.Message);
  const [status, setStatus] = useState("idle");

  async function handleUpdate() {
    setStatus("loading");
    try {
      await updateFeedback(feedback.id, { Message: message });
      setEditing(false);
      onReload();
    } catch {
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this feedback?")) return;
    await deleteFeedback(feedback.id);
    onReload();
  }

  return (
    <div className={styles.card}>
      <strong>{feedback.fields.Name}</strong>
      {editing ? (
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
      ) : (
        <p>{feedback.fields.Message}</p>
      )}

      <div className={styles.actions}>
        {editing ? (
          <>
            <button onClick={handleUpdate} disabled={status === "loading"}>
              Save
            </button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { updateFeedback, deleteFeedback } from "./feedbackServices.js";
import styles from "./FeedbackItem.module.css";

export default function FeedbackItem({ feedback, onReload }) {
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(feedback.fields.Message);
  const [status, setStatus] = useState("idle");

  const createdRaw = feedback.fields?.Created || feedback.createdTime;
  const createdDate = createdRaw ? new Date(createdRaw) : null;
  const formattedDate = createdDate
    ? createdDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown date";

  const name = feedback.fields?.Name || "Anonymous";
  const email = feedback.fields?.Email || "";

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
    <article className="card">
      <div className={styles.actions}>
        {editing ? (
          <>
            <button
              onClick={handleUpdate}
              disabled={status === "loading"}
              aria-label="Save feedback"
              title="Save"
              className={styles.iconBtn}
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              aria-label="Cancel edit"
              title="Cancel"
              className={styles.iconBtn}
            >
              ✖
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              aria-label="Edit feedback"
              title="Edit"
              className={styles.iconBtn}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              onClick={handleDelete}
              aria-label="Delete feedback"
              title="Delete"
              className={styles.iconBtn}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </>
        )}
      </div>

      {editing ? (
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.editInput}
          placeholder="Edit feedback…"
        />
      ) : (
        <p className={styles.text}>{feedback.fields.Message}</p>
      )}

      <footer className={styles.footer}>
        Submitted by{" "}
        {email ? (
          <a
            href={`mailto:${email}`}
            className={styles.emailLink}
            title={`Email ${name}`}
          >
            {name}
          </a>
        ) : (
          <strong className={styles.nameOnly}>{name}</strong>
        )}{" "}
        on {formattedDate}
      </footer>
    </article>
  );
}

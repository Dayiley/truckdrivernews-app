import FeedbackItem from "./FeedbackItem.jsx";
import styles from "./FeedbackList.module.css";

export default function FeedbackList({ feedbacks, onReload, page, setPage }) {
  if (feedbacks.length === 0) return <p>No feedbacks found.</p>;

  return (
    <div className={styles.list}>
      {feedbacks.map((fb) => (
        <FeedbackItem key={fb.id} feedback={fb} onReload={onReload} />
      ))}

      <div className={styles.pagination}>
        {page > 1 && <button onClick={() => setPage(page - 1)}>← Prev</button>}
        <span>Page {page}</span>
        {feedbacks.length >= 5 && (
          <button onClick={() => setPage(page + 1)}>Next →</button>
        )}
      </div>
    </div>
  );
}

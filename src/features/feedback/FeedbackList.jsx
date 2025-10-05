import FeedbackItem from "./FeedbackItem.jsx";
import styles from "./FeedbackList.module.css";

export default function FeedbackList({
  feedbacks,
  onReload,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) {
  if (feedbacks.length === 0) return <p>No feedbacks found.</p>;

  return (
    <div className={styles.list}>
      {feedbacks.map((fb) => (
        <FeedbackItem key={fb.id} feedback={fb} onReload={onReload} />
      ))}

      <div className={styles.pagination}>
        {hasPrev && <button onClick={onPrev}>← Prev</button>}
        {hasNext && <button onClick={onNext}>Next →</button>}
      </div>
    </div>
  );
}

import FeedbackItem from './FeedbackItem.jsx';
import styles from './FeedbackList.module.css';

export default function FeedbackList({
  feedbacks,
  onReload,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) {
  return (
    <div className={styles.list}>
      {feedbacks.map((fb) => (
        <FeedbackItem key={fb.id} feedback={fb} onReload={onReload} />
      ))}

      <div className={styles.pagination}>
        <button onClick={onPrev} disabled={!hasPrev} aria-label="Go to previous page">
          ← Prev
        </button>
        <button onClick={onNext} disabled={!hasNext} aria-label="Go to next page">
          Next →
        </button>
      </div>
    </div>
  );
}

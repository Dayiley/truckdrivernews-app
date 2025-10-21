import { useState, useEffect, useCallback } from "react";
import FeedbackForm from "../features/feedback/FeedbackForm.jsx";
import FeedbackList from "../features/feedback/FeedbackList.jsx";
import { getFeedbacks } from "../features/feedback/feedbackServices.js";
import styles from "./Feedback.module.css";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("desc");
  const [offset, setOffset] = useState("");
  const [nextOffset, setNextOffset] = useState(null);
  const [prevOffsets, setPrevOffsets] = useState([]);

  const loadFeedbacks = useCallback(
    async (currentOffset = "") => {
      setLoading(true);
      try {
        const data = await getFeedbacks(currentOffset, sort);
        setFeedbacks(data.records || []);
        setNextOffset(data.offset || null);

        if (currentOffset) {
          setPrevOffsets((prev) => {
            if (!prev.includes(currentOffset)) {
              return [...prev, currentOffset];
            }
            return prev;
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [sort]
  );

  useEffect(() => {
    setOffset("");
    setPrevOffsets([]);
    loadFeedbacks("");
  }, [sort, loadFeedbacks]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Leave a Feedback!</h1>
      <FeedbackForm onFeedbackAdded={() => loadFeedbacks(offset)} />

      <div className={styles.controls}>
        <label>
          Sort by:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
      </div>
      {loading && <p>Loading feedbacks...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <FeedbackList
          feedbacks={feedbacks}
          onReload={() => loadFeedbacks(offset)}
          onNext={() => {
            if (nextOffset) {
              setOffset(nextOffset);
              loadFeedbacks(nextOffset);
            }
          }}
          onPrev={() => {
            const newPrev = [...prevOffsets];
            newPrev.pop();
            const prev = newPrev[newPrev.length - 1] || "";
            setPrevOffsets(newPrev);
            setOffset(prev);
            loadFeedbacks(prev);
          }}
          hasNext={!!nextOffset}
          hasPrev={prevOffsets.length > 0}
        />
      )}
    </section>
  );
}

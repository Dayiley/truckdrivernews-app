import { useState, useEffect } from "react";
import FeedbackForm from "../features/feedback/FeedbackForm.jsx";
import FeedbackList from "../features/feedback/FeedbackList.jsx";
import { getFeedbacks } from "../features/feedback/feedbackService.js";
import styles from "./Feedback.module.css";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");

  async function loadFeedbacks() {
    setLoading(true);
    try {
      const data = await getFeedbacks(page, sort);
      setFeedbacks(data.records || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeedbacks();
  }, [page, sort]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Feedback Manager</h1>
      <FeedbackForm onFeedbackAdded={loadFeedbacks} />
      <hr />
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
          onReload={loadFeedbacks}
          page={page}
          setPage={setPage}
        />
      )}
    </section>
  );
}

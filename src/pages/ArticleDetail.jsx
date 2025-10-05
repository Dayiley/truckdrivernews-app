import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./ArticleDetail.module.css";
import { Link } from "react-router-dom";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(
          `https://truckdrivernews.com/wp-json/wp/v2/posts/${id}?_embed`
        );
        if (!res.ok) throw new Error("Failed to fetch article");
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!article) return <p>Article not found.</p>;

  const content = article.content.rendered;

  return (
    <article className={styles.container}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Link to="/">← Back to Home</Link>
    </article>
  );
}

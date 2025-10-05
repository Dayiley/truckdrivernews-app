import { useState, useEffect } from "react";
import ArticleCard from "../features/articles/ArticleCard.jsx";
import styles from "./Home.module.css";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          "https://truckdrivernews.com/wp-json/wp/v2/posts?_embed"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Truck Driver News</h1>
      <p className={styles.subtitle}>Latest trucking industry articles</p>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
    </section>
  );
}

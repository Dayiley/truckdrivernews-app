import { useState, useEffect } from "react";
import ArticleCard from "../features/articles/ArticleCard.jsx";
import {
  getArticlesCached,
  invalidateArticlesCache,
} from "../features/articles/articlesCache";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchArticlesFromApi() {
    const res = await fetch(
      "https://truckdrivernews.com/wp-json/wp/v2/posts?_embed"
    );
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  }

  useEffect(() => {
    let isMounted = true;

    async function loadArticles() {
      try {
        const { fromCache, articles } = await getArticlesCached(
          fetchArticlesFromApi,
          {
            ttlMs: 10 * 60 * 1000,
          }
        );

        if (!isMounted) return;

        setArticles(articles);
        setLoading(false);

        if (fromCache) {
          console.log("✅ Articles loaded from cache");
        } else {
          console.log("🌐 Articles fetched from API");
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err.message);
        setLoading(false);
      }
    }

    loadArticles();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}

      <button
        onClick={() => {
          invalidateArticlesCache();
          window.location.reload();
        }}
      >
        Refresh Articles
      </button>
    </section>
  );
}

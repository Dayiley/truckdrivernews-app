import styles from "./ArticleCard.module.css";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const title = article.title.rendered;
  const excerpt = article.excerpt.rendered;
  const image =
    article._embedded &&
    article._embedded["wp:featuredmedia"] &&
    article._embedded["wp:featuredmedia"][0].source_url;

  return (
    <article className="card">
      {image && <img src={image} alt={title} className={styles.image} />}
      <h2
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div
        className={styles.excerpt}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />

      <Link to={`/article/${article.id}`} className={styles.readMore}>
        Read More →
      </Link>
    </article>
  );
}

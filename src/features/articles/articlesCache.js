export async function getArticlesCached(
  fetchApi,
  { ttlMs = 5 * 60 * 1000 } = {}
) {
  const KEY = "articlesCache:v1";
  const now = Date.now();

  const cachedRaw = sessionStorage.getItem(KEY);
  if (cachedRaw) {
    try {
      const cached = JSON.parse(cachedRaw);
      const isFresh = cached.when && now - cached.when < ttlMs;
      if (isFresh && Array.isArray(cached.list)) {
        return { fromCache: true, articles: cached.list };
      }
    } catch {}
  }
  const data = await fetchApi();
  const list = Array.isArray(data?.articles) ? data.articles : data || [];

  sessionStorage.setItem(KEY, JSON.stringify({ when: now, list }));

  return { fromCache: false, articles: list };
}

export function invalidateArticlesCache() {
  sessionStorage.removeItem("articlesCache:v1");
}

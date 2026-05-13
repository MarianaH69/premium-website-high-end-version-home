const featuredQuery = `*[_type == "article" && defined(slug.current)] | order(featured desc, publishedAt desc)[0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  body,
  category->{title, slug}
}`;

async function initFeaturedInsight() {
  const target = document.querySelector("[data-featured-insight]");
  if (!target) return;

  try {
    const article = await sanityFetch(featuredQuery);
    target.innerHTML = articleCard(article || fallbackArticles[0]);
  } catch (error) {
    target.innerHTML = articleCard(fallbackArticles[0]);
  }
}

initFeaturedInsight();

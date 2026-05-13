const articleQuery = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  body,
  category->{title, slug}
}`;

const relatedQuery = `*[_type == "article" && slug.current != $slug && defined(slug.current)] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  body,
  category->{title, slug}
}`;

function renderPortableText(blocks = []) {
  return blocks.map((block) => {
    if (block._type === "image") {
      const src = sanityImageUrl(block, 1100);
      return src ? `<figure><img src="${src}" alt="${escapeHtml(block.alt || "")}" loading="lazy"></figure>` : "";
    }

    if (block._type !== "block") return "";

    const children = (block.children || []).map((child) => escapeHtml(child.text || "")).join("");
    if (!children.trim()) return "";

    if (block.style === "h2") return `<h2>${children}</h2>`;
    if (block.style === "h3") return `<h3>${children}</h3>`;
    if (block.listItem === "bullet") return `<ul><li>${children}</li></ul>`;
    if (block.listItem === "number") return `<ol><li>${children}</li></ol>`;
    return `<p>${children}</p>`;
  }).join("").replaceAll("</ul><ul>", "").replaceAll("</ol><ol>", "");
}

function fallbackArticleBySlug(slug) {
  return fallbackArticles.find((article) => article.slug.current === slug) || fallbackArticles[0];
}

function fallbackRelated(currentSlug) {
  return fallbackArticles.filter((article) => article.slug.current !== currentSlug).slice(0, 3);
}

function renderArticle(article, related = []) {
  const shell = document.querySelector("[data-article]");
  if (!shell) return;

  const image = articleImage(article, 1400);
  const date = formatArticleDate(article.publishedAt);
  document.title = `${article.title} | Tony Heneine CPA`;

  shell.innerHTML = `
    <section class="article-hero">
      <a class="article-back" href="insights.html">Back to Insights</a>
      <div class="article-meta">
        <span>${escapeHtml(article.category?.title || "Insight")}</span>
        ${date ? `<time datetime="${escapeHtml(article.publishedAt)}">${date}</time>` : ""}
        <span>${readingTime(article)}</span>
      </div>
      <h1>${escapeHtml(article.title)}</h1>
      ${article.excerpt ? `<p>${escapeHtml(article.excerpt)}</p>` : ""}
    </section>
    <figure class="article-main-image"><img src="${image}" alt="${escapeHtml(article.mainImage?.alt || article.title)}" loading="eager"></figure>
    <section class="article-body">${renderPortableText(article.body)}</section>
    <section class="related-articles">
      <div class="section-heading">
        <p class="eyebrow">Related insights</p>
        <h2>Further reading for business owners.</h2>
      </div>
      <div class="articles-grid">${related.map(articleCard).join("")}</div>
    </section>
  `;
}

async function initArticlePage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || fallbackArticles[0].slug.current;

  try {
    const [article, related] = await Promise.all([
      sanityFetch(articleQuery, { slug }),
      sanityFetch(relatedQuery, { slug }),
    ]);

    const resolvedArticle = article || fallbackArticleBySlug(slug);
    const resolvedRelated = Array.isArray(related) && related.length ? related : fallbackRelated(resolvedArticle.slug.current);
    renderArticle(resolvedArticle, resolvedRelated);
  } catch (error) {
    const article = fallbackArticleBySlug(slug);
    renderArticle(article, fallbackRelated(article.slug.current));
  }
}

initArticlePage();

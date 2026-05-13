const articlesQuery = `*[_type == "article" && defined(slug.current)] | order(featured desc, publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  featured,
  mainImage,
  body,
  category->{title, slug}
}`;

const categoriesQuery = `*[_type == "category"] | order(title asc) {
  title,
  slug,
  description
}`;

const state = {
  articles: fallbackArticles,
  category: "all",
  search: "",
};

function normalizeContent(articles, categories) {
  const normalizedArticles = Array.isArray(articles) && articles.length ? articles : fallbackArticles;
  const categoryMap = new Map();

  (Array.isArray(categories) && categories.length ? categories : fallbackCategories).forEach((category) => {
    if (category?.slug?.current) categoryMap.set(category.slug.current, category);
  });

  normalizedArticles.forEach((article) => {
    if (article.category?.slug?.current) categoryMap.set(article.category.slug.current, article.category);
  });

  return {
    articles: normalizedArticles,
    categories: [...categoryMap.values()],
  };
}

function renderCategories(categories) {
  const categoryList = document.querySelector("[data-category-list]");
  if (!categoryList) return;

  categoryList.innerHTML = [
    `<button class="category-pill active" type="button" data-category="all">All</button>`,
    ...categories.map((category) => `
      <button class="category-pill" type="button" data-category="${escapeHtml(category.slug.current)}">${escapeHtml(category.title)}</button>
    `),
  ].join("");

  categoryList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    state.category = button.dataset.category;
    document.querySelectorAll(".category-pill").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderArticles();
  });
}

function renderArticles() {
  const grid = document.querySelector("[data-articles-grid]");
  const empty = document.querySelector("[data-empty-state]");
  if (!grid) return;

  const search = state.search.trim().toLowerCase();
  const filtered = state.articles.filter((article) => {
    const categoryMatch = state.category === "all" || article.category?.slug?.current === state.category;
    const searchBlob = `${article.title || ""} ${article.excerpt || ""} ${article.category?.title || ""}`.toLowerCase();
    return categoryMatch && (!search || searchBlob.includes(search));
  });

  grid.innerHTML = filtered.map(articleCard).join("");
  if (empty) empty.hidden = filtered.length > 0;
}

async function initInsightsArchive() {
  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.search = searchInput.value;
      renderArticles();
    });
  }

  try {
    const [articles, categories] = await Promise.all([
      sanityFetch(articlesQuery),
      sanityFetch(categoriesQuery),
    ]);
    const normalized = normalizeContent(articles, categories);
    state.articles = normalized.articles;
    renderCategories(normalized.categories);
  } catch (error) {
    const normalized = normalizeContent(fallbackArticles, fallbackCategories);
    state.articles = normalized.articles;
    renderCategories(normalized.categories);
  }

  renderArticles();
}

initInsightsArchive();

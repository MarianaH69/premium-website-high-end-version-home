const SANITY_PROJECT_ID = "xl6gm198";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-02-19";
const SANITY_QUERY_URL = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

const fallbackArticles = [
  {
    _id: "fallback-tax-planning-2026",
    title: "2026 Tax Planning Priorities for Lebanese Businesses",
    slug: { current: "2026-tax-planning-priorities-lebanese-businesses" },
    excerpt: "A practical look at the tax planning questions business owners should review before decisions become urgent.",
    publishedAt: "2026-01-12",
    readingTime: 5,
    featured: true,
    category: { title: "Tax Strategy", slug: { current: "tax-strategy" } },
    body: [
      { _type: "block", style: "normal", children: [{ text: "Effective tax planning begins before filing season. Lebanese businesses benefit from reviewing revenue expectations, expense documentation, cash flow timing, and ownership decisions early in the year." }] },
      { _type: "block", style: "h2", children: [{ text: "Priorities to review" }] },
      { _type: "block", style: "normal", children: [{ text: "Owners should align tax planning with financial reporting, compliance obligations, and investment decisions. The objective is not only to reduce exposure, but to maintain clarity and confidence around the company’s financial position." }] },
      { _type: "block", style: "normal", children: [{ text: "A CPA-led review can help identify risks, documentation gaps, and planning opportunities while preserving full compliance with applicable regulations." }] },
    ],
  },
  {
    _id: "fallback-internal-controls-family-business",
    title: "How Strong Internal Controls Protect Family Businesses",
    slug: { current: "strong-internal-controls-family-businesses" },
    excerpt: "Internal controls help family businesses protect cash, reduce risk, and create stronger accountability as operations grow.",
    publishedAt: "2026-02-03",
    readingTime: 4,
    featured: false,
    category: { title: "Risk Advisory", slug: { current: "risk-advisory" } },
    body: [
      { _type: "block", style: "normal", children: [{ text: "Family businesses often grow through trust, speed, and informal decision-making. As the company becomes more complex, clear internal controls become essential to protect that trust." }] },
      { _type: "block", style: "h2", children: [{ text: "Controls create continuity" }] },
      { _type: "block", style: "normal", children: [{ text: "Approval procedures, reporting routines, segregation of duties, and regular review of financial information can reduce errors and discourage irregularities." }] },
      { _type: "block", style: "normal", children: [{ text: "The right control environment is discreet and practical. It supports owners without slowing down the business." }] },
    ],
  },
  {
    _id: "fallback-cash-flow-visibility",
    title: "Why Cash Flow Visibility Matters for Growing Companies",
    slug: { current: "cash-flow-visibility-growing-companies" },
    excerpt: "Reliable cash flow visibility gives owners the confidence to plan, invest, negotiate, and manage risk.",
    publishedAt: "2026-03-18",
    readingTime: 4,
    featured: false,
    category: { title: "CFO Advisory", slug: { current: "cfo-advisory" } },
    body: [
      { _type: "block", style: "normal", children: [{ text: "Growth can create pressure on cash even when a business is profitable. Owners need timely visibility into collections, obligations, margins, and working capital requirements." }] },
      { _type: "block", style: "h2", children: [{ text: "Better visibility supports better decisions" }] },
      { _type: "block", style: "normal", children: [{ text: "Cash flow reporting helps companies evaluate hiring, expansion, supplier terms, financing needs, and profitability with more discipline." }] },
      { _type: "block", style: "normal", children: [{ text: "A structured advisory process turns financial data into practical decision support." }] },
    ],
  },
];

const fallbackCategories = [
  { title: "Tax Strategy", slug: { current: "tax-strategy" } },
  { title: "Risk Advisory", slug: { current: "risk-advisory" } },
  { title: "CFO Advisory", slug: { current: "cfo-advisory" } },
];

async function sanityFetch(query, params = {}) {
  const url = new URL(SANITY_QUERY_URL);
  url.searchParams.set("query", query);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Sanity request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.result;
}

function sanityImageUrl(image, width = 1200) {
  const ref = image?.asset?._ref || image?.asset?._id;
  if (!ref) return "";

  const match = ref.match(/^image-(.+)-(\d+)x(\d+)-(\w+)$/);
  if (!match) return "";

  const [, id, imageWidth, imageHeight, format] = match;
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${imageWidth}x${imageHeight}.${format}?w=${width}&auto=format`;
}

function articleImage(article, width = 900) {
  return sanityImageUrl(article.mainImage, width) || "assets/financial-reports.png";
}

function formatArticleDate(dateValue) {
  if (!dateValue) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
}

function readingTime(article) {
  if (article.readingTime) return `${article.readingTime} min read`;
  const bodyText = (article.body || [])
    .flatMap((block) => block.children || [])
    .map((child) => child.text || "")
    .join(" ");
  const words = bodyText.trim().split(/\s+/).filter(Boolean).length || 650;
  return `${Math.max(3, Math.ceil(words / 200))} min read`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function articleUrl(article) {
  return `article.html?slug=${encodeURIComponent(article.slug.current)}`;
}

function articleCard(article) {
  const image = articleImage(article, 900);
  const category = article.category?.title || "Insight";
  const date = formatArticleDate(article.publishedAt);

  return `
    <article class="article-card">
      <a href="${articleUrl(article)}" class="article-card-image"><img src="${image}" alt="${escapeHtml(article.mainImage?.alt || article.title)}" loading="lazy"></a>
      <div class="article-card-body">
        <div class="article-meta">
          <span>${escapeHtml(category)}</span>
          ${date ? `<time datetime="${escapeHtml(article.publishedAt)}">${date}</time>` : ""}
          <span>${readingTime(article)}</span>
        </div>
        <h3><a href="${articleUrl(article)}">${escapeHtml(article.title)}</a></h3>
        ${article.excerpt ? `<p>${escapeHtml(article.excerpt)}</p>` : ""}
        <a class="read-link" href="${articleUrl(article)}">Read Insight</a>
      </div>
    </article>
  `;
}

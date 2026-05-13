const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const whatsappUrl = "https://wa.me/9613242225";

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", link.getAttribute("href"));
  });
});

const floatingWhatsApp = document.createElement("a");
floatingWhatsApp.className = "floating-whatsapp";
floatingWhatsApp.href = whatsappUrl;
floatingWhatsApp.target = "_blank";
floatingWhatsApp.rel = "noopener";
floatingWhatsApp.setAttribute("aria-label", "Open WhatsApp chat with Tony Heneine CPA");
floatingWhatsApp.innerHTML = `
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <path d="M16.04 3.2c-7.03 0-12.75 5.62-12.75 12.54 0 2.21.6 4.37 1.73 6.26L3.2 28.8l7.03-1.78a12.94 12.94 0 0 0 5.81 1.37c7.03 0 12.76-5.62 12.76-12.55S23.07 3.2 16.04 3.2Zm0 22.98c-1.86 0-3.67-.49-5.25-1.41l-.38-.22-4.17 1.06 1.1-4.02-.25-.41a10.24 10.24 0 0 1-1.57-5.44c0-5.7 4.72-10.33 10.52-10.33s10.52 4.63 10.52 10.33-4.72 10.44-10.52 10.44Zm5.77-7.75c-.32-.16-1.88-.91-2.17-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.22-.18.21-.37.23-.69.08-.32-.16-1.34-.49-2.56-1.55-.95-.83-1.59-1.85-1.77-2.16-.18-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.68-.98-2.3-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.55.08-.84.39-.29.31-1.11 1.07-1.11 2.61s1.14 3.03 1.3 3.24c.16.21 2.24 3.36 5.43 4.71.76.32 1.35.51 1.81.65.76.24 1.45.2 2 .12.61-.09 1.88-.75 2.14-1.48.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37Z"/>
  </svg>
`;
document.body.appendChild(floatingWhatsApp);

function injectNewsletterSection() {
  const footer = document.querySelector(".site-footer");
  if (!footer || document.querySelector(".newsletter-section")) return;

  const section = document.createElement("section");
  section.className = "newsletter-section";
  section.innerHTML = `
    <div class="newsletter-copy">
      <p class="eyebrow">Newsletter</p>
      <h2>Stay Ahead With Strategic Financial Insights</h2>
      <p>Receive tax updates, financial insights, and business guidance directly in your inbox.</p>
    </div>
    <div class="newsletter-embed" aria-label="Newsletter subscription form">
      <iframe width="540" height="305" src="https://34ce317b.sibforms.com/serve/MUIFACarfdTkU-RuTTbZCGmIdJ4W0eRPfARKFpoPaQCFIoeuyc8pxQmyj5hCNPWta5o-0EjBu5bjC8P2qG4nchXToE8XamLZIhoSMqIAU8wm3Tvq92t3x2Yj1v_v7kuah59CAjMqP-ACUD13HZhKLBmTlAhnI8cu5WAz9M4rMOM1_Kc2dMYLYo6Dak8-aBhIZgk4jZLGMYXUC_NieQ==" frameborder="0" scrolling="auto" allowfullscreen style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;"></iframe>
    </div>
  `;

  footer.before(section);
}

injectNewsletterSection();

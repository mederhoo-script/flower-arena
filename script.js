// ============================================================
// script.js — Flower Arena Render Logic (Tailwind Version)
// ============================================================

// ── Date Helpers (offset-based) ─────────────────────────

function getDateString(offsetDays = 0) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - offsetDays);
    return d.toISOString().split("T")[0];
}

const dateToday = getDateString(0);
const dateYesterday = getDateString(1);
const dateThirdDay = getDateString(2);

// ── Carousel Arrow Buttons (Tailwind Styled) ─────────────────

function addCarouselControls(controlsId, carouselId) {
    const controls = document.getElementById(controlsId);
    const carousel = document.getElementById(carouselId);
    if (!controls || !carousel) return;

    const SCROLL_AMOUNT = 300;
    const btnClass = "bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent hover:text-espresso transition-all duration-300 shadow-md transform active:scale-90";

    const prev = document.createElement("button");
    prev.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>`;
    prev.className = btnClass;
    prev.setAttribute("aria-label", "Scroll left");
    prev.onclick = () => carousel.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });

    const next = document.createElement("button");
    next.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`;
    next.className = btnClass;
    next.setAttribute("aria-label", "Scroll right");
    next.onclick = () => carousel.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });

    controls.appendChild(prev);
    controls.appendChild(next);
}

// ── Product Card Builder (Tailwind Classes) ──────────────────

function createProductCard(product, category) {
    const card = document.createElement("div");
    // #3 Small product (w-140/w-180) and give it little boader radius (rounded-2xl)
    card.className = "product-card flex-shrink-0 w-[140px] md:w-[180px] bg-white rounded-2xl shadow-sm transition-all duration-300 group overflow-hidden cursor-pointer";

    const altText = `${category} — ${product.name}: ${product.description}`;

    // #1 remove Available: Expires: and add to cart
    card.innerHTML = `
    <div class="card-image-wrapper relative w-full h-32 md:h-44 overflow-hidden">
      <img
        src="images/${product.image}"
        alt="${altText}"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      />
      <div class="hidden flex items-center justify-center w-full h-full bg-pink-100 text-3xl">🌸</div>
    </div>
    <div class="p-3">
      <span class="inline-block px-2 py-0.5 mb-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-primary bg-cream-alt border border-orange-50 rounded-full">${category}</span>
      <h3 class="font-heading font-bold text-xs md:text-sm text-espresso truncate mb-0.5">${product.name}</h3>
      <p class="text-muted text-[10px] md:text-[11px] line-clamp-2 h-7 md:h-8 leading-tight">${product.description}</p>
    </div>
  `;

    return card;
}

// ── Renderers ──────────────────────────────────────────────

function renderCarousel(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = `<p class="text-muted italic py-10 w-full text-center text-sm">No items found.</p>`;
        return;
    }

    items.forEach(({ product, category }) => {
        container.appendChild(createProductCard(product, category));
    });
}

function renderEvents() {
    const grid = document.getElementById("events-grid");
    if (!grid) return;

    if (!events || events.length === 0) {
        grid.innerHTML = `<p class="text-muted italic py-6 text-sm">No events.</p>`;
        return;
    }

    events.forEach(event => {
        const card = document.createElement("div");
        // #5 reduce the the event card
        card.className = "bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group max-w-xs mx-auto";

        const displayDate = new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric"
        });

        const imageBlock = event.image
            ? `<img src="images/${event.image}" alt="${event.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
         <div class="hidden flex items-center justify-center w-full h-full bg-green-50 text-4xl">🌼</div>`
            : `<div class="flex items-center justify-center w-full h-full bg-green-50 text-4xl">🌼</div>`;

        card.innerHTML = `
      <div class="h-32 md:h-40 overflow-hidden bg-green-50 relative">
        ${imageBlock}
      </div>
      <div class="p-4">
        <h3 class="font-heading font-bold text-base text-espresso mb-0.5">${event.name}</h3>
        <time class="block text-primary font-bold text-[10px] uppercase tracking-wider mb-1">${displayDate}</time>
        <p class="text-muted text-[11px] leading-snug line-clamp-2">${event.description}</p>
      </div>
    `;
        grid.appendChild(card);
    });
}

// ── Mobile Nav Toggle ──────────────────────────────────────

function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');

    if (!toggle || !menu) return;

    toggle.onclick = () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
        iconMenu.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
    };

    menu.querySelectorAll('a').forEach(link => {
        link.onclick = () => {
            if (window.innerWidth < 768) {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
                iconMenu.classList.remove('hidden');
                iconClose.classList.add('hidden');
            }
        };
    });
}

// ── Initialization ──────────────────────────────────────────

function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.onscroll = () => {
        if (window.scrollY > 400) btn.classList.add('visible');
        else btn.classList.remove('visible');
    };

    btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
}

function init() {
    const buckets = {
        today: [],
        yesterday: [],
        thirdDay: [],
        all: []
    };

    for (const [category, items] of Object.entries(products)) {
        items.forEach(product => {
            const entry = { product, category };
            buckets.all.push(entry);
            if (product.New === dateToday) buckets.today.push(entry);
            else if (product.New === dateYesterday) buckets.yesterday.push(entry);
            else if (product.New === dateThirdDay) buckets.thirdDay.push(entry);
        });
    }

    renderCarousel("today-carousel", buckets.today);
    renderCarousel("yesterday-carousel", buckets.yesterday);
    renderCarousel("third-day-carousel", buckets.thirdDay);
    renderCarousel("bottom-carousel", buckets.all);

    addCarouselControls("today-controls", "today-carousel");
    addCarouselControls("yesterday-controls", "yesterday-carousel");
    addCarouselControls("third-day-controls", "third-day-carousel");
    addCarouselControls("bottom-controls", "bottom-carousel");

    renderEvents();
    initMobileNav();
    initBackToTop();

    // Add entrance animation to sections
    document.querySelectorAll('.carousel-section, .bottom-carousel-section, .events-section').forEach(s => {
        s.classList.add('section-animate');
    });
}

document.addEventListener("DOMContentLoaded", init);

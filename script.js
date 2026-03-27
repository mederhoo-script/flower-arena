// ============================================================
// script.js — Flower Arena Render Logic
// ============================================================

// ── Date Helpers ──────────────────────────────────────────

function getDateString(offsetDays = 0) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - offsetDays);
    return d.toISOString().split("T")[0];
}

const dateToday = getDateString(0);
const dateYesterday = getDateString(1);
const dateThirdDay = getDateString(2);

// ── #1 Product Details Modal Logic ─────────────────────────

function initModal() {
    const modal = document.getElementById('product-modal');
    const closeBtns = document.querySelectorAll('.modal-close');
    if (!modal) return;

    closeBtns.forEach(btn => {
        btn.onclick = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.classList.add('hidden'), 300);
        };
    });
}

function showProductDetails(product, category) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');
    const img = document.getElementById('modal-image');
    const cat = document.getElementById('modal-category');

    const waLink = document.getElementById('modal-whatsapp');
    const waText = document.getElementById('modal-whatsapp-text');
    const phLink = document.getElementById('modal-phone');
    const emLink = document.getElementById('modal-email');

    if (!modal) return;

    // Set static content
    title.innerText = product.name;
    desc.innerText = product.description;
    img.src = `images/${product.image}`;
    cat.innerText = category;

    // Apply Config from config.js
    if (typeof shopConfig !== 'undefined') {
        const { whatsapp, phone, email, modal: modalCfg } = shopConfig;

        // WhatsApp
        const msg = encodeURIComponent(`Hello! I'm interested in the ${product.name} (${category}) I saw on your website.`);
        waLink.href = `https://wa.me/${whatsapp.number}?text=${msg}`;
        waText.innerText = modalCfg.whatsappBtnText || "Order via WhatsApp";

        // Secondary buttons
        phLink.href = `tel:${phone.replace(/\D/g, '')}`;
        emLink.href = `mailto:${email}?subject=Inquiry: ${product.name}`;

        // Hide if disabled
        document.getElementById('modal-secondary-buttons').style.display =
            (modalCfg.showEmailBtn || modalCfg.showPhoneBtn) ? 'grid' : 'none';
        phLink.style.display = modalCfg.showPhoneBtn ? 'flex' : 'none';
        emLink.style.display = modalCfg.showEmailBtn ? 'flex' : 'none';
    }

    modal.classList.remove('hidden');
    modal.offsetHeight;
    modal.classList.add('active');
}

// ── Product Card Builder ─────────────────────────────────────

function createProductCard(product, category, isGrid = false) {
    const card = document.createElement("div");
    const widthClass = isGrid ? "w-full" : "w-[160px] md:w-[200px] flex-shrink-0";
    card.className = `product-card ${widthClass} bg-white rounded-2xl shadow-sm transition-all duration-300 group overflow-hidden cursor-pointer snap-start`;

    const altText = `${category} — ${product.name}: ${product.description}`;

    card.innerHTML = `
    <div class="card-image-wrapper relative w-full h-36 md:h-48 overflow-hidden">
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
      <h3 class="font-heading font-bold text-sm text-espresso truncate mb-0.5">${product.name}</h3>
      <p class="text-muted text-[10px] md:text-[11px] line-clamp-2 h-7 md:h-8 leading-tight italic">${product.description}</p>
    </div>
  `;

    card.onclick = () => showProductDetails(product, category);
    return card;
}

// ── Renderers ──────────────────────────────────────────────

function renderGrid(containerId, items, emptyMessage) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    if (items.length === 0) {
        const waNum = (typeof shopConfig !== 'undefined') ? shopConfig.whatsapp.number : "234";
        container.innerHTML = `
          <div class="col-span-full py-10 text-center">
            <p class="text-muted italic mb-4 font-heading text-lg">${emptyMessage}</p>
            <a href="https://wa.me/${waNum}" target="_blank" 
               class="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-transform">
               <span>Contact on WhatsApp</span>
            </a>
          </div>
        `;
        return;
    }

    items.forEach(({ product, category }) => {
        container.appendChild(createProductCard(product, category, true));
    });
}

function renderCarousel(containerId, items, emptyMessage, autoScroll = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = `<div class="w-full py-10 text-center"><p class="text-muted italic">${emptyMessage}</p></div>`;
        return;
    }

    const wrap = document.createElement("div");
    wrap.className = autoScroll ? "flex gap-4 auto-scroll" : "flex gap-4";

    items.forEach(({ product, category }) => {
        wrap.appendChild(createProductCard(product, category, false));
    });

    if (autoScroll && items.length > 3) {
        items.forEach(({ product, category }) => {
            wrap.appendChild(createProductCard(product, category, false));
        });
    }

    container.appendChild(wrap);
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
        card.className = "bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group w-full";
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
}

function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;
    window.onscroll = () => {
        if (window.scrollY > 400) btn.classList.add('visible');
        else btn.classList.remove('visible');
    };
    btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
}

function initFooter() {
    if (typeof shopConfig !== 'undefined') {
        const ph = document.getElementById('footer-phone');
        const em = document.getElementById('footer-email');
        if (ph) ph.innerText = "📞 " + shopConfig.phone;
        if (em) em.innerText = "✉️ " + shopConfig.email;
    }
}

function init() {
    const buckets = { today: [], yesterday: [], thirdDay: [], all: [] };

    for (const [category, items] of Object.entries(products)) {
        items.forEach(product => {
            const entry = { product, category };
            buckets.all.push(entry);
            if (product.New === dateToday) buckets.today.push(entry);
            else if (product.New === dateYesterday) buckets.yesterday.push(entry);
            else if (product.New === dateThirdDay) buckets.thirdDay.push(entry);
        });
    }

    renderGrid("today-grid", buckets.today, "Today's products will be out soon, please contact us here.");
    renderGrid("yesterday-grid", buckets.yesterday, "Looking for something special from yesterday? Contact us.");
    renderGrid("third-day-grid", buckets.thirdDay, "Browse our collection via WhatsApp for older products.");
    renderCarousel("bottom-carousel", buckets.all, "Our catalog is being updated.", true);

    renderEvents();
    initMobileNav();
    initBackToTop();
    initModal();
    initFooter();
}

document.addEventListener("DOMContentLoaded", init);

/* =========================================================
   Stackly — Subscription Box Store
   Main JS: nav, cart, filters, carousel, faq, forms
========================================================= */
(function () {
  "use strict";

  /* ---------------- Data ---------------- */
  const BOXES = [
    { id: "coffee-origins", name: "Origins Coffee Box", cat: "Coffee", emoji: "☕", img: "img/boxes/coffee-origins.webp", price: 24, badge: "Bestseller", rating: 4.9, reviews: 312, desc: "Small-batch roasts from a new origin every month, plus tasting notes." },
    { id: "glow-beauty", name: "Glow Beauty Edit", cat: "Beauty", emoji: "💄", img: "img/boxes/glow-beauty.webp", price: 32, badge: "New", rating: 4.8, reviews: 204, desc: "Clean, cruelty-free skincare and makeup picks curated by dermatologists." },
    { id: "snack-world", name: "Snack World Tour", cat: "Snacks", emoji: "🍫", img: "img/boxes/snack-world.webp", price: 19, badge: "Popular", rating: 4.7, reviews: 540, desc: "A new country's sweet & savory snacks land on your doorstep monthly." },
    { id: "novel-nook", name: "Novel Nook", cat: "Books", emoji: "📚", img: "img/boxes/novel-nook.webp", price: 28, badge: "Editor's Pick", rating: 4.9, reviews: 178, desc: "A hand-picked new release plus bookish treats and a signed bookplate." },
    { id: "fit-fuel", name: "Fit Fuel Box", cat: "Fitness", emoji: "🏋️", img: "img/boxes/fit-fuel.webp", price: 35, badge: "Trending", rating: 4.6, reviews: 260, desc: "Supplements, snacks and gear samples picked for your training goals." },
    { id: "paws-treats", name: "Paws & Treats", cat: "Pets", emoji: "🐾", img: "img/boxes/paws-treats.webp", price: 22, badge: "New", rating: 4.9, reviews: 421, desc: "Toys and natural treats sized for your pup, delivered every month." },
    { id: "green-thumb", name: "Green Thumb Grow", cat: "Home", emoji: "🌿", img: "img/boxes/green-thumb.webp", price: 26, badge: "Seasonal", rating: 4.7, reviews: 132, desc: "Rare houseplant cuttings and care tools for the plant-obsessed." },
    { id: "candle-co", name: "Candle Co. Crate", cat: "Home", emoji: "🕯️", img: "img/boxes/candle-co.webp", price: 21, badge: "Popular", rating: 4.8, reviews: 289, desc: "Hand-poured soy candles in a new scent story every month." },
    { id: "kids-explore", name: "Little Explorers", cat: "Kids", emoji: "🧸", img: "img/boxes/kids-explore.webp", price: 30, badge: "Bestseller", rating: 4.9, reviews: 366, desc: "STEM activities and story-led play sets for curious kids 4-9." },
    { id: "tea-ceremony", name: "Ceremony Tea Chest", cat: "Tea", emoji: "🍵", img: "img/boxes/tea-ceremony.webp", price: 23, badge: "New", rating: 4.8, reviews: 96, desc: "Loose-leaf teas and ceremony tools from small growers, steeped in story." },
    { id: "home-bakery", name: "Home Bakery Box", cat: "Baking", emoji: "🥐", img: "img/boxes/home-bakery.webp", price: 27, badge: "Popular", rating: 4.8, reviews: 214, desc: "Pre-measured artisan bread and pastry kits — just add butter and time." },
    { id: "zen-yoga", name: "Zen Yoga Box", cat: "Fitness", emoji: "🧘", img: "img/boxes/zen-yoga.webp", price: 25, badge: "Seasonal", rating: 4.7, reviews: 141, desc: "Mat accessories, calming teas and guided flows for a softer practice." },
    { id: "craft-create", name: "Craft & Create Box", cat: "Kids", emoji: "🎨", img: "img/boxes/craft-create.webp", price: 24, badge: "Trending", rating: 4.8, reviews: 187, desc: "Guided art projects and premium supplies for kids who love to make things." },
    { id: "grooming-kit", name: "Gentleman's Grooming Kit", cat: "Grooming", emoji: "🪒", img: "img/boxes/grooming-kit.webp", price: 29, badge: "New", rating: 4.7, reviews: 118, desc: "Barber-grade shaving and skincare essentials, restocked every month." },
    { id: "grazing-board", name: "Grazing & Cheese Board", cat: "Snacks", emoji: "🧀", img: "img/boxes/grazing-board.webp", price: 34, badge: "Editor's Pick", rating: 4.9, reviews: 152, desc: "Artisan cheeses, crackers and preserves for an easy weekend spread." },
    { id: "wellness-vitals", name: "Wellness Vitals Box", cat: "Wellness", emoji: "🌸", img: "img/boxes/wellness-vitals.webp", price: 31, badge: "Trending", rating: 4.7, reviews: 173, desc: "Supplements, herbal remedies and mindfulness tools picked by nutritionists." },
    { id: "planner-stationery", name: "Planner & Stationery Box", cat: "Stationery", emoji: "🖊️", img: "img/boxes/planner-stationery.webp", price: 20, badge: "New", rating: 4.8, reviews: 89, desc: "Notebooks, washi tape and fine pens for people who love a good planning ritual." },
    { id: "travel-toiletries", name: "Travel Essentials Kit", cat: "Travel", emoji: "🧳", img: "img/boxes/travel-toiletries.webp", price: 26, badge: "Seasonal", rating: 4.6, reviews: 104, desc: "TSA-friendly toiletries and grooming minis restocked before every trip." },
    { id: "mocktail-mixology", name: "Mocktail Mixology Box", cat: "Drinks", emoji: "🍹", img: "img/boxes/mocktail-mixology.webp", price: 29, badge: "Popular", rating: 4.8, reviews: 137, desc: "Craft syrups, garnishes and recipe cards for alcohol-free evenings done right." },
    { id: "coldbrew-coffee", name: "Cold Brew Coffee Box", cat: "Coffee", emoji: "🧊", img: "img/boxes/coldbrew-coffee.webp", price: 22, badge: "Seasonal", rating: 4.7, reviews: 145, desc: "Slow-steeped concentrates and cold brew gear for a smoother, less acidic cup." },
    { id: "skincare-ritual", name: "Skincare Ritual Box", cat: "Beauty", emoji: "🧴", img: "img/boxes/skincare-ritual.webp", price: 30, badge: "Trending", rating: 4.8, reviews: 198, desc: "A focused four-step routine of serums and moisturizers picked for your skin type." },
    { id: "mystery-book-club", name: "Mystery Book Club Box", cat: "Books", emoji: "🔍", img: "img/boxes/mystery-book-club.webp", price: 26, badge: "New", rating: 4.7, reviews: 92, desc: "A hand-picked thriller or whodunit each month, plus discussion notes for your book club." },
    { id: "cat-comfort", name: "Cat Comfort Box", cat: "Pets", emoji: "🐱", img: "img/boxes/cat-comfort.webp", price: 21, badge: "Popular", rating: 4.8, reviews: 233, desc: "Toys, treats and cozy accessories sized for cats, delivered every month." },
    { id: "sourdough-starter", name: "Sourdough Starter Box", cat: "Baking", emoji: "🍞", img: "img/boxes/sourdough-starter.webp", price: 24, badge: "Seasonal", rating: 4.6, reviews: 108, desc: "A live starter, stone-milled flour and a proofing schedule for weekend bakers." },
    { id: "beard-care", name: "Beard Care Box", cat: "Grooming", emoji: "🧔", img: "img/boxes/beard-care.webp", price: 26, badge: "Popular", rating: 4.7, reviews: 121, desc: "Oils, balms and a boar-bristle brush restocked monthly for a well-kept beard." },
    { id: "sparkling-soda", name: "Sparkling Soda Box", cat: "Drinks", emoji: "🥤", img: "img/boxes/sparkling-soda.webp", price: 20, badge: "New", rating: 4.6, reviews: 74, desc: "Small-batch sodas and shrubs in flavors you won't find on a supermarket shelf." },
    { id: "matcha-ritual", name: "Matcha Ritual Box", cat: "Tea", emoji: "🍵", img: "img/boxes/matcha-ritual.webp", price: 25, badge: "Trending", rating: 4.8, reviews: 116, desc: "Ceremonial-grade matcha, a bamboo whisk and a proper bowl for the full ritual." },
    { id: "calligraphy-ink", name: "Calligraphy & Ink Box", cat: "Stationery", emoji: "🖋️", img: "img/boxes/calligraphy-ink.webp", price: 23, badge: "New", rating: 4.7, reviews: 68, desc: "Dip pens, ink and guided practice sheets for learning modern calligraphy." },
    { id: "travel-accessories", name: "Passport Ready Box", cat: "Travel", emoji: "🧳", img: "img/boxes/travel-accessories.webp", price: 28, badge: "Seasonal", rating: 4.6, reviews: 87, desc: "Packing cubes, adapters and travel-size essentials curated before every trip." },
    { id: "mindfulness-meditation", name: "Mindfulness & Meditation Box", cat: "Wellness", emoji: "🧘‍♀️", img: "img/boxes/mindfulness-meditation.webp", price: 24, badge: "Trending", rating: 4.8, reviews: 129, desc: "Guided journals, calming teas and tools for a five-minute daily reset." },
  ];

  const TESTIMONIALS = [
    { quote: "The Origins Coffee Box turned my Sunday mornings into a whole ritual. I actually look forward to the mail now.", name: "Priya Nair", role: "Subscriber since 2023", initials: "PN" },
    { quote: "Cancelled every other subscription box I've tried — this is the only one that never feels like filler.", name: "Marcus Webb", role: "Snack World Tour", initials: "MW" },
    { quote: "Customer support swapped my box in minutes when a scent didn't suit me. That kind of care is rare.", name: "Elena Souza", role: "Candle Co. Crate", initials: "ES" },
    { quote: "My dog genuinely gets excited when the Paws & Treats box shows up. Worth every rupee.", name: "Arjun Mehta", role: "Paws & Treats", initials: "AM" },
    { quote: "The Wellness Vitals Box replaced three separate subscriptions I was juggling. One box, way less clutter.", name: "Kavya Iyer", role: "Wellness Vitals Box", initials: "KI" },
    { quote: "I gifted the Planner & Stationery Box to my sister and now she asks about it before every holiday.", name: "Rohan Shah", role: "Planner & Stationery Box", initials: "RS" },
    { quote: "Ceremony Tea Chest is the first tea subscription that didn't feel like a gimmick — genuinely great sourcing.", name: "Meera Pillai", role: "Ceremony Tea Chest", initials: "MP" },
    { quote: "The Home Bakery Box turned my very average Saturday baking into something I actually plan my week around.", name: "Daniel Fonseca", role: "Home Bakery Box", initials: "DF" },
  ];

  const FAQS = [
    { q: "Can I pause or cancel anytime?", a: "Yes — pause, skip a month, or cancel from your account dashboard with no fees, anytime before your next billing date." },
    { q: "How does shipping work?", a: "Boxes ship on the 5th of every month and typically arrive within 3–6 business days. Tracking is emailed automatically." },
    { q: "Can I gift a subscription?", a: "Absolutely. Choose any plan at checkout and select 'This is a gift' to schedule delivery and add a personal note." },
    { q: "What if I don't like an item?", a: "Reach out within 14 days of delivery and we'll credit or swap it — no questions asked." },
    { q: "Do you ship internationally?", a: "We currently ship across India with flat-rate shipping, and to select international regions at checkout." },
    { q: "Can I mix and match items across boxes?", a: "Each plan ships as its curated box, but you can subscribe to multiple boxes and manage them together from one account." },
    { q: "How do I change my delivery address?", a: "Update your address anytime from your account dashboard — it applies automatically from your next unshipped order." },
    { q: "Is there a free trial?", a: "We don't offer a free trial, but every first box is backed by our 14-day swap-or-credit guarantee, so there's no real risk in trying one." },
    { q: "What payment methods do you accept?", a: "Cards, UPI and net banking are all supported at checkout, with recurring billing handled securely by our payment partner." },
  ];

  const BLOG_POSTS = [
    { id: "unboxing-ritual", featured: true, tag: "Lifestyle", title: "How to Turn Unboxing Into a Weekly Ritual", img: "img/blog/unboxing-ritual.webp", date: "Aug 14, 2026", excerpt: "Five small habits — from lighting a candle to setting your phone aside — that make the five minutes after your box arrives feel like a reset.", body: "The best part of a subscription box isn't always what's inside — it's the five minutes right after it arrives, before you've opened a single item. Subscribers who make that moment intentional report enjoying their boxes far more than those who tear into them between meetings. Try setting your phone aside, making a cup of something warm, and opening slowly. Read the note card first. Lay everything out before you touch it. It sounds small, but it's the difference between a delivery and a ritual." },
    { id: "gift-guide", tag: "Gifting", title: "The Stackly Gift Guide: A Box for Every Person on Your List", img: "img/blog/gift-guide.webp", date: "Aug 2, 2026", excerpt: "Not sure which box suits which person? Here's our category-by-category cheat sheet for gifting subscriptions that actually get used.", body: "Gifting a subscription is one of the few gifts that keeps giving without you having to remember a second occasion. The trick is matching the box to the person, not the trend. For the friend who always has a candle lit, try Candle Co. Crate. For the sibling glued to their planner, Planner & Stationery Box. For parents who love their garden more than their phone, Green Thumb Grow. When in doubt, our Discovery Box lets the recipient find their own favorite before you commit to a full year." },
    { id: "coffee-brewing", tag: "Coffee", title: "Three Brewing Mistakes Ruining Your Morning Cup", img: "img/blog/coffee-brewing.webp", date: "Jul 20, 2026", excerpt: "Water temperature, grind size and bean freshness — the three variables most home brewers get wrong, explained simply.", body: "Most home coffee disappointments trace back to three fixable things. First, water that's too hot scorches the grounds and pulls out bitterness — aim for just off the boil, around 92-96°C. Second, grind size should match your brew method; a grind that's too fine for your filter over-extracts, while too coarse under-extracts. Third, and most overlooked: beans lose their best flavor within a few weeks of roasting, which is exactly why Origins Coffee Box ships small-batch roasts monthly instead of sitting on shelf stock." },
    { id: "sustainable-packaging", tag: "Sustainability", title: "What 'Carbon-Neutral Shipping' Actually Means for Your Box", img: "img/blog/sustainable-packaging.webp", date: "Jul 5, 2026", excerpt: "A behind-the-scenes look at the recyclable packaging and offset program behind every Stackly delivery.", body: "Every Stackly box ships in packaging that's fully recyclable or compostable — no mixed-material padding that ends up in landfill. Beyond the box itself, we calculate the emissions from every shipment and fund verified carbon-offset projects to balance them out. It's not a perfect system, and we're transparent about that, but it means the joy of opening a box doesn't come at a hidden environmental cost. We publish our sourcing and packaging partners on our About page for anyone who wants the details." },
    { id: "self-care-routine", tag: "Beauty", title: "Building a Skincare Routine That Actually Fits Your Life", img: "img/blog/self-care-routine.webp", date: "Jun 18, 2026", excerpt: "You don't need twelve steps. Our dermatologist-curated Glow Beauty Edit picks are built around a realistic four-step routine.", body: "The skincare industry loves to sell routines with ten or more steps, but dermatologists will tell you most people only need four: cleanse, treat, moisturize, protect. Everything in the Glow Beauty Edit is chosen to slot into one of those four steps, so instead of ending up with a shelf of half-used bottles, you build a routine you'll actually stick with. Start simple, add one active ingredient at a time, and give any new product two to three weeks before judging results." },
    { id: "reading-nook", tag: "Books", title: "Five Reads From Novel Nook Members Are Still Talking About", img: "img/blog/reading-nook.webp", date: "Jun 1, 2026", excerpt: "A round-up of the Novel Nook picks with the highest reader ratings this year, and why each one struck a chord.", body: "Every month our Novel Nook curators pick one new release, and every so often a pick sticks with readers long after they've finished it. This year's standouts span a debut literary thriller, a quiet multigenerational family drama, and a genre-bending fantasy that most members said they finished in a single weekend. What ties them together isn't genre — it's a strong opening chapter and an ending that earns the build-up. If you're catching up, all five are still available as add-ons with any current subscription." },
    { id: "pet-day", tag: "Pets", title: "5 Ways to Make Your Pet's Box Day Extra Special", img: "img/blog/pet-day.webp", date: "May 14, 2026", excerpt: "Small rituals — from a countdown calendar to a proper photo op — that turn a delivery into your pet's favorite day of the month.", body: "Paws & Treats and Cat Comfort subscribers tell us the same thing: their pets have learned to recognize the delivery truck. A few small rituals make box day even better. Keep a countdown calendar by the door so the whole household is in on it. Let your pet sniff the sealed box before opening — most of the anticipation is in the scent. Introduce one item at a time instead of dumping the whole box out, so nothing gets ignored in the excitement. And take the photo before the wrapping paper gets destroyed, because it never lasts long." },
  ];

  /* ---------------- Helpers ---------------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

  /* ---------------- Sticky header + mobile nav ---------------- */
  const header = $(".site-header");
  const navToggle = $(".nav-toggle");
  const navLinks = $(".nav-links");

  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
    const btt = $(".back-to-top");
    if (btt) btt.classList.toggle("show", window.scrollY > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    $$(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
      })
    );
  }

  /* ---------------- nd-nav hamburger (mobile) ---------------- */
  const ndNav = $(".nd-nav");
  const ndHamburger = $(".nd-hamburger");
  if (ndNav && ndHamburger) {
    const closeNdNav = () => {
      ndNav.classList.remove("nd-nav-open");
      ndHamburger.classList.remove("active");
      ndHamburger.setAttribute("aria-expanded", "false");
    };
    ndHamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = ndNav.classList.toggle("nd-nav-open");
      ndHamburger.classList.toggle("active", open);
      ndHamburger.setAttribute("aria-expanded", String(open));
    });
    $$(".nd-nav-links a", ndNav).forEach((a) => a.addEventListener("click", closeNdNav));
    document.addEventListener("click", (e) => {
      if (ndNav.classList.contains("nd-nav-open") && !ndNav.contains(e.target)) closeNdNav();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 780) closeNdNav();
    });
  }

  const backToTop = $(".back-to-top");
  if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = $$(".reveal");
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------------- Cart (localStorage) ---------------- */
  const CART_KEY = "stackly_cart";
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCartCount();
    renderCartDrawer();
  }
  function addToCart(id) {
    const box = BOXES.find((b) => b.id === id);
    if (!box) return;
    const cart = getCart();
    const line = cart.find((l) => l.id === id);
    if (line) line.qty += 1;
    else cart.push({ id, qty: 1 });
    saveCart(cart);
    showToast(`${box.name} added to your box`);
  }
  function updateQty(id, delta) {
    const cart = getCart();
    const line = cart.find((l) => l.id === id);
    if (!line) return;
    line.qty += delta;
    const next = cart.filter((l) => l.qty > 0);
    saveCart(next);
  }
  function removeLine(id) {
    saveCart(getCart().filter((l) => l.id !== id));
  }
  function cartCountTotal() {
    return getCart().reduce((sum, l) => sum + l.qty, 0);
  }
  function renderCartCount() {
    $$(".cart-count").forEach((el) => (el.textContent = cartCountTotal()));
  }
  function renderCartDrawer() {
    const wrap = $("#cartItems");
    if (!wrap) return;
    const cart = getCart();
    if (!cart.length) {
      wrap.innerHTML = `<div class="cart-empty">🎁<br>Your box is empty.<br>Add a subscription to get started.</div>`;
    } else {
      wrap.innerHTML = cart
        .map((l) => {
          const b = BOXES.find((x) => x.id === l.id);
          if (!b) return "";
          return `
          <div class="cart-line" data-id="${b.id}">
            <div class="thumb"><img src="${b.img}" alt="${b.name}" loading="lazy"></div>
            <div class="info">
              <strong>${b.name}</strong>
              <span>${fmt(b.price)} / mo</span>
              <div class="qty">
                <button class="qty-dec" aria-label="Decrease">−</button>
                <span>${l.qty}</span>
                <button class="qty-inc" aria-label="Increase">+</button>
              </div>
            </div>
            <button class="cart-remove">Remove</button>
          </div>`;
        })
        .join("");
    }
    const total = cart.reduce((sum, l) => {
      const b = BOXES.find((x) => x.id === l.id);
      return sum + (b ? b.price * l.qty : 0);
    }, 0);
    const totalEl = $("#cartTotal");
    if (totalEl) totalEl.textContent = fmt(total) + " / mo";

    $$(".qty-inc", wrap).forEach((btn) =>
      btn.addEventListener("click", () => updateQty(btn.closest(".cart-line").dataset.id, 1))
    );
    $$(".qty-dec", wrap).forEach((btn) =>
      btn.addEventListener("click", () => updateQty(btn.closest(".cart-line").dataset.id, -1))
    );
    $$(".cart-remove", wrap).forEach((btn) =>
      btn.addEventListener("click", () => removeLine(btn.closest(".cart-line").dataset.id))
    );
  }

  const cartDrawer = $("#cartDrawer");
  const overlay = $("#overlay");
  function openCart() {
    if (!cartDrawer) return;
    renderCartDrawer();
    cartDrawer.classList.add("show");
    overlay.classList.add("show");
  }
  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove("show");
    overlay.classList.remove("show");
  }
  $$("[data-cart-open]").forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); openCart(); }));
  const cartClose = $("#cartClose");
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (overlay) overlay.addEventListener("click", closeCart);

  const checkoutBtn = $("#checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!cartCountTotal()) { showToast("Add a box before checking out"); return; }
      showToast("This is a demo store — checkout isn't connected yet 🎉");
    });
  }

  renderCartCount();
  renderCartDrawer();

  /* ---------------- Toast ---------------- */
  function showToast(msg) {
    let stack = $(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `<span>🎉</span><span>${msg}</span>`;
    stack.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 3200);
  }

  /* ---------------- Box grid rendering + filters ---------------- */
  function starString(rating) {
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  function renderBoxCard(b) {
    return `
    <div class="box-card reveal is-visible" data-cat="${b.cat}">
      <div class="box-thumb">
        <img src="${b.img}" alt="${b.name}" loading="lazy" width="640" height="400">
        <span class="badge">${b.badge}</span>
        <button class="fav" data-fav="${b.id}" aria-label="Save to favorites">♥</button>
        <span class="box-thumb-emoji">${b.emoji}</span>
      </div>
      <div class="box-body">
        <span class="box-cat">${b.cat}</span>
        <h3>${b.name}</h3>
        <p class="box-desc">${b.desc}</p>
        <div class="box-rating">${starString(b.rating)} <span>${b.rating} (${b.reviews})</span></div>
        <div class="box-footer">
          <div class="box-price">${fmt(b.price)}<small>/ month</small></div>
          <button class="add-btn" data-add="${b.id}" aria-label="Add to box">+</button>
        </div>
      </div>
    </div>`;
  }

  function initBoxGrid(gridSel, opts) {
    const grid = $(gridSel);
    if (!grid) return;
    opts = opts || {};
    const limit = opts.limit || null;
    let list = BOXES.slice();
    if (limit) list = list.slice(0, limit);

    function paint(filter) {
      const data = filter && filter !== "All" ? list.filter((b) => b.cat === filter) : list;
      grid.innerHTML = data.map(renderBoxCard).join("") || `<p class="text-muted">No boxes match that filter yet.</p>`;
      bindGridEvents();
    }

    function bindGridEvents() {
      $$("[data-add]", grid).forEach((btn) =>
        btn.addEventListener("click", () => addToCart(btn.dataset.add))
      );
      $$("[data-fav]", grid).forEach((btn) =>
        btn.addEventListener("click", () => {
          btn.classList.toggle("active");
          btn.textContent = btn.classList.contains("active") ? "❤" : "♥";
        })
      );
    }

    const tabs = opts.tabsSel ? $$(opts.tabsSel + " .pill-tab") : [];
    tabs.forEach((tab) =>
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        paint(tab.dataset.filter);
      })
    );

    paint("All");
  }

  initBoxGrid("#boxGrid", { limit: 6 });
  initBoxGrid("#allBoxGrid", { tabsSel: "#boxTabs" });

  /* ---------------- Hero background video swiper ---------------- */
  const hsBg = $("#hsBg");
  if (hsBg && window.Swiper) {
    function syncBgVideo(swiper) {
      $$(".hs-bg", hsBg).forEach((v, i) => {
        if (i === swiper.activeIndex) {
          v.currentTime = 0;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }
    const bgSwiper = new Swiper(hsBg, {
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 1200,
      loop: true,
      allowTouchMove: false,
      autoplay: { delay: 7000, disableOnInteraction: false },
      on: { init: syncBgVideo, slideChangeTransitionStart: syncBgVideo },
    });
  }

  /* ---------------- Hero swipers ---------------- */
  const hsFeature = $("#hsFeature");
  if (hsFeature && window.Swiper) {
    const featureIds = ["coffee-origins", "wellness-vitals", "home-bakery", "grazing-board"];
    const featureBoxes = featureIds.map((id) => BOXES.find((b) => b.id === id)).filter(Boolean);
    $("#hsFeatureSlides", hsFeature).innerHTML = featureBoxes
      .map(
        (b) => `
      <a href="boxes.html" class="swiper-slide hs-feature-card">
        <div class="hs-feature-img">
          <img src="${b.img}" alt="${b.name}" width="640" height="400">
          <span class="hs-play" aria-hidden="true">▶</span>
        </div>
        <div class="hs-feature-body">
          <div>
            <strong>${b.name}</strong>
            <span>📦 Ships monthly · ⭐ ${b.rating} (${b.reviews})</span>
          </div>
          <span class="hs-feature-arrow">View Box →</span>
        </div>
      </a>`
      )
      .join("");

    new Swiper(hsFeature, {
      loop: true,
      speed: 500,
      autoplay: { delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }

  const hsStrip = $("#hsStrip");
  if (hsStrip && window.Swiper) {
    const stripIds = ["glow-beauty", "snack-world", "fit-fuel", "kids-explore", "tea-ceremony", "planner-stationery"];
    const stripBoxes = stripIds.map((id) => BOXES.find((b) => b.id === id)).filter(Boolean);
    $("#hsStripSlides", hsStrip).innerHTML = stripBoxes
      .map(
        (b) => `
      <a href="boxes.html" class="swiper-slide hs-card">
        <img src="${b.img}" alt="${b.name}" width="640" height="400">
        <span class="hs-card-tag">${b.cat}</span>
        <span class="hs-card-fav">♥</span>
        <span class="hs-card-name">${b.name}</span>
      </a>`
      )
      .join("");

    new Swiper(hsStrip, {
      loop: true,
      speed: 500,
      spaceBetween: 18,
      slidesPerView: 1.35,
      autoplay: { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true },
      navigation: { nextEl: ".hs-strip-next", prevEl: ".hs-strip-prev" },
      breakpoints: {
        560: { slidesPerView: 2.2 },
        780: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      },
    });
  }

  /* ---------------- Testimonials carousel (Swiper) ---------------- */
  const testiWrap = $("#testimonials");
  if (testiWrap && window.Swiper) {
    const slidesWrap = $("#testiSlides", testiWrap);
    slidesWrap.innerHTML = TESTIMONIALS.map(
      (t) => `
      <div class="swiper-slide">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-quote">“${t.quote}”</p>
        <div class="testi-person">
          <div class="testi-avatar">${t.initials}</div>
          <div style="text-align:left">
            <strong style="display:block">${t.name}</strong>
            <span class="text-muted" style="font-size:.82rem">${t.role}</span>
          </div>
        </div>
      </div>`
    ).join("");

    new Swiper(testiWrap, {
      loop: true,
      speed: 500,
      effect: "fade",
      fadeEffect: { crossFade: true },
      autoHeight: true,
      autoplay: { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
  }

  /* ---------------- Blog featured post ---------------- */
  const blogFeatured = $("#blogFeatured");
  if (blogFeatured) {
    const featured = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
    if (featured) {
      blogFeatured.innerHTML = `
        <div class="blog-featured-img">
          <img src="${featured.img}" alt="${featured.title}" width="800" height="500">
        </div>
        <div class="blog-featured-body">
          <span class="blog-featured-badge">✨ Latest story</span>
          <span class="blog-tag">${featured.tag}</span>
          <h2>${featured.title}</h2>
          <span class="blog-date text-muted">${featured.date}</span>
          <p class="blog-excerpt">${featured.excerpt}</p>
          <p class="blog-full">${featured.body}</p>
          <button class="btn btn-primary blog-toggle">Read full story</button>
        </div>`;
      $(".blog-toggle", blogFeatured).addEventListener("click", (e) => {
        const open = blogFeatured.classList.toggle("open");
        e.currentTarget.textContent = open ? "Show less" : "Read full story";
      });
    }
  }

  /* ---------------- Blog grid ---------------- */
  const blogGrid = $("#blogGrid");
  if (blogGrid) {
    const gridPosts = BLOG_POSTS.filter((p) => !p.featured);
    blogGrid.innerHTML = gridPosts.map(
      (p) => `
      <article class="blog-card reveal is-visible">
        <div class="blog-thumb"><img src="${p.img}" alt="${p.title}" loading="lazy" width="800" height="500"></div>
        <div class="blog-body">
          <span class="blog-tag">${p.tag}</span>
          <h3>${p.title}</h3>
          <span class="blog-date text-muted">${p.date}</span>
          <p class="blog-excerpt">${p.excerpt}</p>
          <p class="blog-full">${p.body}</p>
          <button class="blog-toggle" data-post="${p.id}">Read more <span>→</span></button>
        </div>
      </article>`
    ).join("");
    $$(".blog-toggle", blogGrid).forEach((btn) =>
      btn.addEventListener("click", () => {
        const card = btn.closest(".blog-card");
        const open = card.classList.toggle("open");
        btn.innerHTML = open ? "Show less <span>↑</span>" : "Read more <span>→</span>";
      })
    );
  }

  /* ---------------- FAQ accordion ---------------- */
  const faqList = $("#faqList");
  if (faqList) {
    faqList.innerHTML = FAQS.map(
      (f) => `
      <div class="faq-item">
        <button class="faq-q"><span>${f.q}</span><span class="plus">+</span></button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`
    ).join("");
    $$(".faq-item", faqList).forEach((item) => {
      $(".faq-q", item).addEventListener("click", () => {
        const wasOpen = item.classList.contains("open");
        $$(".faq-item", faqList).forEach((i) => i.classList.remove("open"));
        if (!wasOpen) item.classList.add("open");
      });
    });
  }

  /* ---------------- Pricing toggle ---------------- */
  const planToggleBtns = $$(".plan-toggle button");
  if (planToggleBtns.length) {
    planToggleBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        planToggleBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cycle = btn.dataset.cycle;
        $$("[data-monthly]").forEach((el) => {
          const val = cycle === "annual" ? el.dataset.annual : el.dataset.monthly;
          el.textContent = val;
        });
        $$(".plan-save").forEach((el) => el.classList.toggle("hidden", cycle !== "annual"));
      })
    );
  }
  $$("[data-plan-add]").forEach((btn) =>
    btn.addEventListener("click", () => addToCart(btn.dataset.planAdd))
  );

  /* ---------------- Newsletter + Contact forms ---------------- */
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  $$(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("input[type=email]", form);
      const msg = $(".form-msg", form);
      if (!validEmail(input.value)) {
        if (msg) { msg.textContent = "Please enter a valid email address."; msg.classList.remove("ok"); }
        input.focus();
        return;
      }
      if (msg) { msg.textContent = "You're on the list! Check your inbox for a welcome gift 🎁"; msg.classList.add("ok"); }
      form.reset();
    });
  });

  const contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      $$(".form-field", contactForm).forEach((field) => {
        const input = field.querySelector("input, textarea, select");
        const err = field.querySelector(".field-error");
        if (!input) return;
        let fieldOk = true;
        if (input.hasAttribute("required") && !input.value.trim()) fieldOk = false;
        if (input.type === "email" && input.value && !validEmail(input.value)) fieldOk = false;
        field.classList.toggle("invalid", !fieldOk);
        if (err) err.textContent = fieldOk ? "" : (input.type === "email" ? "Enter a valid email address." : "This field is required.");
        if (!fieldOk) ok = false;
      });
      const successEl = $("#contactSuccess");
      if (!ok) { if (successEl) successEl.textContent = ""; return; }
      if (successEl) successEl.textContent = "Thanks! Our team will get back to you within 1 business day.";
      contactForm.reset();
    });
  }

  /* ---------------- Team follow buttons ---------------- */
  $$("[data-follow]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const following = btn.classList.toggle("following");
      btn.textContent = following ? "Following" : "Follow";
      const name = btn.closest(".team-card")?.querySelector("strong")?.textContent || "them";
      showToast(following ? `You're now following ${name}` : `Unfollowed ${name}`);
    })
  );

  /* ---------------- Footer year ---------------- */
  $$(".year").forEach((el) => (el.textContent = new Date().getFullYear()));
})();

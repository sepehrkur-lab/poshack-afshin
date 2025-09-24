// script.js

class SepahrShop {
  constructor() {
    this.cart = [];
    this.products = [];
    this.init();
  }

  init() {
    this.loadProducts();
    this.loadCart();
    this.setupEventListeners();
    this.updateCartUI();
  }

  // --- محصولات ---
  loadProducts() {
    const stored = localStorage.getItem("sepahr_products");
    if (stored) {
      this.products = JSON.parse(stored);
    } else {
      this.products = window.products || [];
      localStorage.setItem("sepahr_products", JSON.stringify(this.products));
    }
  }

  // --- سبد خرید ---
  loadCart() {
    const savedCart = localStorage.getItem("sepahr_cart");
    this.cart = savedCart ? JSON.parse(savedCart) : [];
  }

  saveCart() {
    localStorage.setItem("sepahr_cart", JSON.stringify(this.cart));
    this.updateCartUI();
  }

  addToCart(productId, quantity = 1) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return this.showNotification("محصول یافت نشد!", "error");

    const existing = this.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }

    this.saveCart();
    this.showNotification(`${product.name} به سبد خرید اضافه شد`, "success");
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.showNotification("محصول از سبد خرید حذف شد", "success");
  }

  updateCartQuantity(productId, change) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity < 1) this.removeFromCart(productId);

    this.saveCart();
  }

  // --- UI سبد خرید ---
  toggleCart() {
    document.getElementById("cartSidebar")?.classList.toggle("open");
    this.updateCartItems();
  }

  closeCart() {
    document.getElementById("cartSidebar")?.classList.remove("open");
  }

  updateCartUI() {
    const totalItems = this.cart.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = this.cart.reduce((s, i) => s + i.price * i.quantity, 0);

    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? "flex" : "none";
    }

    const cartTotal = document.getElementById("cartTotal");
    if (cartTotal) cartTotal.textContent = `${this.formatPrice(totalPrice)} تومان`;
  }

  updateCartItems() {
    const container = document.getElementById("cartItems");
    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px;color:#718096;">
          <i class="fas fa-shopping-cart" style="font-size:3rem;margin-bottom:15px;"></i>
          <p>سبد خرید شما خالی است</p>
          <button class="btn btn-primary" onclick="window.location.href='products.html'">
            ادامه خرید
          </button>
        </div>`;
      return;
    }

    container.innerHTML = this.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div style="display:flex;gap:15px;padding:10px;border-bottom:1px solid #eee;">
          <img src="${item.image}" alt="${item.name}" style="width:70px;height:70px;object-fit:cover;border-radius:8px;">
          <div style="flex:1;">
            <h4 style="margin-bottom:5px;">${item.name}</h4>
            <div style="color:#e91e63;font-weight:bold;">${this.formatPrice(item.price)} تومان</div>
            <div style="display:flex;align-items:center;gap:10px;margin-top:8px;">
              <button onclick="sepahrShop.updateCartQuantity(${item.id},-1)" class="qty-btn">-</button>
              <span>${item.quantity}</span>
              <button onclick="sepahrShop.updateCartQuantity(${item.id},1)" class="qty-btn">+</button>
              <button onclick="sepahrShop.removeFromCart(${item.id})" class="remove-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  // --- جستجو ---
  handleSearch(query) {
    const searchResults = document.getElementById("searchResults");
    if (!searchResults) return;

    if (query.length < 2) {
      searchResults.style.display = "none";
      return;
    }

    const results = this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
      searchResults.innerHTML = results.map(p => `
        <div class="search-result-item" onclick="window.location.href='product-detail.html?id=${p.id}'">
          <img src="${p.image}" alt="${p.name}">
          <div>
            <div class="search-result-name">${p.name}</div>
            <div class="search-result-price">${this.formatPrice(p.price)} تومان</div>
          </div>
        </div>
      `).join("");
    } else {
      searchResults.innerHTML = `<div class="search-result-item">محصولی یافت نشد</div>`;
    }
    searchResults.style.display = "block";
  }

  // --- ابزارها ---
  formatPrice(price) {
    return new Intl.NumberFormat("fa-IR").format(price);
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add("hide"), 2500);
    setTimeout(() => notification.remove(), 3000);
  }

  // --- رویدادها ---
  setupEventListeners() {
    document.getElementById("cartBtn")?.addEventListener("click", () => this.toggleCart());
    document.getElementById("closeCart")?.addEventListener("click", () => this.closeCart());

    document.getElementById("searchInput")?.addEventListener("input", e => this.handleSearch(e.target.value));

    document.addEventListener("click", e => {
      const sidebar = document.getElementById("cartSidebar");
      if (sidebar && !sidebar.contains(e.target) && !e.target.closest("#cartBtn")) {
        this.closeCart();
      }
    });
  }
}

// --- راه‌اندازی فروشگاه ---
document.addEventListener("DOMContentLoaded", () => {
  window.sepahrShop = new SepahrShop();
});

// توابع global برای HTML
function addToCart(id) {
  window.sepahrShop?.addToCart(id);
}

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

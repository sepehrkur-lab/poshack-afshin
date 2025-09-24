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
    this.setupListeners();
    this.updateCartUI();
  }

  loadProducts() {
    try {
      this.products = JSON.parse(localStorage.getItem('sepahr_products') || '[]');
    } catch {
      this.products = window.products || [];
      localStorage.setItem('sepahr_products', JSON.stringify(this.products));
    }
  }

  loadCart() {
    try {
      this.cart = JSON.parse(localStorage.getItem('sepahr_cart') || '[]');
    } catch {
      this.cart = [];
      localStorage.setItem('sepahr_cart', JSON.stringify(this.cart));
    }
  }

  saveCart() {
    localStorage.setItem('sepahr_cart', JSON.stringify(this.cart));
    this.updateCartUI();
  }

  addToCart(productId, qty = 1) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return this.showNotification('محصول پیدا نشد', 'error');

    const idx = this.cart.findIndex(i => i.id === productId);
    if (idx > -1) this.cart[idx].quantity += qty;
    else this.cart.push({...product, quantity: qty});

    this.saveCart();
    this.showNotification(`${product.name} به سبد اضافه شد`, 'success');
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.id !== productId);
    this.saveCart();
    this.showNotification('محصول حذف شد', 'success');
  }

  updateCartQuantity(productId, change) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity < 1) this.removeFromCart(productId);
    this.saveCart();
  }

  updateCartUI() {
    const countEl = document.getElementById('cartCount');
    const totalEl = document.getElementById('cartTotal');
    const itemsEl = document.getElementById('cartItems');

    const totalCount = this.cart.reduce((s,i)=>s+i.quantity,0);
    const totalPrice = this.cart.reduce((s,i)=>s + (i.price * i.quantity),0);

    if (countEl) {
      countEl.textContent = totalCount;
      countEl.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    }
    if (totalEl) totalEl.textContent = (new Intl.NumberFormat('fa-IR').format(totalPrice)) + ' تومان';

    if (itemsEl) {
      if (this.cart.length === 0) {
        itemsEl.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--muted)">سبد شما خالی است</div>`;
      } else {
        itemsEl.innerHTML = this.cart.map(it => `
          <div class="cart-item" data-id="${it.id}">
            <img src="${it.image}" alt="${it.name}">
            <div style="flex:1">
              <div style="font-weight:700">${it.name}</div>
              <div style="color:var(--primary)">${new Intl.NumberFormat('fa-IR').format(it.price)} تومان</div>
              <div style="display:flex;align-items:center;gap:.6rem;margin-top:.6rem">
                <button class="qty-btn" onclick="sepahrShop.updateCartQuantity(${it.id}, -1)">-</button>
                <span>${it.quantity}</span>
                <button class="qty-btn" onclick="sepahrShop.updateCartQuantity(${it.id}, 1)">+</button>
                <button class="remove-btn" onclick="sepahrShop.removeFromCart(${it.id})"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  toggleCart() {
    document.getElementById('cartSidebar')?.classList.toggle('open');
    this.updateCartUI();
  }
  closeCart() { document.getElementById('cartSidebar')?.classList.remove('open'); }

  // search
  handleSearch(q) {
    const root = document.getElementById('searchResults');
    if (!root) return;
    if (!q || q.trim().length < 2) { root.style.display='none'; return; }
    const query = q.trim().toLowerCase();
    const list = this.products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    if (list.length === 0) {
      root.innerHTML = `<div class="search-result-item">محصولی یافت نشد</div>`;
      root.style.display='block';
      return;
    }
    root.innerHTML = list.map(p => `
      <div class="search-result-item" onclick="window.location.href='product-detail.html?id=${p.id}'">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <div style="font-weight:700">${p.name}</div>
          <div style="color:var(--muted)">${new Intl.NumberFormat('fa-IR').format(p.price)} تومان</div>
        </div>
      </div>
    `).join('');
    root.style.display='block';
  }

  // notification
  showNotification(text, type='success') {
    const root = document.getElementById('notification-root');
    const el = document.createElement('div');
    el.className = `notification ${type} show`;
    el.textContent = text;
    root.appendChild(el);
    setTimeout(()=> el.classList.add('hide'), 2200);
    setTimeout(()=> el.remove(), 2600);
  }

  setupListeners() {
    document.getElementById('cartBtn')?.addEventListener('click', ()=> this.toggleCart());
    document.getElementById('closeCart')?.addEventListener('click', ()=> this.closeCart());
    document.getElementById('searchInput')?.addEventListener('input', (e)=> this.handleSearch(e.target.value));
    document.addEventListener('click', (e)=> {
      const sidebar = document.getElementById('cartSidebar');
      if (sidebar && !sidebar.contains(e.target) && !e.target.closest('#cartBtn')) this.closeCart();
      const sr = document.getElementById('searchResults');
      if (sr && !sr.contains(e.target) && e.target.id !== 'searchInput') sr.style.display='none';
    });
  }
}

// expose
window.sepahrShop = new SepahrShop();

// helper for inline buttons
function addToCart(id) { window.sepahrShop.addToCart(id); }
function formatPrice(price){ return new Intl.NumberFormat('fa-IR').format(price); }

// مدیریت سبد خرید (بدون localStorage)
class Cart {
  constructor() {
    this.items = [];
  }

  add(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = this.items.find(i => i.id === productId);
    if (existing) existing.qty++;
    else this.items.push({...product, qty: 1});
    this.updateUI();
  }

  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.updateUI();
  }

  changeQty(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.remove(productId);
    this.updateUI();
  }

  total() {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  }

  updateUI() {
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    const count = this.items.reduce((s,i)=>s+i.qty,0);
    cartCount.textContent = count;

    if (this.items.length === 0) {
      cartItems.innerHTML = `<p style="text-align:center;color:#999">سبد خالی است</p>`;
    } else {
      cartItems.innerHTML = this.items.map(it => `
        <div class="cart-item">
          <img src="${it.image}" alt="${it.name}" style="width:60px;height:60px;border-radius:8px">
          <div style="flex:1">
            <div>${it.name}</div>
            <div style="color:var(--primary)">${formatPrice(it.price)} تومان</div>
            <div>
              <button onclick="cart.changeQty(${it.id},-1)">-</button>
              <span>${it.qty}</span>
              <button onclick="cart.changeQty(${it.id},1)">+</button>
              <button onclick="cart.remove(${it.id})">❌</button>
            </div>
          </div>
        </div>
      `).join("");
    }
    cartTotal.textContent = formatPrice(this.total()) + " تومان";
  }
}

function addToCart(id) { cart.add(id); }
const cart = new Cart();

// باز و بسته کردن سبد خرید
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cartBtn")?.addEventListener("click", () => {
    document.getElementById("cartSidebar").classList.toggle("open");
  });
  document.getElementById("closeCart")?.addEventListener("click", () => {
    document.getElementById("cartSidebar").classList.remove("open");
  });
});

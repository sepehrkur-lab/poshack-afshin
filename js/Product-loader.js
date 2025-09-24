// این فایل محصولات رو از products.js می‌گیره و داخل صفحه نشون می‌ده

function renderProducts(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:#999">محصولی یافت نشد</p>`;
    return;
  }
  container.innerHTML = list.map(p => `
    <div class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="product-content">
        <div class="product-title">${p.name}</div>
        <div class="product-category">${p.category}</div>
        <div class="product-price">
          <span class="current-price">${formatPrice(p.price)} تومان</span>
          ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)} تومان</span>` : ""}
        </div>
        <div style="display:flex;gap:.5rem">
          <a class="btn btn-outline" href="product-detail.html?id=${p.id}">جزئیات</a>
          <button class="btn btn-primary" onclick="addToCart(${p.id})">افزودن به سبد</button>
        </div>
      </div>
    </div>
  `).join('');
}

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

// صفحه محصولات
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("allProducts")) {
    renderProducts("allProducts", products);
  }
  if (document.getElementById("featuredProducts")) {
    renderProducts("featuredProducts", products.slice(0, 4));
  }
});

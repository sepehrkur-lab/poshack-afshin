// product-loader.js

function getProductsSource() {
  const stored = localStorage.getItem('sepahr_products');
  if (stored) return JSON.parse(stored);

  // اگر localStorage خالی بود از products.js استفاده کن و ذخیره کن
  if (window.products && Array.isArray(window.products)) {
    localStorage.setItem('sepahr_products', JSON.stringify(window.products));
    return window.products;
  }
  return [];
}

function renderProducts(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:#718096;padding:1.6rem">محصولی یافت نشد</p>`;
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
          <div class="current-price">${formatPrice(p.price)} تومان</div>
          ${p.oldPrice ? `<div class="old-price">${formatPrice(p.oldPrice)} تومان</div>` : ''}
        </div>
        <div style="display:flex;gap:.6rem;margin-top:.6rem">
          <a class="btn btn-outline" href="product-detail.html?id=${p.id}">جزئیات</a>
          <button class="btn btn-primary" onclick="addToCart(${p.id})">افزودن به سبد</button>
        </div>
      </div>
    </div>
  `).join('');
}

function formatPrice(price) {
  return new Intl.NumberFormat('fa-IR').format(price);
}

document.addEventListener('DOMContentLoaded', () => {
  const allProducts = getProductsSource();

  // Featured on index
  const featuredEl = document.getElementById('featuredProducts');
  if (featuredEl) {
    const featured = allProducts.slice(0,4);
    renderProducts('featuredProducts', featured);
  }

  // Products page
  const allEl = document.getElementById('allProducts');
  if (allEl) {
    // default render
    renderProducts('allProducts', allProducts);

    // filters if exist
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');

    function applyFilters() {
      let list = getProductsSource();
      if (categoryFilter && categoryFilter.value !== 'all') {
        list = list.filter(p => p.category === categoryFilter.value);
      }
      if (sortFilter) {
        if (sortFilter.value === 'priceLow') list = list.sort((a,b) => a.price - b.price);
        if (sortFilter.value === 'priceHigh') list = list.sort((a,b) => b.price - a.price);
        if (sortFilter.value === 'discount') list = list.sort((a,b) => (b.oldPrice?b.oldPrice-b.price:0) - (a.oldPrice?a.oldPrice-a.price:0));
      }
      renderProducts('allProducts', list);
    }

    categoryFilter?.addEventListener('change', applyFilters);
    sortFilter?.addEventListener('change', applyFilters);
  }

  // product-detail page
  const detailEl = document.getElementById('productDetail');
  if (detailEl) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = allProducts.find(p => p.id === id);
    if (!product) {
      detailEl.innerHTML = `<p style="text-align:center;color:#e53e3e;padding:1.6rem">محصول یافت نشد</p>`;
    } else {
      detailEl.innerHTML = `
        <div class="product-detail" style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;margin:2rem 0">
          <div>
            <img src="${product.image}" alt="${product.name}" style="width:100%;border-radius:12px;box-shadow:0 10px 30px rgba(2,6,23,0.06)">
          </div>
          <div>
            <h1 style="margin-bottom:.6rem">${product.name}</h1>
            <div style="color:var(--muted);margin-bottom:.6rem">${product.category} — ${product.type}</div>
            <div style="display:flex;gap:.8rem;align-items:center;margin-bottom:.8rem">
              <div class="current-price" style="font-size:1.5rem">${formatPrice(product.price)} تومان</div>
              ${product.oldPrice? `<div class="old-price">${formatPrice(product.oldPrice)} تومان</div>` : ''}
            </div>
            <p style="line-height:1.7;color:var(--muted)">${product.description || ''}</p>
            <div style="margin-top:1.2rem;display:flex;gap:.8rem">
              <button class="btn btn-primary" onclick="addToCart(${product.id})">افزودن به سبد خرید</button>
              <a class="btn btn-outline" href="products.html">بازگشت به محصولات</a>
            </div>
          </div>
        </div>`;
    }

    // related
    const relatedEl = document.getElementById('relatedProducts');
    if (relatedEl) {
      const related = allProducts.filter(p => p.category === (product?.category) && p.id !== product?.id).slice(0,4);
      renderProducts('relatedProducts', related);
    }
  }

});

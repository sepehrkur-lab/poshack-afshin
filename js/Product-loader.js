// product-loader.js

// گرفتن محصولات از فایل products.js یا localStorage
function getProducts() {
  // اگر localStorage محصول داشت
  const stored = localStorage.getItem("sepahr_products");
  if (stored) return JSON.parse(stored);

  // اگر نداشت از فایل products.js (آرایه products) می‌گیریم
  localStorage.setItem("sepahr_products", JSON.stringify(products));
  return products;
}

// نمایش محصولات
function renderProducts(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (productList.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:#718096;">محصولی یافت نشد</p>`;
    return;
  }

  container.innerHTML = productList.map(p => `
    <div class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="product-content">
        <h3 class="product-title">${p.name}</h3>
        <div class="product-category">${p.category}</div>
        <div class="product-price">
          <span class="current-price">${formatPrice(p.price)} تومان</span>
          ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)} تومان</span>` : ""}
        </div>
        <button class="btn btn-primary" onclick="addToCart(${p.id})">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  `).join("");
}

// مرتب‌سازی
function sortProducts(list, sortType) {
  switch (sortType) {
    case "priceLow":
      return [...list].sort((a, b) => a.price - b.price);
    case "priceHigh":
      return [...list].sort((a, b) => b.price - a.price);
    case "discount":
      return [...list].sort((a, b) => {
        const discountA = a.oldPrice ? a.oldPrice - a.price : 0;
        const discountB = b.oldPrice ? b.oldPrice - b.price : 0;
        return discountB - discountA;
      });
    case "latest":
    default:
      return list; // پیش‌فرض: ترتیب اصلی
  }
}

// فیلتر دسته‌بندی
function filterProducts(list, category) {
  if (category === "all") return list;
  return list.filter(p => p.category === category);
}

// اجرای لود محصولات در DOM
document.addEventListener("DOMContentLoaded", () => {
  const allProducts = getProducts();

  // صفحه اصلی: محصولات ویژه
  if (document.getElementById("featuredProducts")) {
    const featured = allProducts.slice(0, 4); // ۴ محصول اول
    renderProducts("featuredProducts", featured);
  }

  // صفحه محصولات
  if (document.getElementById("allProducts")) {
    let filtered = allProducts;

    const categoryFilter = document.getElementById("categoryFilter");
    const sortFilter = document.getElementById("sortFilter");

    function updateProducts() {
      let list = filterProducts(allProducts, categoryFilter.value);
      list = sortProducts(list, sortFilter.value);
      renderProducts("allProducts", list);
    }

    if (categoryFilter && sortFilter) {
      categoryFilter.addEventListener("change", updateProducts);
      sortFilter.addEventListener("change", updateProducts);
    }

    updateProducts();
  }
});

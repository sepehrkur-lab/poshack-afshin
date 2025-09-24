<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>جزئیات محصول | پوشاک سپهر</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="manifest" href="manifest.json">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <!-- header same as other pages -->
  <header class="header">
    <div class="container header-top">
      <div class="logo"><i class="fas fa-crown"></i> پوشاک سپهر</div>
      <div class="header-actions">
        <div class="action-buttons">
          <button id="cartBtn" class="action-btn"><i class="fas fa-shopping-bag"></i><span id="cartCount" class="action-count">0</span></button>
        </div>
      </div>
    </div>
    <nav class="navbar"><div class="container"><ul class="nav-menu"><li><a href="index.html" class="nav-link">خانه</a></li><li><a href="products.html" class="nav-link">محصولات</a></li></ul></div></nav>
  </header>

  <main class="container">
    <div id="productDetail"></div>

    <section style="margin-top:2rem">
      <div class="section-header"><h3>محصولات مرتبط</h3></div>
      <div id="relatedProducts" class="products-grid"></div>
    </section>
  </main>

  <aside id="cartSidebar" class="cart-sidebar">
    <div class="cart-header"><h3>🛒 سبد خرید</h3><button id="closeCart" class="close-cart"><i class="fas fa-times"></i></button></div>
    <div id="cartItems" class="cart-items"></div>
    <div class="cart-footer"><div class="cart-total">جمع کل: <span id="cartTotal">0 تومان</span></div><div class="cart-actions"><a class="btn btn-outline" href="products.html">ادامه خرید</a><a class="btn btn-primary" href="checkout.html">تکمیل خرید</a></div></div>
  </aside>

  <div id="notification-root"></div>

  <script defer src="js/products.js"></script>
  <script defer src="js/product-loader.js"></script>
  <script defer src="js/script.js"></script>
</body>
</html>

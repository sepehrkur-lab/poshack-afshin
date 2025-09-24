function loadProductsFromStrorage() {
    const savedProducts = loadStrorage.getItem('sepahr_product');
    return savedProducts ? JSON.parse(savedProducts) : [];
}
//رندر محصولات در صفحه
function renderFeaturedProductsFromStorage() {
const products = document.getElementById('featuredProducts');

  if (container && products.length > 0) {

 }
}

document.addEventListener('DOMContentLoaded', renderFeaturedProducts);
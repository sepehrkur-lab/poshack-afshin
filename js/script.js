class SepahrShop {
    constructor() {
        this.cart = [];
        this.init();
    }

    init() {
        this.loadCart();
        this.setupEventListeners();
        this.updateCartUI();
    }

    // بارگذاری سبد خرید از localStorage
    loadCart() {
        const savedCart = localStorage.getItem('sepahr_cart');
        this.cart = savedCart ? JSON.parse(savedCart) : [];
    }

    // ذخیره سبد خرید در localStorage
    saveCart() {
        localStorage.setItem('sepahr_cart', JSON.stringify(this.cart));
        this.updateCartUI();
    }

    // تنظیم event listeners
    setupEventListeners() {
        // سبد خرید
        const cartBtn = document.getElementById('cartBtn');
        const closeCart = document.getElementById('closeCart');
        
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.toggleCart());
        }
        
        if (closeCart) {
            closeCart.addEventListener('click', () => this.closeCart());
        }

        // جستجو
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // کلیک خارج از سبد خرید
        document.addEventListener('click', (e) => {
            const cartSidebar = document.getElementById('cartSidebar');
            if (cartSidebar && !cartSidebar.contains(e.target) && !e.target.closest('#cartBtn')) {
                this.closeCart();
            }
        });
    }

    // افزودن به سبد خرید
    addToCart(productId, quantity = 1) {
        // ابتدا محصولات رو از localStorage بخون
        const products = JSON.parse(localStorage.getItem('sepahr_products') || '[]');
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            this.showNotification('محصول یافت نشد!', 'error');
            return;
        }

        // بررسی وجود محصول در سبد خرید
        const existingItemIndex = this.cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex > -1) {
            // افزایش تعداد
            this.cart[existingItemIndex].quantity += quantity;
        } else {
            // افزودن جدید
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} به سبد خرید اضافه شد`, 'success');
    }

    // حذف از سبد خرید
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.showNotification('محصول از سبد خرید حذف شد', 'success');
    }

    // به‌روزرسانی تعداد
    updateCartQuantity(productId, change) {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        if (itemIndex === -1) return;

        const newQuantity = this.cart[itemIndex].quantity + change;
        
        if (newQuantity < 1) {
            this.removeFromCart(productId);
            return;
        }

        this.cart[itemIndex].quantity = newQuantity;
        this.saveCart();
    }

    // مدیریت سبد خرید
    toggleCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.toggle('open');
            if (cartSidebar.classList.contains('open')) {
                this.updateCartItems();
            }
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('open');
        }
    }

    // به‌روزرسانی UI سبد خرید
    updateCartUI() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // به‌روزرسانی شمارنده
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // به‌روزرسانی جمع کل
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            cartTotal.textContent = `${this.formatPrice(totalPrice)} تومان`;
        }
    }

    // به‌روزرسانی آیتم‌های سبد خرید
    updateCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 50px 20px; color: #718096;">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 20px;"></i>
                    <p>سبد خرید شما خالی است</p>
                    <button class="add-to-cart" onclick="window.location.href='products.html'" 
                            style="margin-top: 20px; background: #667eea;">
                        ادامه خرید
                    </button>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div style="display: flex; gap: 15px; padding: 15px; border-bottom: 1px solid #e2e8f0;">
                    <img src="${item.image}" alt="${item.name}" 
                         style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div style="flex: 1;">
                        <h4 style="margin-bottom: 5px; color: #2d3748;">${item.name}</h4>
                        <div style="color: #e91e63; font-weight: bold; margin-bottom: 10px;">
                            ${this.formatPrice(item.price)} تومان
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <button onclick="sepahrShop.updateCartQuantity(${item.id}, -1)" 
                                    style="width: 30px; height: 30px; border: none; background: #e2e8f0; border-radius: 50%; cursor: pointer;">-</button>
                            <span style="font-weight: bold;">${item.quantity}</span>
                            <button onclick="sepahrShop.updateCartQuantity(${item.id}, 1)" 
                                    style="width: 30px; height: 30px; border: none; background: #e2e8f0; border-radius: 50%; cursor: pointer;">+</button>
                            <button onclick="sepahrShop.removeFromCart(${item.id})" 
                                    style="margin-right: auto; background: none; border: none; color: #e53e3e; cursor: pointer;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // جستجو
    handleSearch(query) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const products = JSON.parse(localStorage.getItem('sepahr_products') || '[]');
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.type.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredProducts.length > 0) {
            searchResults.innerHTML = filteredProducts.map(product => `
                <div class="search-result-item" onclick="window.location.href='products.html'">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <div class="search-result-name">${product.name}</div>
                        <div class="search-result-price">${this.formatPrice(product.price)} تومان</div>
                    </div>
                </div>
            `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-result-item">محصولی یافت نشد</div>';
            searchResults.style.display = 'block';
        }
    }

    // فرمت قیمت
    formatPrice(price) {
        return new Intl.NumberFormat('fa-IR').format(price);
    }

    // نمایش نوتیفیکیشن
    showNotification(message, type = 'success') {
        // ایجاد نوتیفیکیشن
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#e53e3e' : '#ed8936'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            font-family: Vazirmatn;
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// راه‌اندازی فروشگاه
document.addEventListener('DOMContentLoaded', () => {
    window.sepahrShop = new SepahrShop();
});

// توابع global برای استفاده در HTML
function addToCart(productId) {
    if (window.sepahrShop) {
        window.sepahrShop.addToCart(productId);
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

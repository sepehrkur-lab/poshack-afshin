// فایل: js/products-data.js
// این فایل برای مدیریت داده‌های محصولات استفاده می‌شود
// شما می‌توانید محصولات جدید را به این آرایه اضافه کنید

const productsData = [
    {
        id: 1,
        name: "تیشرت پسرانه طرح کارتونی",
        description: "تیشرت نخی با کیفیت عالی و طرح کارتونی جذاب، مناسب برای پسران 2 تا 8 سال",
        price: 250000,
        oldPrice: 320000,
        category: "پسرانه",
        type: "تیشرت",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        sizes: ["2-4 سال", "4-6 سال", "6-8 سال"],
        colors: ["آبی", "قرمز", "سبز"],
        stock: 15,
        featured: true,
        discount: 22,
        tags: ["جدید", "پرفروش", "تخفیف دار"]
    },
    {
        id: 2,
        name: "پیراهن دخترانه گلدار",
        description: "پیراهن زیبا با طرح گل های رنگارنگ، مناسب برای مهمانی و مجالس",
        price: 180000,
        oldPrice: 220000,
        category: "دخترانه",
        type: "پیراهن",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        stock: 8,
        featured: true,
        discount: 18,
        tags: ["شیک", "مجلسی", "تخفیف دار"]
    },
    {
        id: 3,
        name: "ست نوزادی پسرانه",
        description: "ست کامل شامل بدن، شلوار و کلاه برای نوزادان پسر",
        price: 320000,
        oldPrice: 380000,
        category: "نوزادی",
        type: "ست کامل",
        image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        stock: 12,
        featured: true,
        discount: 16,
        tags: ["نوزادی", "ست کامل", "پرفروش"]
    },
    {
        id: 4,
        name: "شلوار جین پسرانه",
        description: "شلوار جین با کیفیت عالی و دوخت مستحکم",
        price: 190000,
        oldPrice: 240000,
        category: "پسرانه",
        type: "شلوار",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        stock: 20,
        featured: false,
        discount: 21,
        tags: ["جین", "بادوام"]
    },
    {
        id: 5,
        name: "دامن دخترانه چین دار",
        description: "دامن زیبا با چین‌های منظم و پارچه نخی با کیفیت",
        price: 150000,
        oldPrice: 185000,
        category: "دخترانه",
        type: "دامن",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        stock: 10,
        featured: true,
        discount: 19,
        tags: ["چین دار", "شیک", "جدید"]
    },
    {
        id: 6,
        name: "کفش ورزشی پسرانه",
        description: "کفش ورزشی با کفی نرم و انعطاف پذیر برای فعالیت روزانه",
        price: 420000,
        oldPrice: 520000,
        category: "اکسسوری",
        type: "کفش",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        stock: 7,
        featured: false,
        discount: 19,
        tags: ["کفش ورزشی", "راحت"]
    },
    {
        id: 7,
        name: "ژاکت دخترانه پشمی",
        description: "ژاکت گرم و نرم برای روزهای سرد پاییز و زمستان",
        price: 280000,
        oldPrice: 350000,
        category: "دخترانه",
        type: "ژاکت",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        stock: 14,
        featured: true,
        discount: 20,
        tags: ["پشمی", "زمستانی", "گرم"]
    },
    {
        id: 8,
        name: "کلاه نوزادی طرح حیوانات",
        description: "کلاه نرم و راحت با طرح حیوانات بامزه برای نوزادان",
        price: 75000,
        oldPrice: 90000,
        category: "نوزادی",
        type: "کلاه",
        image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        stock: 25,
        featured: false,
        discount: 17,
        tags: ["نوزادی", "کلاه", "حیوانات"]
    }
];

// تابع برای دریافت تمام محصولات
function getAllProducts() {
    return productsData;
}

// تابع برای دریافت محصول بر اساس ID
function getProductById(id) {
    return productsData.find(product => product.id === id);
}

// تابع برای دریافت محصولات یک دسته‌بندی خاص
function getProductsByCategory(category) {
    return productsData.filter(product => product.category === category);
}

// تابع برای دریافت محصولات ویژه
function getFeaturedProducts() {
    return productsData.filter(product => product.featured);
}

// تابع برای دریافت محصولات تخفیف دار
function getDiscountedProducts() {
    return productsData.filter(product => product.discount && product.discount > 0);
}

// تابع برای جستجو در محصولات
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return productsData.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.type.toLowerCase().includes(lowerQuery) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
}


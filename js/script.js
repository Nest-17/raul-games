const products = [
    {
        id: 1,
        name: "EA Sports FC 26",
        category: "Juegos",
        brand: "EA SPORTS",
        price: 2990,
        oldPrice: 3490,
        badge: "OFERTA",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
        description: "La nueva experiencia de fútbol de EA Sports con nuevos modos y mejoras.",
        specs: [
            "Plataforma: PlayStation 5",
            "Formato: Digital / Físico",
            "Multijugador online",
            "Idioma: Español"
        ]
    },
    {
        id: 2,
        name: "PlayStation 5 Slim",
        category: "Consolas",
        brand: "SONY",
        price: 27990,
        oldPrice: null,
        badge: "DESTACADO",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80",
        description: "Consola PlayStation 5 Slim con diseño compacto y alto rendimiento.",
        specs: [
            "SSD: 1 TB",
            "Resolución: hasta 4K",
            "Ray Tracing",
            "Incluye DualSense"
        ]
    },
    {
        id: 3,
        name: "Xbox Series X",
        category: "Consolas",
        brand: "MICROSOFT",
        price: 31990,
        oldPrice: 34990,
        badge: "OFERTA",
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=900&q=80",
        description: "Potente consola de nueva generación con almacenamiento SSD de alta velocidad.",
        specs: [
            "SSD: 1 TB",
            "Resolución: hasta 4K",
            "120 FPS",
            "4K UHD Blu-ray"
        ]
    },
    {
        id: 4,
        name: "RTX Gaming PC",
        category: "PC Gaming",
        brand: "RAUL GAMES",
        price: 58990,
        oldPrice: 64990,
        badge: "OFERTA",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=900&q=80",
        description: "PC gaming preparada para juegos actuales con alto rendimiento gráfico.",
        specs: [
            "GPU: NVIDIA GeForce RTX",
            "RAM: 32 GB",
            "SSD NVMe: 1 TB",
            "Windows 11"
        ]
    },
    {
        id: 5,
        name: "Mechanical Gaming Keyboard",
        category: "Periféricos",
        brand: "RAZER",
        price: 4990,
        oldPrice: null,
        badge: "DESTACADO",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
        description: "Teclado mecánico gaming diseñado para ofrecer respuesta rápida y precisión.",
        specs: [
            "Switches mecánicos",
            "Retroiluminación RGB",
            "USB-C",
            "Diseño compacto"
        ]
    },
    {
        id: 6,
        name: "Gaming Headset Pro",
        category: "Audio",
        brand: "HYPERX",
        price: 6990,
        oldPrice: null,
        badge: "NUEVO",
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&q=80",
        description: "Auriculares gaming con sonido envolvente y micrófono integrado.",
        specs: [
            "Audio 7.1",
            "Micrófono desmontable",
            "Conexión USB",
            "Compatibilidad PC y consola"
        ]
    },
    {
        id: 7,
        name: "Gaming Monitor 27",
        category: "Monitores",
        brand: "LG",
        price: 13990,
        oldPrice: 15990,
        badge: "OFERTA",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
        description: "Monitor gaming de 27 pulgadas con alta frecuencia de actualización.",
        specs: [
            "Tamaño: 27 pulgadas",
            "Resolución: 2560 × 1440",
            "Refresh rate: 165 Hz",
            "AMD FreeSync"
        ]
    },
    {
        id: 8,
        name: "Nintendo Switch OLED",
        category: "Consolas",
        brand: "NINTENDO",
        price: 22990,
        oldPrice: null,
        badge: "NUEVO",
        image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=900&q=80",
        description: "Nintendo Switch con pantalla OLED de 7 pulgadas y almacenamiento ampliado.",
        specs: [
            "Pantalla OLED de 7 pulgadas",
            "Almacenamiento: 64 GB",
            "Modo portátil y TV",
            "Joy-Con incluidos"
        ]
    }
];

let currentFilter = "Todos";
let currentSearch = "";
let currentSort = "default";
let featuredPage = 0;

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const filterButtons = document.querySelectorAll(".filter-button");
const categoryCards = document.querySelectorAll(".category-card");

const productModal = document.getElementById("productModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalOldPrice = document.getElementById("modalOldPrice");
const modalSpecs = document.getElementById("modalSpecs");

const themeToggle = document.getElementById("themeToggle");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mainNav = document.getElementById("mainNav");

const featuredGrid = document.getElementById("featuredGrid");
const featuredPrev = document.getElementById("featuredPrev");
const featuredNext = document.getElementById("featuredNext");
const carouselIndicator = document.getElementById("carouselIndicator");

function formatPrice(price) {
    return new Intl.NumberFormat("es-UY", {
        style: "currency",
        currency: "UYU",
        maximumFractionDigits: 0
    }).format(price);
}

function getFilteredProducts() {
    let result = [...products];

    if (currentFilter !== "Todos") {
        result = result.filter(product => product.category === currentFilter);
    }

    if (currentSearch.trim()) {
        const search = currentSearch.toLowerCase().trim();

        result = result.filter(product =>
            product.name.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search)
        );
    }

    if (currentSort === "price-low") {
        result.sort((a, b) => a.price - b.price);
    }

    if (currentSort === "price-high") {
        result.sort((a, b) => b.price - a.price);
    }

    if (currentSort === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
}

function createProductCard(product) {
    const oldPrice = product.oldPrice
        ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>`
        : "";

    const badge = product.badge
        ? `<span class="product-badge">${product.badge}</span>`
        : "";

    return `
        <article class="product-card">
            <div class="product-image">
                ${badge}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>

            <div class="product-info">
                <span class="product-brand">${product.brand}</span>

                <h3 class="product-name">${product.name}</h3>

                <div class="product-bottom">
                    <div class="price-container">
                        <span class="price">${formatPrice(product.price)}</span>
                        ${oldPrice}
                    </div>

                    <span class="product-tag">${product.category}</span>
                </div>

                <div class="product-actions">
                    <button class="details-button" data-product="${product.id}">
                        Ver detalles
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderProducts() {
    const filteredProducts = getFilteredProducts();

    productGrid.innerHTML = filteredProducts
        .map(createProductCard)
        .join("");

    emptyState.classList.toggle("visible", filteredProducts.length === 0);

    document.querySelectorAll("[data-product]").forEach(button => {
        button.addEventListener("click", () => {
            const productId = Number(button.dataset.product);
            openProductModal(productId);
        });
    });
}

function openProductModal(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalCategory.textContent = product.category;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = formatPrice(product.price);

    if (product.oldPrice) {
        modalOldPrice.textContent = formatPrice(product.oldPrice);
        modalOldPrice.style.display = "block";
    } else {
        modalOldPrice.textContent = "";
        modalOldPrice.style.display = "none";
    }

    modalSpecs.innerHTML = product.specs
        .map(spec => `<li>${spec}</li>`)
        .join("");

    productModal.classList.add("open");
    document.body.classList.add("modal-open");
}

function closeProductModal() {
    productModal.classList.remove("open");
    document.body.classList.remove("modal-open");
}

function setFilter(filter) {
    currentFilter = filter;

    filterButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );
    });

    renderProducts();

    document.getElementById("catalogo").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function renderFeatured() {
    const featuredProducts = products.filter(product =>
        product.badge === "OFERTA" ||
        product.badge === "DESTACADO" ||
        product.badge === "NUEVO"
    );

    const itemsPerPage = window.innerWidth <= 700
        ? 1
        : window.innerWidth <= 1050
            ? 2
            : 3;

    const totalPages = Math.ceil(featuredProducts.length / itemsPerPage);

    if (featuredPage >= totalPages) {
        featuredPage = totalPages - 1;
    }

    if (featuredPage < 0) {
        featuredPage = 0;
    }

    const start = featuredPage * itemsPerPage;
    const visibleProducts = featuredProducts.slice(
        start,
        start + itemsPerPage
    );

    featuredGrid.innerHTML = visibleProducts
        .map(createProductCard)
        .join("");

    featuredGrid.querySelectorAll("[data-product]").forEach(button => {
        button.addEventListener("click", () => {
            openProductModal(Number(button.dataset.product));
        });
    });

    featuredPrev.disabled = featuredPage === 0;
    featuredNext.disabled = featuredPage >= totalPages - 1;

    const indicators = carouselIndicator.querySelectorAll("span");

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle(
            "active",
            index === featuredPage
        );
    });
}

function nextFeatured() {
    featuredPage++;
    renderFeatured();
}

function previousFeatured() {
    featuredPage--;
    renderFeatured();
}

function toggleTheme() {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    themeToggle.textContent = isLight ? "☀" : "☾";

    localStorage.setItem(
        "raulGamesTheme",
        isLight ? "light" : "dark"
    );
}

function loadTheme() {
    const savedTheme = localStorage.getItem("raulGamesTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
        themeToggle.textContent = "☀";
    } else {
        themeToggle.textContent = "☾";
    }
}

searchInput.addEventListener("input", event => {
    currentSearch = event.target.value;
    renderProducts();
});

sortSelect.addEventListener("change", event => {
    currentSort = event.target.value;
    renderProducts();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        setFilter(button.dataset.filter);
    });
});

categoryCards.forEach(card => {
    card.addEventListener("click", () => {
        setFilter(card.dataset.category);
    });
});

modalClose.addEventListener("click", closeProductModal);
modalOverlay.addEventListener("click", closeProductModal);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProductModal();
    }
});

featuredNext.addEventListener("click", nextFeatured);
featuredPrev.addEventListener("click", previousFeatured);

themeToggle.addEventListener("click", toggleTheme);

mobileMenuButton.addEventListener("click", () => {
    mainNav.classList.toggle("mobile-open");
});

document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("mobile-open");

        document.querySelectorAll(".main-nav a").forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

window.addEventListener("resize", () => {
    renderFeatured();
});

loadTheme();
renderProducts();
renderFeatured();
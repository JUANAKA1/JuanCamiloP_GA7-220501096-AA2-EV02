document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Zapato Casual', price: 59990, image: 'zapatos/casual.jpg', category: 'casual', size: 36, color: 'cafe' },
        { id: 2, name: 'Zapato Deportivo', price: 79990, image: 'zapatos/deportivo.jpg', category: 'deportivo', size: 37, color: 'negro-rojo' },
        { id: 3, name: 'Zapatilla Urbana', price: 69990, image: 'zapatos/urbana.jpg', category: 'urbana', size: 38, color: 'gris' },
        { id: 4, name: 'Botín de Cuero', price: 89990, image: 'zapatos/cuero.jpg', category: 'botin', size: 39, color: 'marrón' },
        { id: 5, name: 'Sandalias de Verano', price: 49990, image: 'zapatos/verano.jpg', category: 'sandalias', size: 40, color: 'azul' },
        { id: 6, name: 'Zapato de Fiesta', price: 74990, image: 'zapatos/fiesta.jpg', category: 'fiesta', size: 37, color: 'azul' },
        { id: 7, name: 'Zapatilla Deportiva', price: 89990, image: 'zapatos/tenis.jpg', category: 'deportivo', size: 39, color: 'blanco' },
        { id: 8, name: 'Botín Casual', price: 64990, image: 'zapatos/botin-casual.jpg', category: 'botin', size: 38, color: 'cafe' },
        { id: 9, name: 'Sandalias Playa', price: 39990, image: 'zapatos/playa.jpg', category: 'sandalias', size: 40, color: 'rojo' },
        { id: 10, name: 'Zapatillas Urbanas', price: 79990, image: 'zapatos/urbanas.jpg', category: 'urbana', size: 36, color: 'gris' },
        { id: 11, name: 'Botas Montaña', price: 99990, image: 'zapatos/montaña.jpg', category: 'botin', size: 39, color: 'negro' },
        { id: 12, name: 'Zapatos Formales', price: 89990, image: 'zapatos/formales.jpg', category: 'formal', size: 37, color: 'negro' }
    ];

    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('category');
    const colorFilter = document.getElementById('color');
    const priceRangeFilter = document.getElementById('priceRange');
    const sizeFilter = document.getElementById('size');
    const filtersContainer = document.getElementById('filters');
    const toggleFiltersBtn = document.getElementById('toggleFiltersBtn');
    const cartTotalItems = document.getElementById('cartTotalItems');
    const cartSubtotal = document.getElementById('cartSubtotal');

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    function displayProducts(productsToShow) {
        productGrid.innerHTML = '';
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productContent = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$ ${formatNumber(product.price)}</p>
                <p>Talla: ${product.size}</p>
                <p>Color: ${product.color}</p>
                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Agregar al Carrito</button>
            `;
            productCard.innerHTML = productContent;

            productCard.querySelector('.add-to-cart-btn').addEventListener('click', addToCartClicked);

            productGrid.appendChild(productCard);
        });
    }

    function formatNumber(number) {
        return new Intl.NumberFormat('es-CO').format(number);
    }

    function applyFilters() {
        let filteredProducts = products.slice();

        if (categoryFilter.value) {
            filteredProducts = filteredProducts.filter(product => product.category === categoryFilter.value);
        }

        if (colorFilter.value) {
            filteredProducts = filteredProducts.filter(product => product.color === colorFilter.value);
        }

        if (priceRangeFilter.value) {
            const [minPrice, maxPrice] = priceRangeFilter.value.split('-').map(parseFloat);
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
        }

        if (sizeFilter.value) {
            filteredProducts = filteredProducts.filter(product => product.size == sizeFilter.value);
        }

        displayProducts(filteredProducts);
    }

    function addToCartClicked(event) {
        const button = event.target;
        const productId = button.dataset.id;
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);
        const productImage = button.dataset.image;

        addToCart(productId, productName, productPrice, productImage);
        updateCartTotal();
    }

    function addToCart(id, name, price, image) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} ha sido agregado al carrito.`);
    }

    function updateCartTotal() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;
        let subtotal = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            subtotal += item.price * item.quantity;
        });

        cartTotalItems.textContent = totalItems;
        cartSubtotal.textContent = formatNumber(subtotal);
    }

    displayProducts(products);

    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);

    toggleFiltersBtn.addEventListener('click', () => {
        if (filtersContainer.style.display === 'none' || filtersContainer.style.display === '') {
            filtersContainer.style.display = 'flex';
            toggleFiltersBtn.textContent = 'Ocultar Filtros';
        } else {
            filtersContainer.style.display = 'none';
            toggleFiltersBtn.textContent = 'Mostrar Filtros';
        }
    });

    updateCartTotal();
});

function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    cart.push(product);
    saveCart(cart);
    updateCartSummary();
}

function updateCartSummary() {
    const cart = getCart();
    const cartTotalItems = document.getElementById('cartTotalItems');
    const cartSubtotal = document.getElementById('cartSubtotal');

    let totalItems = 0;
    let subtotal = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        subtotal += item.price * item.quantity;
    });

    cartTotalItems.textContent = totalItems;
    cartSubtotal.textContent = subtotal.toFixed(2);
}

const exampleProduct = {
    id: 1,
    name: 'Zapato Deportivo',
    price: 50000,
    quantity: 1
};

document.addEventListener('DOMContentLoaded', updateCartSummary);

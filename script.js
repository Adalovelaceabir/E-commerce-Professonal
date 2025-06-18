// DOM Elements
let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let loginForm = document.querySelector('.login-form');
let menuBtn = document.querySelector('#menu-btn');
let searchBtn = document.querySelector('#search-btn');
let cartBtn = document.querySelector('#cart-btn');
let loginBtn = document.querySelector('#login-btn');

// Toggle Menu
menuBtn.onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

// Toggle Search
searchBtn.onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

// Toggle Cart
cartBtn.onclick = () => {
    shoppingCart.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
}

// Toggle Login
loginBtn.onclick = () => {
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
}

// Remove active class when scrolling
window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

// Product Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const productItems = document.querySelectorAll('.products .box-container .box');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            productItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Load products dynamically (simulated)
    loadProducts();
});

// Simulated product loading
function loadProducts() {
    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 49.99,
            category: "electronics",
            image: "images/product-1.png",
            rating: 4
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 129.99,
            category: "electronics",
            image: "images/product-2.png",
            rating: 5
        },
        {
            id: 3,
            name: "Premium T-Shirt",
            price: 24.99,
            category: "clothing",
            image: "images/product-3.png",
            rating: 4
        },
        {
            id: 4,
            name: "Designer Jeans",
            price: 59.99,
            category: "clothing",
            image: "images/product-4.png",
            rating: 3
        },
        {
            id: 5,
            name: "Ceramic Coffee Mug",
            price: 14.99,
            category: "home",
            image: "images/product-5.png",
            rating: 5
        },
        {
            id: 6,
            name: "Decorative Pillow",
            price: 19.99,
            category: "home",
            image: "images/product-6.png",
            rating: 4
        }
    ];
    
    const container = document.querySelector('.products .box-container');
    
    products.forEach(product => {
        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
        
        const productElement = document.createElement('div');
        productElement.className = `box ${product.category}`;
        productElement.innerHTML = `
            <div class="image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="content">
                <h3>${product.name}</h3>
                <div class="stars">${stars}</div>
                <div class="price">$${product.price.toFixed(2)}</div>
                <a href="#" class="btn">add to cart</a>
            </div>
        `;
        
        container.appendChild(productElement);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.products .box-container .box .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productBox = this.closest('.box');
            const productName = productBox.querySelector('h3').textContent;
            const productPrice = productBox.querySelector('.price').textContent;
            const productImage = productBox.querySelector('img').src;
            
            // Add to cart
            addToCart(productName, productPrice, productImage);
            
            // Show cart
            shoppingCart.classList.add('active');
        });
    });
}

// Cart functionality
function addToCart(name, price, image) {
    const cartContainer = document.querySelector('.shopping-cart');
    const cartItems = cartContainer.querySelectorAll('.box');
    let itemExists = false;
    
    // Check if item already exists in cart
    cartItems.forEach(item => {
        if (item.querySelector('h3').textContent === name) {
            itemExists = true;
            const quantityElement = item.querySelector('.quantity');
            const quantity = parseInt(quantityElement.textContent.split(': ')[1]) + 1;
            quantityElement.textContent = `qty: ${quantity}`;
            
            // Update price
            const unitPrice = parseFloat(price.replace('$', ''));
            const totalPrice = unitPrice * quantity;
            item.querySelector('.price').textContent = `$${totalPrice.toFixed(2)}`;
        }
    });
    
    // If item doesn't exist, add new item to cart
    if (!itemExists) {
        const newItem = document.createElement('div');
        newItem.className = 'box';
        newItem.innerHTML = `
            <i class="fas fa-trash"></i>
            <img src="${image}" alt="${name}">
            <div class="content">
                <h3>${name}</h3>
                <span class="price">${price}</span>
                <span class="quantity">qty: 1</span>
            </div>
        `;
        cartContainer.insertBefore(newItem, cartContainer.querySelector('.total'));
        
        // Add event listener to delete button
        newItem.querySelector('.fa-trash').addEventListener('click', function() {
            newItem.remove();
            updateCartTotal();
        });
    }
    
    updateCartTotal();
}

function updateCartTotal() {
    const cartContainer = document.querySelector('.shopping-cart');
    const cartItems = cartContainer.querySelectorAll('.box');
    let total = 0;
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        total += price;
    });
    
    cartContainer.querySelector('.total').textContent = `total : $${total.toFixed(2)}`;
}
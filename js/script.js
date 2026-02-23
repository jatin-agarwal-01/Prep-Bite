// ============================================
// PREPBITE JAVASCRIPT
// ============================================

// ============================================
// CART MANAGEMENT
// ============================================

class Cart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('prepbiteCart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('prepbiteCart', JSON.stringify(this.items));
    }

    addItem(item) {
        this.items.push(item);
        this.saveCart();
        this.showNotification('Item added to cart successfully.');
        return true;
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        return true;
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #27ae60; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; font-weight: 600; max-width: 350px; word-wrap: break-word;';
        document.body.appendChild(notification);

        notification.offsetHeight; // Trigger reflow
        notification.style.opacity = '1';
        notification.style.animation = 'slideIn 0.3s ease';

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3500);
    }
}

// Initialize cart
const cart = new Cart();

// ============================================
// MEAL CUSTOMIZATION
// ============================================

class MealCustomizer {
    constructor() {
        this.selectedMeal = null;
        this.customizations = {
            spiceLevel: 'Medium',
            dietPreference: 'Vegetarian',
            servings: 1,
            proteinLevel: 'Regular'
        };
    }

    setMeal(mealData) {
        this.selectedMeal = mealData;
    }

    updateCustomization(option, value) {
        this.customizations[option] = value;
    }

    getCustomizationSummary() {
        return `${this.customizations.spiceLevel} Spice | ${this.customizations.servings} Serving(s) | ${this.customizations.dietPreference}`;
    }

    calculatePrice(basePrice) {
        let price = basePrice;
        
        // Adjust based on servings
        if (this.customizations.servings === '1 Person') {
            price = basePrice;
        } else if (this.customizations.servings === '2 Persons') {
            price = basePrice * 1.5;
        } else if (this.customizations.servings === '3 Persons') {
            price = basePrice * 2;
        }

        // Adjust for diet preference
        if (this.customizations.dietPreference === 'Non-Vegetarian') {
            price += 20;
        }

        // Adjust for high protein
        if (this.customizations.proteinLevel === 'High Protein') {
            price += 20;
        }

        return Math.round(price);
    }
}

// Initialize customizer
const customizer = new MealCustomizer();

// ============================================
// DOM UTILITIES
// ============================================

function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

// ============================================
// MEAL KITS DATA
// ============================================

const meals = {
    hakka: {
        id: 'hakka',
        name: 'Hakka Noodles Kit',
        basePrice: 120,
        prepTime: '10 min',
        description: 'Classic Indo-Chinese noodles with fresh vegetables and flavorful sauces.'
    },
    pasta: {
        id: 'pasta',
        name: 'White Sauce Pasta Kit',
        basePrice: 140,
        prepTime: '12 min',
        description: 'Creamy pasta with herbs and rich white sauce.'
    },
    friedrice: {
        id: 'friedrice',
        name: 'Fried Rice Kit',
        basePrice: 130,
        prepTime: '10 min',
        description: 'Perfectly seasoned rice with mixed vegetables and sauces.'
    },
    paneertikka: {
        id: 'paneertikka',
        name: 'Paneer Tikka Kit',
        basePrice: 150,
        prepTime: '15 min',
        description: 'Marinated paneer cubes with authentic spices.'
    },
    korean: {
        id: 'korean',
        name: 'Korean Rice Kit',
        basePrice: 160,
        prepTime: '15 min',
        description: 'Korean-style rice bowl with flavorful sauces and vegetables.'
    },
    manchurian: {
        id: 'manchurian',
        name: 'Manchurian Kit',
        basePrice: 140,
        prepTime: '12 min',
        description: 'Crispy vegetable balls with tangy Manchurian sauce.'
    }
};

// ============================================
// PAGE-SPECIFIC INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = getCurrentPage();

    if (currentPage === 'customize') {
        initializeCustomizePage();
    } else if (currentPage === 'cart') {
        initializeCartPage();
    } else if (currentPage === 'checkout') {
        initializeCheckoutPage();
    } else if (currentPage === 'meals') {
        initializeMealsPage();
    }

    updateCartDisplay();
    initializeNavToggles();
});

function initializeNavToggles() {
    const toggles = document.querySelectorAll('.nav-toggle');
    toggles.forEach(btn => {
        btn.addEventListener('click', function() {
            const navbar = this.closest('.navbar');
            if (!navbar) return;
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            navbar.classList.toggle('nav-open');
        });
    });

    // Close nav when a link is clicked (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            const navbar = this.closest('.navbar');
            if (!navbar) return;
            navbar.classList.remove('nav-open');
            const toggle = navbar.querySelector('.nav-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('customize')) return 'customize';
    if (path.includes('checkout')) return 'checkout';
    if (path.includes('cart')) return 'cart';
    if (path.includes('meals')) return 'meals';
    return 'home';
}

// ============================================
// CUSTOMIZE PAGE
// ============================================

function initializeCustomizePage() {
    const mealParam = getQueryParam('meal');
    const meal = meals[mealParam] || meals.hakka;
    
    customizer.setMeal(meal);

    document.getElementById('selectedMeal').innerText = meal.name;
    document.getElementById('basePriceDisplay').innerText = '₹' + meal.basePrice;
    document.getElementById('finalPriceDisplay').innerText = '₹' + meal.basePrice;

    // Spice Level
    const spiceOptions = document.querySelectorAll('input[name="spiceLevel"]');
    spiceOptions.forEach(option => {
        option.addEventListener('change', function() {
            customizer.updateCustomization('spiceLevel', this.value);
            updatePriceDisplay();
        });
    });

    // Diet Preference
    const dietOptions = document.querySelectorAll('input[name="dietPreference"]');
    dietOptions.forEach(option => {
        option.addEventListener('change', function() {
            customizer.updateCustomization('dietPreference', this.value);
            updatePriceDisplay();
        });
    });

    // Servings
    const servingOptions = document.querySelectorAll('input[name="servings"]');
    servingOptions.forEach(option => {
        option.addEventListener('change', function() {
            customizer.updateCustomization('servings', this.value);
            updatePriceDisplay();
        });
    });

    // Protein Level
    const proteinOptions = document.querySelectorAll('input[name="proteinLevel"]');
    proteinOptions.forEach(option => {
        option.addEventListener('change', function() {
            customizer.updateCustomization('proteinLevel', this.value);
            updatePriceDisplay();
        });
    });

    // Add to Cart Button
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const finalPrice = customizer.calculatePrice(meal.basePrice);
            const cartItem = {
                name: meal.name,
                basePrice: meal.basePrice,
                price: finalPrice,
                customization: customizer.getCustomizationSummary(),
                quantity: 1
            };
            cart.addItem(cartItem);
        });
    }
}

function updatePriceDisplay() {
    const basePriceDisplay = document.getElementById('basePriceDisplay');
    const finalPriceDisplay = document.getElementById('finalPriceDisplay');
    
    if (basePriceDisplay && finalPriceDisplay) {
        const meal = customizer.selectedMeal;
        const finalPrice = customizer.calculatePrice(meal.basePrice);
        finalPriceDisplay.innerText = '₹' + finalPrice;
    }
}

// ============================================
// CART PAGE
// ============================================

function initializeCartPage() {
    displayCartItems();
}

function displayCartItems() {
    const cartContainer = document.getElementById('cartItems');
    
    if (!cartContainer) return;

    if (cart.items.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is currently empty.</p>
                <p>Browse our meal kits to get started.</p>
                <a href="meals.html" class="btn btn-primary">Browse Meals</a>
            </div>
        `;
        return;
    }

    let cartHTML = '';
    cart.items.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-customization">${item.customization}</p>
                    <p class="item-price">₹${item.price} x ${item.quantity}</p>
                </div>
                <button class="btn btn-outline" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartHTML += `
        <div class="cart-summary">
            <p class="total-label">Total Amount:</p>
            <p class="total-price">₹${cart.getTotal()}</p>
        </div>
        <div class="cart-actions">
            <button class="btn btn-outline" onclick="cart.clearCart(); location.reload();">Clear Cart</button>
            <a href="checkout.html" class="btn btn-primary">Proceed to Checkout</a>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;
}

function removeFromCart(index) {
    cart.removeItem(index);
    displayCartItems();
    updateCartDisplay();
}

// ============================================
// CHECKOUT PAGE
// ============================================

function initializeCheckoutPage() {
    displayCheckoutSummary();
    const checkoutForm = document.getElementById('checkoutForm');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCheckout();
        });
    }
}

function displayCheckoutSummary() {
    const summaryContainer = document.getElementById('orderSummary');
    
    if (!summaryContainer) return;

    let summaryHTML = '<div class="order-items">';
    
    cart.items.forEach(item => {
        summaryHTML += `
            <div class="summary-item">
                <span>${item.name} (${item.quantity}x)</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `;
    });

    summaryHTML += `
        </div>
        <div class="order-total">
            <strong>Total: ₹${cart.getTotal()}</strong>
        </div>
    `;

    summaryContainer.innerHTML = summaryHTML;
}

function handleCheckout() {
    const name = document.getElementById('fullName')?.value;
    const phone = document.getElementById('phoneNumber')?.value;
    const address = document.getElementById('deliveryAddress')?.value;
    const city = document.getElementById('city')?.value;
    const pincode = document.getElementById('pincode')?.value;

    if (!name || !phone || !address || !city || !pincode) {
        alert('Please fill in all required fields');
        return;
    }

    const orderData = {
        customerName: name,
        phone: phone,
        address: address,
        city: city,
        pincode: pincode,
        items: cart.items,
        total: cart.getTotal(),
        timestamp: new Date().toISOString()
    };

    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('prepbiteOrders')) || [];
    orders.push(orderData);
    localStorage.setItem('prepbiteOrders', JSON.stringify(orders));

    // Clear cart
    cart.clearCart();

    // Show success message
    showOrderSuccess();
}

function showOrderSuccess() {
    const checkoutForm = document.getElementById('checkoutForm');
    const orderSection = document.getElementById('checkoutContainer');

    if (checkoutForm && orderSection) {
        checkoutForm.style.display = 'none';
        orderSection.innerHTML = `
            <div class="success-message">
                <h2>Order Placed Successfully!</h2>
                <p>Your PrepBite meal kit will be delivered soon. Thank you for choosing a smarter way to cook.</p>
                <a href="index.html" class="btn btn-primary">Back to Home</a>
            </div>
        `;
    }
}

// ============================================
// MEALS PAGE
// ============================================

function initializeMealsPage() {
    const mealsContainer = document.getElementById('mealsContainer');
    if (!mealsContainer) return;

    let mealsHTML = '';
    for (const [key, meal] of Object.entries(meals)) {
        mealsHTML += `
            <div class="meal-card">
                <h3 class="meal-name">${meal.name}</h3>
                <p class="meal-price">₹${meal.basePrice}</p>
                <p class="meal-time">${meal.prepTime} prep</p>
                <p class="meal-description">${meal.description}</p>
                <a href="customize.html?meal=${key}" class="btn btn-outline">Customize</a>
            </div>
        `;
    }

    mealsContainer.innerHTML = mealsHTML;
}

// ============================================
// CART DISPLAY UPDATE
// ============================================

function updateCartDisplay() {
    const cartLink = document.querySelector('.cart-link');
    if (cartLink && cart.getItemCount() > 0) {
        cartLink.innerHTML = `Cart (${cart.getItemCount()})`;
    }
}

// ============================================
// NOTIFICATIONS & ANIMATIONS
// ============================================

function showNotification(message) {
    cart.showNotification(message);
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SMOOTH SCROLLING & ANIMATIONS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

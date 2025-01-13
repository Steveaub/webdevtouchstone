// Initialize the cart from localStorage or as an empty array
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart in localStorage
function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to display cart items in the modal
function updateCartModal() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItemsList.appendChild(listItem);
        });
    }
}

// Add to Cart functionality
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartStorage();
        alert(`${name} has been added to your cart!`);
    });
});

// Modal functionality
const cartModal = document.getElementById("cart-modal");
const viewCartButton = document.getElementById("view-cart");
const closeButton = document.querySelector(".close-button");

viewCartButton.addEventListener("click", () => {
    updateCartModal();
    cartModal.style.display = "block";
});

closeButton.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// Clear Cart functionality
document.getElementById("clear-cart").addEventListener("click", () => {
    cart.length = 0;
    updateCartStorage();
    updateCartModal();
    alert("Cart cleared!");
});

// Process Order functionality
document.getElementById("process-order").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your order!");
        cart.length = 0;
        updateCartStorage();
        updateCartModal();
    }
});

// Close Modal on Background Click
window.addEventListener("click", event => {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// Subscription Form functionality
const subscribeForm = document.getElementById("subscribe-form");
if (subscribeForm) {
    subscribeForm.addEventListener("submit", event => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        if (validateEmail(email)) {
            localStorage.setItem("subscribedEmail", email);
            alert("Thank you for subscribing!");
        } else {
            alert("Please enter a valid email.");
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Feedback Form functionality
const feedbackForm = document.getElementById("contact-form");
if (feedbackForm) {
    feedbackForm.addEventListener("submit", event => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            localStorage.setItem("contactForm", JSON.stringify({ name, email, message }));
            alert("Thank you for your feedback!");
            feedbackForm.reset();
        } else {
            alert("Please fill out all fields.");
        }
    });
}

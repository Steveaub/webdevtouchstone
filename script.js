document.getElementById("subscribe-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    if (validateEmail(email)) {
        localStorage.setItem("subscribedEmail", email);
        alert("Thank you for subscribing!");
    } else {
        alert("Please enter a valid email.");
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Shopping cart functionality
const cart = [];

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const product = event.target.previousElementSibling.textContent;
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product} has been added to your cart!`);
    });
});
// Feedback form functionality
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        localStorage.setItem("contactForm", JSON.stringify({ name, email, message }));
        alert("Thank you for your feedback!");
        document.getElementById("contact-form").reset();
    } else {
        alert("Please fill out all fields.");
    }
});
// Contact form functionality
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const message = document.getElementById("message").value;

            if (name && email && phone && message) {
                localStorage.setItem("contactDetails", JSON.stringify({ name, email, phone, message }));
                alert("Thank you for reaching out! We will contact you shortly.");
                contactForm.reset();
            } else {
                alert("Please fill out all fields.");
            }
        });
    }
});

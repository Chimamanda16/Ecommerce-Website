// Variables and constants
const cart = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-content");
const cartIcon = document.querySelector("#cart-icon");
const closeCartBtn = document.querySelector(".close-cart");
const delItemBtn = document.querySelector("cart-remove");
const nav = document.querySelector(".nav");

// Cart open and close
const closeCart = ()=>{
    cart.style.display = "none";
    cartIcon.style.display = "block";
    nav.style.width = "100%";
}

const openCart = ()=>{
    cart.style.display = "block";
    cartIcon.style.display = "none";
    nav.style.width = "70%";
}
cartIcon.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart)

// Remove item from cart
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    
}
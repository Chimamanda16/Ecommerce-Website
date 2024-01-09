// Variables and constants
const cart = document.querySelector(".cart");
var cartBox = document.getElementsByClassName("cart-box");
const cartContent = document.querySelector(".cart-content");
const cartQuantity = document.querySelector(".cart-quantity");
const cartIcon = document.querySelector("#cart-icon");
const closeCartBtn = document.querySelector(".close-cart");
const delItemBtn = document.querySelector(".cart-remove");
const nav = document.querySelector(".nav");
const totalPrice = document.querySelector(".total-price");

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

// Keep item quantity positive
const positive = () =>{
    if(cartQuantity.value <= 0){
        cartQuantity.value = 1;
    }
}
cartQuantity.addEventListener("click", positive);

// Update Total Price
const updatePrice = () =>{
    // Price tag
    const priceTag = cartQuantity.previousElementSibling.innerHTML;
    var price = priceTag.match(/\d+/);
    price = Math.round((cartQuantity.value * price)*100)/100;
    totalPrice.innerHTML = "$" + price; 
}
cartQuantity.addEventListener("click", updatePrice);

// Remove item from cart
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    const removeItem = ()=>{
        const cart = delItemBtn.parentNode.parentNode;
        cart.remove();
    }
    delItemBtn.addEventListener("click", removeItem);
}
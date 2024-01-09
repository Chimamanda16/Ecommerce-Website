// Variables and constants
const addCart = document.querySelectorAll(".add-cart");
const cart = document.querySelector(".cart");
var cartBoxes = document.getElementsByClassName("cart-box");
const cartContent = document.querySelector(".cart-content");
var cartProductTitle = document.querySelectorAll(".cart-product-title");
const cartQuantity = document.querySelectorAll(".cart-quantity");
const cartIcon = document.querySelector("#cart-icon");
const closeCartBtn = document.querySelector(".close-cart");
const delItemBtn = document.querySelector(".cart-remove");
const nav = document.querySelector(".nav");
const totalPrice = document.querySelector(".total-price");

// Add to cart
const getItemInfo = (event)=>{
    var parentElement = event.parentNode;
    var addImg = parentElement.querySelector(".product-img");
    var imgSrc = addImg.getAttribute("src");
    var imgPrice = parentElement.querySelector(".price");
    var productTitle = parentElement.querySelector(".product-title");
    const createItemInfo = (img, title, pricing)=>{
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        for(var i = 0; i<=cartProductTitle.length; i++){
            if(cartProductTitle[i] == title){
                    alert("You have already added this item to cart");
                }
                else{
                    var cartContentBox = `<img src="` + imgSrc + `images/sneakers-1.jpg" alt="" class="cart-img">
                        <div class="detail-box">
                        <div class="cart-product-title">Sneaker 1</div>
                        <div class="cart-price">$40</div>
                        <input type="number" name="" value="1" class="cart-quantity">
                        <i class="fa-solid fa-trash cart-remove" style="color: red;"></i>
                        </div>`;
                    cartShopBox.insertAdjacentHTML("beforeend", cartContentBox);
                    cartContent.prepend(cartShopBox);
                }
        }
    }
    createItemInfo(addImg, imgPrice, productTitle);
    // updateTotal();
}
addCart.forEach(function(button){
    button.addEventListener("click", function(event){
        var clickedButton = event.currentTarget;
        // Call another function and pass the clicked button as an argument
        getItemInfo(clickedButton);
    });
});

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

// // Update total
// const updateTotal = ()=>{
//     if(cartBoxes.length <= 0){
//         totalPrice.innerHTML = "$" + 0;
//     }
// }

// Keep item quantity positive
const positive = () =>{
        if(cartQuantity.value <= 0){
            cartQuantity.value = 1;
    }
}
if(cartQuantity.length>0){
    cartQuantity.forEach(function (cartQuant) {
        cartQuant.addEventListener("click", positive);        
    });
}

// // Update Total Price
// const updatePrice = () =>{
//     // Price tag
//     const priceTag = cartQuantity.previousElementSibling.innerHTML;
//     var price = priceTag.match(/\d+/);
//     price = Math.round((cartQuantity.value * price)*100)/100;
//     totalPrice.innerHTML = "$" + price; 
// }
// cartQuantity.addEventListener("click", updatePrice);

// // Remove item from cart
// if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", ready);
// } else {
//     ready();
// }

// function ready() {
//     const removeItem = ()=>{
//         const cart = delItemBtn.parentNode.parentNode;
//         cart.remove();
//         updateTotal();
//     }
//     delItemBtn.addEventListener("click", removeItem);
// }
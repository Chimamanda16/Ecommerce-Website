// Variables and constants
const addCart = document.querySelectorAll(".add-cart");
const cart = document.querySelector(".cart");
var cartContent = document.querySelector(".cart-content");
const cartIcon = document.querySelector("#cart-icon");
const closeCartBtn = document.querySelector(".close-cart");
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

// Keep item quantity positive
function UpdateQuantityNumber(cartQuant){
    if(cartQuant.target.value <= 0){
        cartQuant.target.value = 1;
    }
}

// Add to cart function
function getItemInfo(event){
    var parentElement = event.parentNode;
    var price = parentElement.getElementsByClassName("price")[0].innerText;
    var productImg = parentElement.getElementsByClassName("product-img")[0].src;
    var productTitle = parentElement.getElementsByClassName("product-title")[0].innerText;
    var cartContentBox = `<img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
    <div class="cart-product-title">${productTitle}</div>
    <div class="cart-price">${price}</div>
    <input type="number" name="" value="1" class="cart-quantity">
    <i class="fa-solid fa-trash cart-remove" style="color: red;"></i>
    </div>`;
    
    function createItem(img, title, pricing){
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        var cartItems = document.getElementsByClassName("cart-content")[0];
        var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
        if(cartItemsNames.length > 0){
            for(var i = 0; i < cartItemsNames.length; i++){
                if(productTitle == cartItemsNames[i].innerText){
                    alert("Item has already been added");
                    return;
                }
            }
            cartShopBox.insertAdjacentHTML("beforeend", cartContentBox);
            cartContent.prepend(cartShopBox);
            // Keep item quantity positive
            var cartQuantity = cartShopBox.getElementsByClassName("cart-quantity")[0];
            cartQuantity.addEventListener("change", function(event){
                UpdateQuantityNumber(event);
            });
            // Remove item from cart
            var delItemBtn = cartShopBox.getElementsByClassName("cart-remove")[0];
            delItemBtn.addEventListener("click", function(event){
                const cartRemove = delItemBtn.parentNode.parentNode;
                cartRemove.remove();
            });
        }
        else{
            cartShopBox.insertAdjacentHTML("beforeend", cartContentBox);
            cartContent.prepend(cartShopBox);
            // Keep item quantity positive
            var cartQuantity = cartShopBox.getElementsByClassName("cart-quantity")[0];
            cartQuantity.addEventListener("change", function(event){
                UpdateQuantityNumber(event);
            });
            // Remove item from cart
            var delItemBtn = cartShopBox.getElementsByClassName("cart-remove")[0];
            delItemBtn.addEventListener("click", function(event){
                const cartRemove = delItemBtn.parentNode.parentNode;
                cartRemove.remove();
            });
        }
    }
    createItem(price, productImg, productTitle);
}
addCart.forEach(function(button){
    button.addEventListener("click", function(event){
        var addCartIcon = event.currentTarget;
        getItemInfo(addCartIcon);
    });
});

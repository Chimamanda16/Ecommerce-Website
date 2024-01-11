// Variables and constants
const addCart = document.querySelectorAll(".add-cart");
const cart = document.querySelector(".cart");
var cartContent = document.querySelector(".cart-content");
const cartIcon = document.querySelector("#cart-icon");
const closeCartBtn = document.querySelector(".close-cart");
const nav = document.querySelector(".nav");
const cartTotalPrice = document.querySelector(".total-price");

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

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

// Update Total
function updateTotal(){
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var totalPrice = 0;
    for(var i = 0; i<cartBoxes.length; i++){
        var priceTag = cartBoxes[i].getElementsByClassName("cart-price")[0].innerHTML;
        var cartBoxQuant = cartBoxes[i].getElementsByClassName("cart-quantity")[0].value;
        var cartBoxPrice = priceTag.match(/\d+/);
        price = Math.round((cartBoxQuant * cartBoxPrice)*100)/100;
        totalPrice += price;
        cartTotalPrice.innerHTML = "$" + totalPrice;
        localStorage.setItem("cartTotal", totalPrice);
    }
    if(cartBoxes.length == 0){
        cartTotalPrice.innerHTML = "$" + 0;
        localStorage.setItem("cartTotal", 0);
    }
}

// Keep item quantity positive
function UpdateQuantityNumber(cartQuant){
    if(cartQuant.target.value <= 0){
        cartQuant.target.value = 1;
    }
    updateTotal();
    updateBagNum();
}

// Add to cart function
addCart.forEach(function(button){
    button.addEventListener("click", function(event){
        var addCartIcon = event.currentTarget;
        getItemInfo(addCartIcon);
        updateTotal();
        saveCartItems();
        updateBagNum();
    });
});

function createItem(title, box){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    if(cartItemsNames.length > 0){
        var counter = 0;
        for(var i = 0; i < cartItemsNames.length; i++){
            if(title == cartItemsNames[i].innerText){
                alert("Item has already been added");
                return;
            }
            counter++;
        }
        if(counter == cartItemsNames.length){
            cartShopBox.insertAdjacentHTML("beforeend", box);
            cartContent.prepend(cartShopBox);
            // Keep item quantity positive
            var cartQuantity = cartShopBox.getElementsByClassName("cart-quantity")[0];
            cartQuantity.addEventListener("change", function(event){
                UpdateQuantityNumber(event);
                updateBagNum();
            });
            // Remove item from cart
            var delItemBtn = cartShopBox.getElementsByClassName("cart-remove")[0];
            delItemBtn.addEventListener("click", function(event){
                const cartRemove = delItemBtn.parentNode.parentNode;
                cartRemove.remove();
                updateTotal();
                updateBagNum();
            });
        }
        
    }
    else{
        cartShopBox.insertAdjacentHTML("beforeend", box);
        cartContent.prepend(cartShopBox);
        // Keep item quantity positive
        var cartQuantity = cartShopBox.getElementsByClassName("cart-quantity")[0];
        cartQuantity.addEventListener("change", function(event){
            UpdateQuantityNumber(event);
            updateBagNum();
        });
        // Remove item from cart
        var delItemBtn = cartShopBox.getElementsByClassName("cart-remove")[0];
        delItemBtn.addEventListener("click", function(event){
            const cartRemove = delItemBtn.parentNode.parentNode;
            cartRemove.remove();
            updateTotal();
            updateBagNum();
        });
    }
}

function getItemInfo(event){
        var parentElement = event.parentNode;
        var price = parentElement.getElementsByClassName("price")[0].innerText;
        var productImg = parentElement.getElementsByClassName("product-img")[0].src;
        var productTitle = parentElement.getElementsByClassName("product-title")[0].innerText;
        var cartContentBox = `<img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
        <div class="cart-product-title">${productTitle}</div>
        <div class="cart-price">${price}</div>
        <input type="number" name="inp" name="" value="1" class="cart-quantity">
        <i class="fa-solid fa-trash cart-remove" style="color: red;"></i>
        </div>`;
        createItem(productTitle, cartContentBox);
}

// Save Items when page is refreshed
function saveCartItems(){
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var cartItems = [];
    for(var i =0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var productPrice = cartBox.getElementsByClassName("cart-price")[0].innerText;
        var cartTitle = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
        var cartImg = cartBox.getElementsByClassName("cart-img")[0].src;
        var productQuantity = cartBox.getElementsByClassName("cart-quantity")[0].value;
        var item = {
            img: cartImg,
            price: productPrice,
            title: cartTitle,
            quantity: productQuantity
        }
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Keep Items when page is refreshed
function loadCartItems(){
    var cartItems = localStorage.getItem("cartItems");
    if(cartItems){
        cartItems = JSON.parse(cartItems);
        for(var i = 0; i<cartItems.length; i++){
            var item = cartItems[i];
            var productPrice = item.price;
            var cartTitle = item.title;
            var cartImg = item.img;
            var cartContentBox = `<img src="${cartImg}" alt="" class="cart-img">
                <div class="detail-box">
                <div class="cart-product-title">${cartTitle}</div>
                <div class="cart-price">${productPrice}</div>
                <input type="number" name="inp"${i} name="" value="1" class="cart-quantity">
                <i class="fa-solid fa-trash cart-remove" style="color: red;"></i>
                </div>`;
                createItem(cartTitle, cartContentBox);
                var cartBoxes = cartContent.getElementsByClassName("cart-box");
                var cartBox = cartBoxes[cartBoxes.length-1];
                var cartQuantity = cartBox.getElementsByClassName("cart-quantity")[0];
                cartQuantity.value = item.quantity;
        }
       
    }
    var cartTotal = localStorage.getItem("cartTotal");
    if (cartTotal) {
        cartTotalPrice.innerText = "$" + cartTotal;
    }
}
function ready() {
    loadCartItems();
}

// Update shopping bag icon number
function updateBagNum(){
    var bagNum = 0;
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var cartQuantity = cartBox.getElementsByClassName("cart-quantity")[0];
        bagNum += parseInt(cartQuantity.value, 10); 
        var bag = document.getElementById("cart-icon");
        bag.setAttribute("data-quantity", bagNum);
    }
}
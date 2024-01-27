const navCart = document.getElementById("nav-cart");
const cart = document.getElementById("cart");
const cartClose = document.getElementById("cart-close");

navCart.addEventListener( "click", e => {
    cart.classList.remove("display--none")
})

cartClose.addEventListener( "click", e => {
    cart.classList.add("display--none")
})


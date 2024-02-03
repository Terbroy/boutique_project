const cart = document.getElementById("cart");

function toggleCart() {
    cart.classList.toggle("display--none");
}
document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.id === "nav-cart" || clickedElement.id === "cart-close") {
        toggleCart();
    }
})
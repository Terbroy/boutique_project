const cart = document.getElementById("cart");
const product = JSON.parse(localStorage.getItem("products"));
const products = product.products;
console.log(products);

function toggleCart() {
  cart.classList.toggle("display--none");
}
function getCart() {
  let cart = localStorage.getItem("cart-products");
  if(cart && cart  != "undefined" ){
    return JSON.parse(cart);
  }else{
    localStorage.setItem("cart-products", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("cart-products"));
  }
}


document.addEventListener("DOMContentLoaded", e =>{
  addCart()
})
document.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.id === "nav-cart" || clickedElement.id === "cart-close") {
    toggleCart();
  }
});

//Logica para agregar o quitar productos
const container__items = document.querySelector(".container__items");


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("options__cart")) {
    addCart();
  }
});

function addCart() {
  let content = "";
  const cartProducts = getCart();
  cartProducts.map(e =>{
    content += `
              <div class="cart__item">
              <img src=${e.images[0]} alt="" class="item__image">
              <div class="item__info">
              <h4 class="item__title">${e.name}</h4>
              <p class="item__price"><span>${e.product_cart}</span> X <span>Rs.  ${e.price}</span></p>
              </div>
              <div class="item__delete-container">
              <img src="../src/images/delete.svg" alt="" class="item__delete">
              </div>
              </div>
          `;
  })
  container__items.innerHTML = content;
}

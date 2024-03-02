const cart = document.getElementById("cart");
const totalHtml = document.getElementById("cart_total");

function toggleCart() {
  cart.classList.toggle("display--none");
}

document.addEventListener("DOMContentLoaded", e =>{
  addCart()
})
function getCart() {
  let cart = localStorage.getItem("cart-products");
  if(cart && cart  != "undefined" ){
    return JSON.parse(cart);
  }else{
    localStorage.setItem("cart-products", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("cart-products"));
  }
}

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

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("options__cart")) {
    addCart();
  }
});
  }
});

function addCart() {
  let content = "";
  let total = 0;
  const cartProducts = getCart();
  cartProducts.map(e =>{
    content += `
              <div class="cart__item">
              <img src=${e.images[0]} alt="" class="item__image">
              <div class="item__info">
              <h4 class="item__title">${e.name}</h4>
              <p class="item__price"><span>${e.product_cart}</span> X <span>Rs.  ${e.price * e.product_cart}</span></p>
              </div>
              <div class="item__delete-container">
              <img src="../src/images/delete.svg" alt="" class="item__delete">
              </div>
              </div>
          `;
    total += e.price * e.product_cart;
  })
  totalHtml.textContent = total
  container__items.innerHTML = content;
  // Llamar a btnAddCart después de un par de segundos
  setTimeout(cargarCarrito, 1000);
}

//Redirección imágenes index a catálogo

const imagenesDestacadas = document.getElementsByClassName('collage__image');

for (let i = 0; i < imagenesDestacadas.length; i++) {
  imagenesDestacadas[i].addEventListener('click', function(){
    location.href = "/pages/catalog.html"
  });
  
}

//Funciones carrito
function cargarCarrito() {
  const botonCerrar = document.getElementsByClassName("item__delete");
  console.log(botonCerrar.length);

  for (let j = 0; j < botonCerrar.length; j++) {
  let boton = botonCerrar[j];
  boton.addEventListener("click", eliminarProducto);  
  }
  
}

function eliminarProducto (e) {
  let quitarElemento = e.target.parentNode.parentNode
  quitarElemento.remove();
  console.log(e.target.parentNode.parentNode);
}



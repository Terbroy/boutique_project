const containerCart = document.getElementById("container-cart");
const totalHtml = document.getElementById("cart_total");



document.addEventListener("DOMContentLoaded", e => {
  addCart();
})

function getCart() {
  const cart = localStorage.getItem("cart-products");
  return cart ? JSON.parse(cart) : [];
}

function toggleCart() {
  containerCart.classList.toggle("display--none");
  addCart();
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
    addCart();
  }
});

function addCart() {
  let content = "";
  let total = 0;
  const cart = getCart();
  for (let i = 0; i < cart.length; i++) {
    if(cart[i].imagenes){

      content += `
                <div class="cart__item">
                <img src=${cart[i].imagenes[0].url} class="item__image">
                <div class="item__info">
                <h4 class="item__title">${cart[i].nombre}</h4>
                <p class="item__price"><span>${cart[i].product_cart}</span> X <span>Rs.  ${(cart[i].precio * cart[i].product_cart).toLocaleString()}</span></p>
                </div>
                <div class="item__delete-container">
                <img src="../src/images/delete.svg"  class="item__delete">
                </div>
                </div>
            `;
      total += cart[i].precio * cart[i].product_cart;
    }
  }
  totalHtml.textContent = total.toLocaleString();
  container__items.innerHTML = content;
  const botonCerrar = document.getElementsByClassName("item__delete");
  for (let i = 0; i < botonCerrar.length; i++) {
    let boton = botonCerrar[i];
    boton.addEventListener("click", e => {
      eliminarProducto(i);
    });
  }
}

//Redirección imágenes index a catálogo

const imagenesDestacadas = document.getElementsByClassName("collage__image");

for (let i = 0; i < imagenesDestacadas.length; i++) {
  imagenesDestacadas[i].addEventListener("click", function () {
    location.href = "/pages/catalog.html";
  });
}

//Funciones carrito

  


function eliminarProducto(e) {
  const cart = getCart();
  console.log(e);
  cart.splice(e, 1);
  localStorage.setItem("cart-products", JSON.stringify(cart));
  addCart();
}


const checkout = document.getElementById("cart__checkout");
checkout.addEventListener("click",e=> openWhatsapp())

function openWhatsapp() {
  const cart = getCart();

let message = "Hola!, estoy interesado en los siguientes productos \n";

for (const product of cart) {
  message += `${product.nombre} - Unidades: ${product.product_cart}\n`;
}

message += `${totalHtml.textContent}`

const encodedMessage = encodeURIComponent(message);

const whatsappNumber = "+573122413432";

const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

window.open(url, "_blank");

}
const containerCart = document.getElementById("container-cart");
const totalHtml = document.getElementById("cart_total");
const cart = JSON.parse(localStorage.getItem("cart-products"));


function toggleCart() {
  containerCart.classList.toggle("display--none");
}

document.addEventListener("DOMContentLoaded", (e) => {
  addCart();
});

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
  for (let i = 0; i < cart.length; i++) {
    content += `
              <div class="cart__item">
              <img src=${cart[i].images} class="item__image">
              <div class="item__info">
              <h4 class="item__title">${cart[i].name}</h4>
              <p class="item__price"><span>${cart[i].product_cart}</span> X <span>Rs.  ${cart[i].price * cart[i].product_cart}</span></p>
              </div>
              <div class="item__delete-container">
              <img src="../src/images/delete.svg" class="item__delete">
              </div>
              </div>
          `;
    
  }
  console.log(cart);
  total += cart[0].price * cart[0].product_cart;
  totalHtml.textContent = total;
  container__items.innerHTML = content;
  // Llamar a btnAddCart después de un par de segundos
  setTimeout(cargarCarrito, 500);
}
// function addCart() {
//   let content = "";
//   let total = 0;
//   cart.map((e) => {
//     console.log(cart);

//     content += `
//               <div class="cart__item">
//               <img src=${e.images[0]} class="item__image">
//               <div class="item__info">
//               <h4 class="item__title">${e.name}</h4>
//               <p class="item__price"><span>${e.product_cart}</span> X <span>Rs.  ${e.price * e.product_cart}</span></p>
//               </div>
//               <div class="item__delete-container">
//               <img src="../src/images/delete.svg" class="item__delete">
//               </div>
//               </div>
//           `;
//     total += e.price * e.product_cart;
//   });
//   totalHtml.textContent = total;
//   container__items.innerHTML = content;
//   // Llamar a btnAddCart después de un par de segundos
//   setTimeout(cargarCarrito, 500);
// }

//Redirección imágenes index a catálogo

const imagenesDestacadas = document.getElementsByClassName("collage__image");

for (let i = 0; i < imagenesDestacadas.length; i++) {
  imagenesDestacadas[i].addEventListener("click", function () {
    location.href = "/pages/catalog.html";
  });
}


//Funciones carrito

function cargarCarrito() {
  let botonCerrar = document.getElementsByClassName("item__delete");

  for (let j = 0; j < botonCerrar.length; j++) {
    let boton = botonCerrar[j];
    boton.addEventListener("click", function() {
      eliminarProducto(j);
    });
  }
}

function eliminarProducto(e) {
  cart.splice(e, 1);
  localStorage.setItem("cart-products", JSON.stringify(cart));
  addCart();
  console.log(cart);

}
const cart = document.getElementById("cart");
function fetchProduct() {
  let product = JSON.parse(localStorage.getItem("selected-product"))[0];
  return product;
}

function toggleCart() {
  cart.classList.toggle("display--none");
}
document.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.id === "nav-cart" || clickedElement.id === "cart-close") {
    toggleCart();
  }
});

//Logica para agregar o quitar productos
const container__items = document.querySelector(".container__items");
const productSelected= fetchProduct();
document.addEventListener("click" , e =>{
  if(e.target.classList.contains("options__cart")){
    addCart();
  }
})
function addCart() {
  console.log("Si se activa la funcion");
  let cart = "";
  cart += `<div class="container__items">
        <div class="cart__item">
        <img src="../src/images/item-card.jpg" alt="" class="item__image" />
        <div class="item__info">
        <h4 class="item__title">Asgaard sofa</h4>
        <p class="item__price"><span>1</span> X <span>Rs. 250,000,00 </span></p>
        </div>
        <div class="item__delete-container">
        <!-- Nuevo contenedor para el botón de eliminar -->
        <img src="../src/images/delete.svg" alt="" class="item__delete" />
        </div>
        </div>`;
  container__items.innerHTML += cart;
}


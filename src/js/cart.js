const navCart = document.getElementById("nav-cart");
const cart = document.getElementById("cart");
const cartClose = document.getElementById("cart-close");

navCart.addEventListener("click", (e) => {
  cart.classList.remove("display--none");
});

cartClose.addEventListener("click", (e) => {
  cart.classList.add("display--none");
});

//Logica para agregar o quitar productos
const btnAddCart = document.getElementsByClassName("options__cart");
const container__items = document.querySelector(".container__items");

for (let i = 0; i < btnAddCart.length; i++) {
  contador= 0;
  btnAddCart[i].addEventListener('click', function(){
    contador+=1;
    console.log(contador);
    addCart();
})
}

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
    </div>`
  container__items.innerHTML += cart;
}
btnAddCart.onclick = function () {
  addCart();
};

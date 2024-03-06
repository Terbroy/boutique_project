/**ESTO DEBERIA IR EN EN CART.JS */

const cartHtml = document.getElementById("container-cart");

function toggleCart() {
  cartHtml.classList.toggle("display--none");
}

/******************************** */
document.addEventListener("DOMContentLoaded", e =>{
    displayProductsInCatalog();
    const button = document.querySelector('#button__search');
  button.addEventListener('click', () => {
    button.classList.add('active')});
});

async function fetchProductData() {
    try {
        const response = await axios.get("https://binary-best-boutique.up.railway.app/api/v1/productos");
        return response.data;
    } catch (error) {
        console.log("Error fetching data:", error);
        return null;
    }
}

function getCart() {
    const cart = localStorage.getItem("cart-products");
    return cart ? JSON.parse(cart) : [];
}
function fetchProductsCart(product) {
    let cart = getCart();
    const existingProduct = cart.find(e => e.id_productos === product.id_productos);
    if (existingProduct) {
            existingProduct.product_cart++;
    } else {
        product.product_cart = 1;
        cart.push(product);
    }
    localStorage.setItem("cart-products", JSON.stringify(cart));
    toggleCart();

}
async function displayProductsInCatalog(){
    const padreProductos = document.getElementById("padreProductos");
    const products = await fetchProductData();
    products.map(product => {
        let card = document.createElement("div")
        card.classList.add("product--cart")
        card.innerHTML = `
        <div id=${product.id_productos} class="product--card">
            <div class="img__options">
                <img class="product__img" src=${product.imagenes[0].url}>
                <div class="product__options">
                    <button  id="btn-${product.id_productos}" class="options__cart">Añadir al carrito</button>
                </div>
            </div>
            <div class="product__text">
                <a href="../../pages/product.html?id=${product.id_productos}" id="product-title-${product.id_productos}" class="product__title">
                    <p class="product__title">${product.nombre}</p>
                </a>
                <p class="product__description">${product.descripcion}</p>
                <p class="product__price">$${product.precio.toLocaleString()}</p>
            </div>
        </div>
        `
    padreProductos.appendChild(card);

    const title = document.getElementById(`product-title-${product.id_productos}`);
    const buttonProduct = document.getElementById(`btn-${product.id_productos}`);

    buttonProduct.addEventListener("click",(event)=>{
        fetchProductsCart(product);
    } );
    })
    filterProduct("Todos");
}

//CATEGORY - FILTER
function filterProduct(value) {
  let buttons = document.querySelectorAll(".list__filter");
  buttons.forEach((button) => {
    if (value == button.innerText) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  const products = document.querySelectorAll(".product--cart");
  products.forEach((product) => {
    if (value === "Todos" || product.querySelector(".product__category").innerText.includes(value)) {
      product.classList.remove("hide");
    } else {
      product.classList.add("hide");
    }
  });
}

function searchProduct(value){
  let buttonSearch = document.querySelector("#button__search");
  let searchInput = document.getElementById("search__input").value.toLowerCase();
  const products = document.querySelectorAll(".product--cart");
  buttonSearch.forEach((searchButton)=>{
    if (value == button.innerText) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  products.forEach((product) => {
    if (product.innerText.toLowerCase().includes(searchInput)) {
      product.classList.remove("hide");
    } else {
      product.classList.add("hide");
    }
  });

}
//SEARCH
  //   document.getElementById("button__search").addEventListener("click", () => {
  //   let searchInput = document.getElementById("search__input").value.toLowerCase();
  //   const products = document.querySelectorAll(".product--cart");
  
  //   products.forEach((product) => {
  //     if (product.innerText.toLowerCase().includes(searchInput)) {
  //       product.classList.remove("hide");
  //     } else {
  //       product.classList.add("hide");
  //     }
  //   });
  // });
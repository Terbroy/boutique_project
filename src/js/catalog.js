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
                <p class="product__description">${product.descripcion}</p> <p class="product__category--cat">${product.categorias}</p>
                <p class="product__info--cat">${product.informacion}</p>
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
    if (value === "Todos" || product.querySelector(".product__category--cat").innerText.includes(value)) {
      product.classList.remove("hide");
    } else {
      product.classList.add("hide");
    }
  });
}

//SEARCH
document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.getElementById("search__input");
  const button = document.getElementById("button__search");

  button.addEventListener("click", () => {
    event.preventDefault();
    const searchValue = searchInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const products = document.querySelectorAll(".product--cart");

    products.forEach((product) => {
      const productText = product.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const infoCat = product.querySelector(".product__info--cat").innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (productText.includes(searchValue) || infoCat.includes(searchValue)) {
        product.classList.remove("hide");
      } else {
        product.classList.add("hide");
      }
    });
  });
});

//PRICE-ORDER
  const button = document.querySelector('#button__search');
  const select = document.querySelector('.order');
  select.addEventListener('change', () => {
      const sortBy = select.value;
      const products = Array.from(document.querySelectorAll('.product--cart'));
      if (sortBy === 'priceasc') {
          products.sort((a, b) => {
              const priceA = parseFloat(a.querySelector('.product__price').textContent.replace('$', ''));
              const priceB = parseFloat(b.querySelector('.product__price').textContent.replace('$', ''));
              return priceA - priceB;
          });
      } else if (sortBy === 'pricedesc') {
          products.sort((a, b) => {
              const priceA = parseFloat(a.querySelector('.product__price').textContent.replace('$', ''));
              const priceB = parseFloat(b.querySelector('.product__price').textContent.replace('$', ''));
              return priceB - priceA;
          });
      }
      const padreProductos = document.getElementById("padreProductos");
      padreProductos.innerHTML = '';
      products.forEach(product => {
          padreProductos.appendChild(product);
      });
  });
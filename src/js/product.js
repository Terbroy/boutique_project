let urlParams = new URLSearchParams(window.location.search);
var productoId = urlParams.get('id');

const cartHtml = document.getElementById("container-cart");

function toggleCart() {
  cartHtml.classList.toggle("display--none");
}

async function fetchProduct() {
  try {
    const response = await axios.get(`https://binary-best-boutique.up.railway.app/api/v1/productos/${productoId}`);
    return response.data;
  } catch (error) {
      console.log("Error fetching data:", error);
      return null;
  }
}

async function fetchProducts() {
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


function filterProducts(product) {
  let products = JSON.parse(localStorage.getItem("products")).products;
  let filter = products.filter((e) => e.category === product.category);
  return filter;
}

function addProduct() {
  const btnAdd = document.querySelector(".info__add");
  btnAdd.addEventListener("click", function () {
    let producto = fetchProduct();
    let ensayo = getCart();
    ensayo = ensayo.concat(producto);
    localStorage.setItem("cart-products", JSON.stringify(ensayo));
    console.log(ensayo);
    console.log(producto);
  });

}
setTimeout(addProduct, 1000);
document.addEventListener("DOMContentLoaded", async (event) => {
  let product = await fetchProduct();
  let filterProduct = filterProducts(product);
  const relatedContainer = document.getElementById("related-product");
  const container = document.getElementById("container-product");
  let productHTML = document.createElement("section");
  const description = document.getElementById("details");
  const child = document.getElementById("hr-product");

  document.title = product.name;
  productHTML.classList.add("product");
  description.textContent = product.description;
  productHTML.innerHTML = `
    <div class="product__carrousel">
            <img src=${product.imagenes[0].url} alt="" class="carrousel__card">
            <img src=${product.imagenes[1].url} alt="" class="carrousel__card">
            <img src=${product.imagenes[2].url} alt="" class="carrousel__card">
            <img src=${product.imagenes[3].url} alt="" class="carrousel__card">
            <img src=${product.imagenes[0].url} alt="" class="carrousel__card carrousel__card--image">
            </div>
            <div class="product__info">
            <h1 class="info__title">${product.nombre}</h1>
            <span class="info__price">$ ${product.precio}</span>
            <p class="info__text">${product.informacion}</p>
            <div class="info__buttons">
            <button class="info__count">
            <span class="plus">-</span>
            1
            <span class="minus">+</span>
            </button>
            <button class="info__add">Añadir al carrito</button>
            </div>
            </div>
            `;
  filterProduct.map((product) => {
    let relatedProduct = document.createElement("div");
    relatedProduct.classList.add("product--card");

    relatedProduct.innerHTML = `
        <div id=${product.id} class="product--card">
            <div class="img__options">
                <img class="product__img" src=${product.images[0]}>
                <div class="product__options">
                    <button id="btn-${product.id}" class="options__cart">Añadir al carrito</button>
                </div>
            </div>
            <div class="product__text">
                <a href="../../pages/product.html" id="product-title-${product.id}" class="product__title">
                    <p class="product__title">${product.name}</p>
                </a>
                <p class="product__description">${product.description}</p>
                <p class="product__price">${product.price}</p>
            </div>
        </div>
        `;
    relatedContainer.appendChild(relatedProduct);
    const title = document.getElementById(`product-title-${product.id}`);
    const buttonProduct = document.getElementById(`btn-${product.id}`);

    title.addEventListener("click", () => {
      fetchProduct(product.id);
    });
    buttonProduct.addEventListener("click", () => {
      toggleCart();
      fetchProductsCart(product);
    });
  });
  container.insertBefore(productHTML, child);
});

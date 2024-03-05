let urlParams = new URLSearchParams(window.location.search);
var productoId = urlParams.get('id');

const cartHtml = document.getElementById("container-cart");

function toggleCart() {
  cartHtml.classList.toggle("display--none");
}

async function fetchProductPage() {
  try {
    const response = await axios.get(`https://binary-best-boutique.up.railway.app/api/v1/productos/${productoId}`);
    console.log(response);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    return null;
  }
}

function fetchProducts() {
  // let products = JSON.parse(localStorage.getItem("products")).products;
  return products;
}

function fetchProduct(id) {
  let products = fetchProducts();
  let selectedProduct = products.filter((e) => e.id == id);
  let selected = selectedProduct[0];
  localStorage.setItem("selected-product", JSON.stringify(selected));
  return selected;
}


function fetchProduct(id) {
  let products = fetchProducts();
  let selectedProduct = products.filter((e) => e.id == id);
  let selected = selectedProduct[0];
  localStorage.setItem("selected-product", JSON.stringify(selected));
  return selected;
}

function getCart() {
  const cart = localStorage.getItem("cart-products");
  return cart ? JSON.parse(cart) : [];
}

function fetchProductsCart(product) {
  let cart = getCart();

  const existingProduct = cart.find((e) => e.id === product.id);

  if (existingProduct) {
    if (existingProduct.stock === existingProduct.product_cart) {
      alert("no se pueden agregar mas al carrito");
    } else {
      existingProduct.product_cart++;
    }
  } else {
    product.product_cart = 1;
    cart.push(product);
  }
  localStorage.setItem("cart-products", JSON.stringify(cart));
  toggleCart();
}

// function fetchProductsCart(product) {
//   let cart = getCart();
//   const existingProduct = cart.find(e => e.id_productos === product.id_productos);
//   if (existingProduct) {
//           existingProduct.product_cart++;
//   } else {
//       product.product_cart = 1;
//       cart.push(product);
//   }
//   localStorage.setItem("cart-products", JSON.stringify(cart));
//   toggleCart();

// }

function filterProducts(product) {
  let products = JSON.parse(localStorage.getItem("products")).products;
  let filter = products.filter((e) => e.category === product.category);
  return filter;
}

function addProduct() {
  const btnAdd = document.querySelector(".info__add");
  btnAdd.addEventListener("click", function () {
    let producto = fetchProductPage();
    let ensayo = getCart();
    ensayo = ensayo.concat(producto);
    localStorage.setItem("cart-products", JSON.stringify(ensayo));
    console.log(ensayo);
    console.log(producto);
  });
}
setTimeout(addProduct, 1000);
document.addEventListener("DOMContentLoaded", async (event) => {
  let product = await fetchProductPage();
  let filterProduct = filterProducts(product);
  const relatedContainer = document.getElementById("related-product");
  const container = document.getElementById("container-product");
  let productHTML = document.createElement("section");
  const description = document.getElementById("details");
  const child = document.getElementById("hr-product");

  document.title = product.nombre;
  productHTML.classList.add("product");
  description.textContent = product.description;
  productHTML.innerHTML = `
    <div class="product__carrousel">
            <img src=${product.imagenes[0].url} alt="" class="carrousel__card">
            <img src=${product.imagenes[1].url} alt="" class="carrousel__card">
            <img src=${product.imagenes[2].url} alt="" class="carrousel__card">
            <img src=${product.imagenes[3].url} alt="" class="carrousel__card">
            <img src=${product.imagenes[0].url} alt="" class="carrousel__card carrousel__card--image">
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
            <h1 class="info__title">${product.nombre}</h1>
            <span class="info__price">$ ${product.precio}</span>
            <p class="info__text">${product.informacion}</p>
            <div class="info__buttons">
            <div class="info__count">
                <button class="minus">-</button>
                <input class="product-cant-cart" type="text" value="1" disabled>
                <button class="plus">+</button>
            </div>
            <button class="info__add">Añadir al carrito</button>
            </div>
            </div>
            `;
  filterProduct.map((product) => {
    let relatedProduct = document.createElement("div");
    relatedProduct.classList.add("product--card");

    relatedProduct.innerHTML = `
        <div id=${product.id_productos} class="product--card">
            <div class="img__options">
                <img class="product__img" src=${product.imagenes[0].url}>
                <div class="product__options">
                    <button id="btn-${product.id_productos}" class="options__cart">Añadir al carrito</button>
                </div>
            </div>
            <div class="product__text">
                <a href="../../pages/product.html?id=${product.id_productos}" id="product-title-${product.id_productos}" class="product__title">
                    <p class="product__title">${product.nombre}</p>
                </a>
                <p class="product__description">${product.descripcion}</p>
                <p class="product__price">${product.precio}</p>
            </div>
        </div>
        `;
    relatedContainer.appendChild(relatedProduct);
    const title = document.getElementById(`product-title-${product.id_productos}`);
    const buttonProduct = document.getElementById(`btn-${product.id_productos}`);

    title.addEventListener("click", () => {
      fetchProduct(product.id_productos);
    });
    buttonProduct.addEventListener("click", () => {
      toggleCart();
      fetchProductsCart(product);
    });
  });
  container.insertBefore(productHTML, child);
  setTimeout(agregarEventos, 500);
});

function agregarEventos() {
  //Capturamos el input desde el HTML
  let valor = document.getElementsByClassName("product-cant-cart")[0].value;
  let cantidad = Number(valor);

  //Capturamos el botón mas desde el HTML y le agregamos un evento listener
  const botonMas = document.getElementsByClassName("plus")[0];
  botonMas.addEventListener("click", function () {
    sumar(cantidad);
  });

  //Capturamos el botón menos desde el HTML y le agregamos un evento listener
  const botonMenos = document.getElementsByClassName("minus")[0];
  botonMenos.addEventListener("click", function () {
    restar(cantidad);
  });
}

function sumar(cantidad) {
  cantidad++;
  document.getElementsByClassName("product-cant-cart")[0].value = cantidad;
  agregarEventos();
}

function restar(cantidad) {
    cantidad--;
    document.getElementsByClassName("product-cant-cart")[0].value = cantidad;
    agregarEventos();
}

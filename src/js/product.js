let urlParams = new URLSearchParams(window.location.search);
var productoId = urlParams.get('id');

const cartHtml = document.getElementById("container-cart");



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

function fetchProductsCart(product, count) {
  let cart = getCart();
  const existingProduct = cart.find(e => e.id_productos === product.id_productos);
  if (existingProduct) {
      existingProduct.product_cart = count ? count : existingProduct.product_cart++;
  } else {
    product.product_cart = count ? count : 1;
      cart.push(product);
  }
  localStorage.setItem("cart-products", JSON.stringify(cart));
  toggleCart();
}




async function filterProducts(product) {
  let products = await fetchProducts();
  let filter = products.filter((e) => e.categoria === product.categoria);
  return filter;
}

async function addProduct() {
    let producto = await fetchProduct();
    const btnValue = document.getElementById("product-cant-cart");
    let valor = Number(btnValue.textContent);
    fetchProductsCart(producto, valor);


}


document.addEventListener("DOMContentLoaded", async (event) => {
  let product = await fetchProduct();
  let filterProduct = await filterProducts(product);
  const relatedContainer = document.getElementById("related-product");
  const container = document.getElementById("container-product");
  let productHTML = document.createElement("section");
  const description = document.getElementById("details");
  const child = document.getElementById("hr-product");

  document.title = product.nombre;
  productHTML.classList.add("product");
  description.textContent = product.descripcion;
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
            <span class="plus" onclick=restar()>-</span>
            <span id="product-cant-cart"> 1 </span>
            <span class="minus" onclick=sumar()>+</span>
            </button>
            <button class="info__add" onclick=addProduct()>Añadir al carrito</button>
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
});

// aca va la logica de la calificacion del producto
const stars = document.querySelectorAll('.star');
const output = document.getElementById('rating-output');
const avgOutput = document.getElementById('avg-rating');

let userRating = 0;
let totalRatings = [];

// Event listener para cada estrella
stars.forEach(star => {
    star.addEventListener('click', function() {
        userRating = parseInt(this.getAttribute('data-value'));
        output.textContent = `Has calificado con ${userRating} estrellas`;
        highlightStars(userRating);
        totalRatings.push(userRating);
        calculateAverageRating(totalRatings);
    });
});

// Función para resaltar estrellas seleccionadas
function highlightStars(num) {
    stars.forEach((star, index) => {
        if (index < num) {
            star.style.color = 'gold';
        } else {
            star.style.color = '#aa9479';
        }
    });
}

// Calcular calificación promedio y mostrar como barras de estrellas
function calculateAverageRating(ratings) {
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    const avg = total / ratings.length;
    const roundedAvg = Math.round(avg);
    const remainingStars = 5 - roundedAvg;
    avgOutput.innerHTML = `Calificación promedio: <span class="avg-star">${'★'.repeat(roundedAvg)}</span>${'☆'.repeat(remainingStars)}`;
}




function sumar() {
  const btnValue = document.getElementById("product-cant-cart");
  let valor = Number(btnValue.textContent);
  if(valor >= 1){
    valor++;
  }
  btnValue.textContent = valor;
  
}

function restar(cantidad) {
    cantidad--;
    document.getElementsByClassName("product-cant-cart")[0].value = cantidad;
    agregarEventos();
}




function sumar() {
  const btnValue = document.getElementById("product-cant-cart");
  let valor = Number(btnValue.textContent);
  if(valor >= 1){
    valor++;
  }
  btnValue.textContent = valor;
  
}

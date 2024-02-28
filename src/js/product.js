const cartHtml = document.getElementById("cart");

function toggleCart() {
  cartHtml.classList.toggle("display--none");
}


function fetchProductPage() {
    let product = JSON.parse(localStorage.getItem("selected-product"))[0];
    return product;
}

function fetchProducts() {
    let products = JSON.parse(localStorage.getItem("products")).products;
    return products;
}

function fetchProduct(id){
    let products = fetchProducts();
    let selectedProduct = products.filter(e => e.id == id);
    localStorage.setItem("selected-product", JSON.stringify(selectedProduct));
    return selectedProduct
}

function getCart() {
    const cart = localStorage.getItem("cart-products");
    return cart ? JSON.parse(cart) : [];
}

function fetchProductsCart(id) {
    const product = fetchProduct(id)[0];
    let cart = getCart();

    const existingProduct = cart.find(e => e.id === product.id);

    if (existingProduct) {
        if(existingProduct.stock === existingProduct.product_cart ){
            alert("no se pueden agregar mas al carrito")
            
        }else{
            existingProduct.product_cart++;
        }
    } else {
        product.product_cart = 1;
        cart.push(product);
    }

    localStorage.setItem("cart-products", JSON.stringify(cart));
    toggleCart();
}


function filterProducts(product){
    let products = JSON.parse(localStorage.getItem("products")).products;
    let filter = products.filter(e=> e.category === product.category)
    return filter
}

document.addEventListener("DOMContentLoaded", (event) => {
    let product = fetchProductPage();
    let filterProduct = filterProducts(product);
    const relatedContainer = document.getElementById("related-product")
    const container = document.getElementById("container-product");
    let productHTML = document.createElement("section");
    const description = document.getElementById("details");
    const child = document.getElementById("hr-product");
    
    
    document.title = product.name
    productHTML.classList.add("product")
    description.textContent = product.description;
    console.log(product);
    productHTML.innerHTML = `
    <div class="product__carrousel">
            <img src=${product.images[0]} alt="" class="carrousel__card">
            <img src=${product.images[1]} alt="" class="carrousel__card">
            <img src=${product.images[2]} alt="" class="carrousel__card">
            <img src=${product.images[3]} alt="" class="carrousel__card">
            <img src=${product.images[0]} alt="" class="carrousel__card carrousel__card--image">
            </div>
            <div class="product__info">
            <h1 class="info__title">${product.name}</h1>
            <span class="info__price">$ ${product.price}</span>
            <p class="info__text">${product.main_info}</p>
            <div class="info__buttons">
            <button class="info__count">
            <span class="plus">-</span>
            1
            <span class="minus">+</span>
            </button>
            <button class="info__add">Añadir al carrito</button>
            </div>
            </div>
            `
    filterProduct.map(product => {
        let relatedProduct = document.createElement("div");
        relatedProduct.classList.add("product--card")

        relatedProduct.innerHTML=`
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
        `
        relatedContainer.appendChild(relatedProduct);
        const title = document.getElementById(`product-title-${product.id}`);
        const buttonProduct = document.getElementById(`btn-${product.id}`);

        title.addEventListener("click",(event)=>{

            fetchProduct(product.id);
        } );
        buttonProduct.addEventListener("click",(event)=>{
            toggleCart();
            fetchProductsCart(product.id);
        } );
    })

    container.insertBefore(productHTML, child);


});


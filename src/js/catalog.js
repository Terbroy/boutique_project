const cartHtml = document.getElementById("container-cart");

function toggleCart() {
  cartHtml.classList.toggle("display--none");
}

document.addEventListener("DOMContentLoaded", e =>{
    fetchProductData();
})

async function fetchProductData() {
    await fetch("http://127.0.0.1:5500/src/JSON/product.json")
        .then(res => res.json())
        .then(data=> localStorage.setItem("products", JSON.stringify(data)))
        .catch(error => console.log(error));
    
    displayProductsInCatalog();
};

function fetchProducts() {
    let products = JSON.parse(localStorage.getItem("products")).products;
    return products;
}


function fetchProduct(id){
    let products = fetchProducts();
    let selectedProduct = products.filter(e => e.id == id);
    localStorage.setItem("selected-product", JSON.stringify(selectedProduct));
    return selectedProduct;
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

function displayProductsInCatalog(){
    const padreProductos = document.getElementById("padreProductos");
    const products = fetchProducts();
    products.map(product => {
        let card = document.createElement("div")
        card.classList.add("product--cart")
        card.innerHTML = `
        <div id=${product.id} class="product--card">
            <div class="img__options">
                <img class="product__img" src=${product.images}>
                <div class="product__options">
                    <button  id="btn-${product.id}" class="options__cart">Añadir al carrito</button>
                </div>
            </div>
            <div class="product__text">
                <a href="../../pages/product.html" id="product-title-${product.id}" class="product__title">
                    <p class="product__title">${product.name}</p>
                </a>
                <p class="product__description">${product.description}</p>
                <p class="product__price">$${product.price.toLocaleString()}</p>
            </div>
        </div>
        `
    padreProductos.appendChild(card);

    const title = document.getElementById(`product-title-${product.id}`);
    const buttonProduct = document.getElementById(`btn-${product.id}`);


    title.addEventListener("click",(event)=>{

        fetchProduct(product.id);
    } );
    buttonProduct.addEventListener("click",(event)=>{
        fetchProductsCart(product.id);
    } );
    })

}






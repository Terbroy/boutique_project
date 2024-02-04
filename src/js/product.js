function fetchProduct() {
    let product = JSON.parse(localStorage.getItem("selected-product"))[0];
    return product;
}

function filterProducts(product){
    let products = JSON.parse(localStorage.getItem("products")).products;
    let filter = products.filter(e=> e.category === product.category)
    return filter
}

document.addEventListener("DOMContentLoaded", (event) => {
    let product = fetchProduct();
    let filterProduct = filterProducts(product);
    const relatedContainer = document.getElementById("related-product")
    const container = document.getElementById("container-product");
    let productHTML = document.createElement("section");
    const description = document.getElementById("details");
    const child = document.getElementById("hr-product");
    
    
    document.title = product.name
    productHTML.classList.add("product")
    description.textContent = product.description;
    
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
                    <img class="product__img" src=${product.images}>
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
        title.addEventListener("click",(event)=>{
            let selectedProduct = filterProduct.filter(e => e.id == product.id);
            localStorage.setItem("selected-product", JSON.stringify(selectedProduct));
        } );
    })

    container.insertBefore(productHTML, child);


});



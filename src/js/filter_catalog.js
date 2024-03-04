let productDiv=document.querySelector(".catalog__product")
let displayProducts=async()=>{
    productDiv.innerHTML='';
    let product=fetch("http://127.0.0.1:5500/src/JSON/product.json");
    // let product=await fetch("https://binary-best-boutique.up.railway.app/api/v1/productos");
    let finalProduct=await product.json();
        finalProduct.forEach(element => {
            productDiv.innerHTML=`<div id=${element.id} class="product--card">
            <div class="img__options">
                <img class="product__img" src=${element.images}>
                <div class="product__options">
                    <button  id="btn-${element.id}" class="options__cart">Añadir al carrito</button>
                </div>
            </div>
            <div class="product__text">
                <a href="../../pages/product.html" id="product-title-${product.id}" class="product__title">
                    <p class="product__title">${element.name}</p>
                </a>
                <p class="product__description">${element.description}</p>
                <p class="product__price">$${element.price}</p>
            </div>
        </div>
        `
        });
    
}
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});
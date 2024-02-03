async function capturarProductosJson() {
    await fetch("http://127.0.0.1:5500/src/JSON/product.json")
        .then(res => res.json())
        .then(data => localStorage.setItem("products", JSON.stringify(data)) )
        .catch(error => console.log(error));
};

function traerProductos(){
    let products = JSON.parse(localStorage.getItem("products")).products;
    return products
};

function mostrarProductosEnCatalaogo(){
    const padreProductos = document.getElementById("padreProductos");
    const products = traerProductos();
    products.map(product => {
        let hijo = document.createElement("div")
        hijo.classList.add("product--cart")
        hijo.innerHTML = `
        <div class="product--card">
            <div class="img__options">
                <img class="product__img" src=${product.images}>
                <div class="product__options">
                    <button class="options__cart">Añadir al carrito</button>
                </div>
            </div>
            <div class="product__text">
                <a href="../../pages/product.html" class="product__title">
                    <p class="product__title">${product.name}</p>
                </a>
                <p class="product__description">${product.description}</p>
                <p class="product__price">${product.price}</p>
            </div>
        </div>
        `
    padreProductos.appendChild(hijo);
    })
}



capturarProductosJson();
mostrarProductosEnCatalaogo();



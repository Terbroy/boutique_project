const h1 = document.getElementById("ejemplo");

async function traerInfromacion() {
    await fetch("http://127.0.0.1:5500/src/JSON/product.json")
        .then(res => res.json())
        .then(data => localStorage.setItem("products", JSON.stringify(data)) )
        .catch(error => console.log(error));
}


function mostrarProductosEnCatalaogo(){
    const padreProductos = document.getElementById("padreProductos");
    let products = JSON.parse(localStorage.getItem("products"));
    console.log(products);

    // infoJson[0].map(product => {
    //     let hijo = document.createElement("div")
    //     hijo.classList.add("product")
    //     hijo.innerHTML = `
    //     <div class="img__options">
    //     <div class="product__options">
    //     <button class="options__cart">Añadir al carrito</button>
    //     <button class="options__share"><img src="../src/images/share.svg">Compartir</button>
    //     </div>
    //     <img class="product__img" src="${product.images[0]}">
    //     </div>
    //     <div class="product__text">
    //     <p class="product__title">${product.name}s</p>
    //     <p class="product__description">${product.description}</p>
    //     <p class="product__price">${product.price}</p>
    //     </div>
    //     `
    // padreProductos.appendChild(hijo);
    // })
}


// h1.textContent= infoJson[0].name
// console.log(infoJson, h1);

traerInfromacion();
mostrarProductosEnCatalaogo();



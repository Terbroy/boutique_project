let infoJson = []; //[{producto1}, {producto2},.....]
const h1 = document.getElementById("ejemplo");

async function traerInfromacion(){
    await fetch("http://127.0.0.1:5500/boutique_project/src/JSON/product.json")
        .then(res => res.json())
        .then(data=> infoJson.push(data.products))
        .catch(error => console.log(error));
}

async function mostrarProductosEnCatalaogo(){
    await traerInfromacion();
    const padreProductos = document.getElementById("padreProductos")
    infoJson[0].map(product => {
        let hijo = document.createElement("div")
        hijo.classList.add("product")
        hijo.innerHTML = `
        <div class="img__options">
        <div class="product__options">
        <button class="options__cart">AÃ±adir al carrito</button>
            <button class="options__share"><img src="../src/images/share.svg">Compartir</button>
            </div>
            <img class="product__img" src="${product.images[0]}">
            </div>
            <div class="product__text">
            <p class="product__title">${product.name}</p>
            <p class="product__description">${product.description}</p>
            <p class="product__price">${product.price}</p>
            </div>
            `
            console.log(product.images);
            padreProductos.appendChild(hijo);
        })
    console.log(padreProductos, infoJson);
}


// h1.textContent= infoJson[0].name
// console.log(infoJson, h1);


mostrarProductosEnCatalaogo();


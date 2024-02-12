const searchInput = document.getElementById('search__input');
const searchButton = document.getElementById('button__search');
const searchResults = document.getElementById('search__results');

fetch('http://127.0.0.1:5500/boutique_project/src/JSON/product.json')
.then(response => response.json())
console.log(products)
.then(data => {
  const products = data;

  function searchProducts(input, products) {
    const lowerInput = input.toLowerCase();
    const filteredProducts = products.filter(product => {
      const lowerName = product.name.toLowerCase();
      const lowerDescription = product.description.toLowerCase();
      return lowerName.includes(lowerInput) || lowerDescription.includes(lowerInput);
    });
    return filteredProducts;
  }

  searchInput.addEventListener('keyup', () => {
    const inputValue = searchInput.value;
    const results = searchProducts(inputValue, products);

    searchResults.innerHTML = '';

    if (results.length > 0) {
      results.forEach(product => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
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
        `;
        searchResults.appendChild(listItem);
      });
    } else {
      searchResults.innerHTML = '<p>No se encontraron productos.</p>';
    }
  });
});
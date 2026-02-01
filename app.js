const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const detailContainer = document.getElementById("detalle");
if (productsContainer && searchInput) {
  let products = [];

  fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
      products = data.products;
      renderProducts(products);
    });
  function renderProducts(list) {
    productsContainer.innerHTML = "";
    list.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.onclick = () => {
        window.location.href = `detalle.html?id=${product.id}`;
      };

      card.innerHTML = `
        <h3>${product.title}</h3>
        <img src="${product.thumbnail}">
        <p><strong>Categoría:</strong> ${product.category}</p>
        <p><strong>Rating:</strong> ⭐ ${product.rating}</p>
      `;

      productsContainer.appendChild(card);
    });
  }
  searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase().trim();

  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(value) ||
    product.category.toLowerCase().includes(value)
  );

  renderProducts(filtered);
});
}
if (detailContainer) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      detailContainer.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}" style="width:300px">
        <p><strong>Descripción:</strong> ${product.description}</p>
        <p><strong>Precio:</strong> $${product.price}</p>
        <p><strong>Marca:</strong> ${product.brand}</p>

        <h3>Opiniones</h3>
        ${
          product.reviews
            ? product.reviews.map(r => `<p>💬 ${r.comment}</p>`).join("")
            : "<p>No hay comentarios</p>"
        }
      `;
    });
}

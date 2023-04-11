const socket = io();

const productList = document.getElementById("productsList");

const deleteProductForm = document.getElementById("deleteProductForm");
const addProductForm = document.getElementById("addProductForm");
const thumbnails = document.getElementById("thumbnails").files;

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addProductForm);
  for (let i = 0; i < thumbnails.length; i++) {
    formData.append("thumbnails", thumbnails[i]);
  }

  fetch(`/api/products`, {
    method: "POST",
    body: formData,
  });
});

deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const productId = document.getElementById("pid").value;
  fetch(`/api/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

socket.on("product_add", (product) => {
  let addedProduct = document.createElement("div");
  addedProduct.classList.add(
    "max-w-sm",
    "border",
    "rounded-lg",
    "shadow",
    "bg-gray-800",
    "border-gray-700",
    "m-1"
    );
  addedProduct.setAttribute("id", product._id)
  addedProduct.innerHTML = `
  <div>
    ${product.thumbnails
      .map(
        (thumbnail) =>
          `<img src="${thumbnail}" alt="product image" />`
      )
      .join("")}
  </div>
  <div >Nombre : ${product.title}</h5>
    <p>Descripcion : ${product.description}</p>
    <div>
      <p>Precio : ${product.price}
      </p>
    </div>
  </div>
  `;

  productList.appendChild(addedProduct);
});

socket.on("product_remove", (productId) => {
  const productIdFound = Array.from(productList.children).findIndex(
    (node) => node.getAttribute("id") == productId
  );
  productList.removeChild(productList.children[productIdFound]);
});
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
  <div class="flex flex-wrap w-full p-2 justify-evenly">
    ${product.thumbnails
      .map(
        (thumbnail) =>
          `<img src="${thumbnail}" alt="product image" class="aspect-square max-h-40 m-2 ring-4 rounded-xl"/>`
      )
      .join("")}
  </div>
  <div class="px-5 pb-5">
    <h5 class="text-2xl font-semibold tracking-tight text-white">${
      product.title
    }</h5>
    <p class="text-xs font-semibold tracking-tight text-white">${
      product.description
    }</p>
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold text-white pt-2">$${product.price}
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
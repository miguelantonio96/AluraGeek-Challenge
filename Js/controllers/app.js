import { connectionAPI } from "../services/connectionAPI.js";

const productContainer = document.querySelector(".products-container");
async function cardListed() {
  try {
    const listAPI = await connectionAPI.listProducts();
    
    if (listAPI.length == []) {
      productContainer.innerHTML = `<h1 class="bg-danger bg-opacity-50 w-50 h-25  rounded-4 d-flex justify-content-center align-items-center text-white text-no-result">No product available</h1>`;
    } else {
      listAPI.forEach((productInfo) =>
        productContainer.appendChild(
          createCardHTML(
            productInfo.img,
            productInfo.name,
            productInfo.price,
            productInfo.id
          )
        )
      );
    }
  } catch (error) {
    error = `<h1 class="bg-danger bg-opacity-50 w-50 h-25  rounded-4 d-flex justify-content-center align-items-center text-white text-no-result">Upss sorry connection error</h1>`;

    productContainer.innerHTML = error;
  }
}
cardListed();

const formulary = document.querySelector("[data-formulary]");
async function saveNewCard(event) {
  event.preventDefault();
  const name = document.querySelector("[data-name]").value;
  const priceLoad = document.querySelector("[data-price]").value;
  const imagenLink = document.querySelector("[data-imagen]").value;
  const priceConverted = parseFloat(priceLoad);
  await connectionAPI.saveNewProducts(name, priceConverted, imagenLink);

  const messageAdded = document.querySelector(".product-added-successfully");
  messageAdded.innerHTML = "Product has been added";

  alert("Done");

  messageAdded.innerHTML = `<p class="message-added">Unable to add product<br>(Connection failed)</p>`;
}
formulary.addEventListener("submit", (event) => {
  saveNewCard(event);
});

function createCardHTML(imgURL, name, price, id) {
  const productList = document.createElement("li");
  productList.classList.add("card-container");

  productList.innerHTML = `
  <img class="card-img-top" src="${imgURL}" alt="imágenes" />
  <div class="card-body" >
    <div>
      <h4 class="card-title">${name}</h4>
      <p class="card-text">$${price}</p>
    </div>
    <button class='btn btn-danger p-2 d-flex justify-content-center align-items-center' data-id="${id}"><i class="fa-solid fa-trash text-white" ></i></button>
  </div>    
  `;


  return productList;
}

function deleteProduct() {
  const deleteButton = productList.querySelector("button[data-id]");
  deleteButton.addEventListener("click", () => {
    const productId = deleteButton.getAttribute("data-id");
    connectionAPI.deleteProduct(productId);
  
})}
deleteProduct()

// Scroll-Header background \\
window.addEventListener("scroll", function () {
  let header = document.querySelector(".header-container");
  var scrollPosition = window.scrollY;

  if (scrollPosition > 50) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

async function searchCard(event) {
  event.preventDefault();
  const inputSearch = document.querySelector("[data-search]").value;
  const search = connectionAPI.searchCards(inputSearch);

}
const btnSearch = document.querySelector("[data-btn-search]");
btnSearch.addEventListener("click", (event) => {
  searchCard(event);
  
  
});

const apiURL = "http://localhost:3001/products";

async function listProducts() {
  const products = await fetch(apiURL);
  const productData = await products.json();

  return productData;
}

async function saveNewProducts(name, price, img, id) {
  const postOption = {
    method: "POST",
    header: { "Content-type": "application/json" },
    body: JSON.stringify({
      name,
      price,
      img,
      id
    }),
  };
  await fetch(apiURL, postOption);
}

async function searchCards(searchWord) {
  const connection = await fetch(
    `http://localhost:3001/products?q=${searchWord}`
  );
  const productData = await connection.json();
  return productData;
}

async function deleteProduct(id) {
  const connection = await fetch(`http://localhost:3001/products/${id}`, {
    method: "DELETE",
    header: { "Content-type": "application/json" },
   
  });

 
  return connection;
}

export const connectionAPI = {
  listProducts,
  saveNewProducts,
  searchCards,
  deleteProduct,
};


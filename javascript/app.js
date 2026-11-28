let productsGrid = document.getElementById("productsGrid");
let categoryBtn = document.getElementById("categoryBtn");
let searchBar = document.getElementById("searchBar");
let searchBtn = document.getElementById("searchBtn");
let cartCount = document.getElementById("cartCount");

let cart = []

async function addToCart(id) {
  const response = await fetch(`http://localhost:3000/products/${id}`)
  const data = await response.json()

  cart.push(data)
  console.log(cart);
  
  localStorage.setItem('cart', JSON.stringify(cart))

  Swal.fire({
    title : 'Item added to cart successfully',
    icon : 'success',
    draggable : true
  })

  cartCount()
}

window.onload = async function(){
  const products = await getProducts()
  createProduct(products)

  cart = getInfoFromLocalStorage()
}

async function getProducts() {
  const response = await fetch('http://localhost:3000/products')
  const data = await response.json()
  return data
}

async function createProduct(products) {
  productsGrid.innerHTML = ''
  products.forEach(function (product) {
    productsGrid.innerHTML += `
         <div class="product-card">
            <div class="product-image">
               <img
                  src="${product.image}" />
            </div>

            <div class="product-info">
               <span class="product-category"> ${product.brand}</span>

               <h3>${product.name}</h3>

               <p>${product.description}</p>

               <div class="product-bottom">
                  <span class="product-price">$${product.price}</span>

                  <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
               </div>
            </div>
         </div>
      `
  })
}

async function filterByCategory(brand) {
  const response = await fetch(`http://localhost:3000/products?brand=${brand}`)
  const data = await response.json()
  createProduct(data);
}

categoryBtn.onclick = async function(){
  const products = await getProducts()
  createProduct(products)
}

searchBtn.onclick = searchBySearchBar

async function searchBySearchBar(){
  const response = await fetch('http://localhost:3000/products')
  const data = await response.json()

  const filteredProducts = data.filter(function(product){
    if(product.name.includes(searchBar.value)){
      return product
    }
  })
  createProduct(filteredProducts)
}

searchBar.onkeydown = function(event){
  if(event.key == 'Enter'){
    searchBySearchBar()
  }
}

function getInfoFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart'))
}

// function cartCount() {
//   cartCount.innerHTML = `${cart.length}`
// }
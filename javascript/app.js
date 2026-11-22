
let productsGrid = document.getElementById('productsGrid')
let categoryBtn = document.getElementById('categoryBtn')
let searchBar = document.getElementById('searchBar')
let searchBtn = document.getElementById('searchBtn')

window.onload = async function () {
   const product = await getProduct()
   createProduct(product)
}

async function getProduct() {
   const response = await fetch('http://localhost:3000/products')
   const products = await response.json()
   return products
}

function createProduct(products) {
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

                  <button class="add-to-cart-btn">Add to Cart</button>
               </div>
            </div>
         </div>
      `
   })
}

async function filterByCategory(brand) {
   const response = await fetch(`http://localhost:3000/products?brand=${brand}`)
   const data = await response.json()

   createProduct(data)
}

categoryBtn.onclick = async function () {
   const product = await getProduct()
   createProduct(product)
}

searchBtn.onclick = async function searchProductName() {
   const searchKey = searchBar.value

   const response = await fetch('http://localhost:3000/products')
   const data = await response.json()


   const filteredProducts = data.filter(function (product) {
      if (product.name.includes(searchKey)) {
         return product
      }
   })

   createProduct(filteredProducts)
}

searchBar.onkeydown = async function (event) {
   if (event.key == 'Enter') {
      const searchKey = searchBar.value

      const response = await fetch('http://localhost:3000/products')
      const data = await response.json()


      const filteredProducts = data.filter(function (product) {
         if (product.name.includes(searchKey)) {
            return product
         }
      })

      createProduct(filteredProducts)
   }
}
const cartItems = document.getElementById("cartItems");
const cartItemsCount = document.getElementById('cartItemsCount')

window.onload = function () {
   const cartProducts = getInfoFromLocalStorage()
   createProduct(cartProducts)

   console.log(cartProducts);
}

function getInfoFromLocalStorage() {
   return JSON.parse(localStorage.getItem('cart'))
}

function createProduct(cartProducts) {
   cartProducts.forEach(function (cartItem) {
      cartItems.innerHTML += `
         <article class="cart-item">

                    <div class="cart-item-image">
                        <img
                            src="${cartItem.image}"
                            alt="product"
                        >
                    </div>

                    <div class="cart-item-details">

                        <div class="cart-item-info">
                            <span class="product-category">
                                ${cartItem.brand}
                            </span>

                            <h2>${cartItem.name}</h2>

                            <p>
                                ${cartItem.description}
                            </p>
                        </div>

                        <div class="cart-item-actions">

                            <div class="quantity-control">
                                <button type="button">−</button>
                                <span>1</span>
                                <button type="button">+</button>
                            </div>

                            <button class="remove-btn" type="button">
                                Remove
                            </button>

                        </div>

                    </div>

                    <div class="cart-item-price">
                        <span>$${cartItem.price}</span>
                    </div>

                </article>
      `
   })
}
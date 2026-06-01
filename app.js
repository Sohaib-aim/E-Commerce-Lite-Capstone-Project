const cartBtn = document.getElementById("cart-button");
const cartBar = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartClose = document.getElementById("close");
const overlay = document.getElementById("overlay");
const container = document.getElementById("display-cards");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const viewAllBtn = document.getElementById("view-all-button");
const msgName = document.getElementById("name");
const msgEmail = document.getElementById("email");
const msgText = document.getElementById("message");
const msgForm = document.getElementById("newsletter-form");

let allProducts = [];
const API = "http://localhost:3000/products";

async function loadProducts() {
  const res = await fetch(API);
  const products = await res.json();
  allProducts = products;

  container.innerHTML = products.map((product) => {
      return `<div class="card">
                <img src="${product.image}"/>
                <div class="details">  
                    <p>${product.category}</p>
                    <h3>${product.title}</h3>
                    <h2 id="price">$${product.price}</h2>
                    <button class="add-to-cart" data-id="${product.id}"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                </div>
            </div>`;
    })
    .join("");
}

loadProducts();


searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    const searchResults = allProducts.filter(product => {
        return product.title.toLowerCase().includes(searchTerm);
    });

    container.innerHTML = searchResults.map(product => {
        return `
            <div class="card">
                <img src="${product.image}">
                <div class="details">
                <p>${product.category}</p> 
                <h3>${product.title}</h3>
                <h2 id="price">$${product.price}<h2>
                <button class="add-to-cart" data-id="${product.id}"><i class="fa fa-shopping-cart"></i>Add to Cart</button>
                </div>
              </div>
        `;
    }).join("");
});

viewAllBtn.addEventListener("click", ()=>{

    container.innerHTML = allProducts.map(product=>{
    return`<div class="card">
                <img src="${product.image}">
                <div class="details">
                <p>${product.category}</p> 
                <h3>${product.title}</h3>
                <h2 id="price">$${product.price}<h2>
                <button class="add-to-cart" data-id="${product.id}"><i class="fa fa-shopping-cart"></i>Add to Cart</button>
                </div>
              </div>`
  }).join("")
})

categoryFilter.addEventListener("change", (e)=>{

  let filteredProducts;
  const categorySelected = e.target.value.toLowerCase().trim()

  if (categorySelected === "all" || categorySelected === "") {
        filteredProducts = allProducts}
  else{
      filteredProducts = allProducts.filter(product => product.category.toLowerCase() == categorySelected);
  }

  container.innerHTML = filteredProducts.map(product=>{
    return`<div class="card">
                <img src="${product.image}">
                <div class="details">
                <p>${product.category}</p> 
                <h3>${product.title}</h3>
                <h2 id="price">$${product.price}<h2>
                <button class="add-to-cart" data-id="${product.id}"><i class="fa fa-shopping-cart"></i>Add to Cart</button>
                </div>
              </div>`
  }).join("")

})

cartBtn.onclick = () => {
  cartBar.classList.add("open");
  overlay.classList.add("active");
};

cartClose.onclick = () => {
  cartBar.classList.remove("open");
  overlay.classList.remove("active");
};

let cart = [];

container.addEventListener("click", (e) => {
  const button = e.target.closest(".add-to-cart");
  if (button) {
    const productID = button.dataset.id;
    addToCart(productID);
  }
});

function addToCart(productID) {
  const isPresent = cart.find((item) => item.id === productID);
  if (isPresent) {
    isPresent.quantity += 1;
  } else {
    cart.push({ id: productID, quantity: 1 });
  }
  showCart();
}

function showCart() {

  let totalPrice = 0

  const cartHTML = cart.map((item) => {
      const productDetails = allProducts.find(
        (product) => product.id === item.id,
      );

      totalPrice += item.quantity * productDetails.price

      if (!productDetails) {
        return "";
      } else {
        return `
      <div class="cart-item">
        <img src="${productDetails.image}"/>
        <div class="cart-item-details">
            <div class="cart-item-header">
                <h5 class="cart-item-title">${productDetails.title}</h5>
                <span class="cart-item-price">$${productDetails.price}</span>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="qty-btn minus-btn" data-id="${item.id}">-</button>
                    <span class="qty-num">${item.quantity}</span>
                    <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
                </div>
                <button class="delete-btn" data-id="${item.id}">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>
    </div>`}}).join("");

    const totalHTML = ()=>{
                      if (totalPrice == 0){
                        return `<div id="cart-items">
                                  <p>Your cart is empty</p>
                                </div>`
                      }
                      else{
                        return (`<div class="cart-total-container">
                          <h3>Total:</h3>
                          <span class="cart-total-price">$${totalPrice.toFixed(2)}</span>
                        </div>
                        <button id="checkout-btn">Checkout<i class="fas fa-arrow-right arrow-icon"></i></button>
                        <p id="cart-last-line">Shipping calculated at next step.</p>`)}}

    cartItems.innerHTML = cartHTML + totalHTML()
}

cartItems.addEventListener("click", (e)=>{
  const targetBtn = e.target.closest("button")

  if(!targetBtn){
    return;
  }
  
  const productID = targetBtn.dataset.id
  
  if(targetBtn.classList.contains("plus-btn")){
    const item = cart.find(item => item.id == productID)
    if(item){
      item.quantity += 1
    }
  }

  if (targetBtn.classList.contains("minus-btn")){
    const item = cart.find(item => item.id == productID)

    if(item){
      item.quantity -=1

      if(item.quantity === 0){
        cart = cart.filter(item => item.id != productID)
      }
    }
  }
  if (targetBtn.closest(".delete-btn")) {
        cart = cart.filter(item => item.id != productID);
    }
    showCart();
})

msgForm.addEventListener("submit", async (e)=>{
  e.preventDefault();

  const msgNameValue = msgName.value;
  const msgEmailValue = msgEmail.value;
  const msgTextValue = msgText.value;

  if ((!msgNameValue) || (!msgEmailValue) || (!msgTextValue)){
    alert("Please fill in all fields before sending message!")
    return;
  }

  const url = "http://localhost:3000/messages"

  const messageData = {
    name: msgNameValue,
    email: msgEmailValue,
    message: msgTextValue
  }

  try{
   const response = await fetch(url, {
      method: "POST",
      headers:{"Content-Type" : "application/json"},
      body: JSON.stringify(messageData),
    });

    if(!response.ok){
      throw new Error("Failed to send message to the server!")
    }

    alert("Message sent successfully!")

    msgName.value = "";
    msgEmail.value = "";
    msgText.value = "";
  }
  catch (error){
    alert ("Could not save message. Our JSON Server is not running.");
  }
})
const cartBtn = document.getElementById("cart-button")
const cartBar = document.getElementById("cart")
const cartItems = document.getElementById("cart-items")
const cartClose = document.getElementById("close")
const overlay = document.getElementById("overlay")
const addCart = document.getElementsByClassName("add-to-cart")

const API = 'http://localhost:3000/products'

async function loadProducts(){
    const res = await fetch(API)
    const products = await res.json()

    const container = document.getElementById("display-cards")

    container.innerHTML = products.map(product=>{
        return(
            `<div class="card">
                <img src="${product.image}"/>
                <div class="details">  
                    <p>${product.category}</p>
                    <h3>${product.title}</h3>
                    <h2 id="price">$${product.price}</h2>
                    <button onclick="addToCart()" class="add-to-cart" data-id="${product.id}"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                </div>
            </div>`
        )
    }).join("")
}

loadProducts();






cartBtn.onclick = ()=>{
    cartBar.classList.add("open")
    overlay.classList.add("active")
}

cartClose.onclick = ()=>{
    cartBar.classList.remove("open")
    overlay.classList.remove("active")
}

//let cart = []

//function addToCart(){
  //  console.log("c")
    //cart.push("Laptop")
    //showCart()
//}


//function showCart(){
  //  cartItems.innerHTML = cart.map(item=> `<p>${item}</p>`).join("")
//}
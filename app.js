const cartBtn = document.getElementById("cart-button")
const cartBar = document.getElementById("cart")
const cartClose = document.getElementById("close")
const overlay = document.getElementById("overlay")

cartBtn.onclick = ()=>{
    cartBar.classList.add("open")
    overlay.classList.add("active")
}

cartClose.onclick = ()=>{
    cartBar.classList.remove("open")
    overlay.classList.remove("active")
}
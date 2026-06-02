const inventoryData = document.getElementById("inventory-rows");

document.addEventListener("DOMContentLoaded", ()=>{
    fetchProducts();
})

async function fetchProducts() {
    try{
        const API_URL = "http://localhost:3000/products";
        const response = await fetch(API_URL);

        if (!response.ok){
            alert("Json server not working!");
        }

        const products = await response.json();
        renderProducts(products);
    }
    catch(error){
        alert("Error: Json server is not working!")
    }
}

function renderProducts(products){
   inventoryData.innerHTML = products.map((product)=>{
       return `<tr>
                <td><img src="${product.image}">${product.title}</td>
                <td>$${product.price}</td>
                <td><span class="active-status">Active</span></td>
                <td class="action-buttons">
                    <button class="dlt-btn">Delete</button>
                    <button class="update-btn">Update</button>
                </td>
                </tr>`
    }).join("")
}
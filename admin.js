const inventoryData = document.getElementById("inventory-rows");
const saveProductBtn = document.getElementById("product-save-button");
const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const productImgInput = document.getElementById("product-img");
const productDescInput = document.getElementById("product-desc");
const productForm = document.getElementById("product-form");
const displayMsg = document.getElementById("message-content");
let allProducts;
let currentEditingID = null;

document.addEventListener("DOMContentLoaded", ()=>{
    fetchProducts();
    fetchMessages();
})

async function fetchProducts() {
    try{
        const API_URL = "http://localhost:3000/products";
        const response = await fetch(API_URL);

        if (!response.ok){
            alert("Json server not working!");
        }

        const products = await response.json();
        allProducts = products;
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
                    <button class="dlt-btn" data-id="${product.id}">Delete</button>
                    <button class="update-btn" data-id="${product.id}">Update</button>
                </td>
                </tr>`
    }).join("")
}

document.addEventListener("click", async (e)=>{
    const deleteBtn = e.target.closest(".dlt-btn")
    if(!deleteBtn){
        return;
    }
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if(confirmDelete){
        const deleteProductID = deleteBtn.dataset.id;

        const URL = `http://localhost:3000/products/${deleteProductID}`
        
        try{
            const response = await fetch(URL,{
            method: "DELETE"
        });

        if(!response.ok){
            throw new Error("Json Server not working. Try again!")
        }
        }
        catch(err){
            alert("Json server not working!")
        }
    }
    else{
        return;
    }
})

document.addEventListener("click", async(e)=>{
    const updatBtn = e.target.closest(".update-btn");
    if(!updatBtn){
        return;
    }
    window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
    const updateProductID = updatBtn.dataset.id;
    currentEditingID = updateProductID;
    const productToUpdate = allProducts.find(product => product.id == updateProductID);
    productNameInput.value = productToUpdate.title;
    productPriceInput.value = productToUpdate.price;
    productImgInput.value = productToUpdate.image;
    productDescInput.value = productToUpdate.description;

    saveProductBtn.textContent = "Update Product";
})

productForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const updatedData = {
            title: productNameInput.value,
            price: productPriceInput.value,
            image: productImgInput.value,
            description: productDescInput.value
        }

        const patchURL = `http://localhost:3000/products/${currentEditingID}`;

    try{
        if(currentEditingID){
            const response = await fetch(patchURL, {
                method: "PATCH",
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify(updatedData)
            })

            if(!response.ok){
                throw new Error("Failed to update product")
            }

            alert("Product updated successfully!")
        }
        else{
            const productNameValue = productNameInput.value;
            const productPriceValue = productPriceInput.value;
            const productImgValue = productImgInput.value;
            const productDescValue = productDescInput.value;

            if (!productNameValue || !productPriceValue || !productImgValue || !productDescValue){
                alert("Please fill in all the fields!")
                return;
            }

            const newProductData = {
                title: productNameValue,
                price: productPriceValue,
                description: productDescValue,
                image: productImgValue
            }

            const postURL = "http://localhost:3000/products"

            try{
                const response = await fetch(postURL, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(newProductData)
                })

                if(!response.ok){
                    throw new Error("Sorry, new product can't be added now!")
                }

                productNameInput.value = "";
                productPriceInput.value = "";
                productDescInput.value = "";
                productImgInput.value = "";
            }
            catch(err){
                alert("Json server not working. Try again later!")
            }
        }
    }
    catch(err){
        alert("An error occured while updating!")
    }
});

async function fetchMessages() {
    const msgURL = "http://localhost:3000/messages";

    try{
        const response = await fetch(msgURL);
        if(!response.ok){
            throw new Error("Messages can't be fetched!")
        }

        const messages = await response.json();

        if(messages.length === 0){
            displayMsg.innerHTML = "<p>You don't have any messages yet.</p>";
            return;
        }

        displayMsg.innerHTML = messages.map(message=>{
            return `<p class="show-msg"><b>${message.name}</b>: ${message.message}</p>`
        }).join("");
    }

    catch(error){
        alert("Json server is not working!");
    }
}
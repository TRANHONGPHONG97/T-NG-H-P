var products = [
    "Sony Xperia",
    "Samsung Galaxy",
    "Nokia 6",
    "Xiaomi Redmi Note 4",
    "Apple iPhone 6S",
    "Xiaomi Mi 5s Plus",
    "Apple iPhone 8 Plus",
    "Sony Xperia",
    "Fujitsu F-04E",
    "Oppo A71"
]
const key_enter = 13;
function renderProduct() {
    let tbProducts = document.querySelector('.table>tbody');
    let htmls = products.map(function (product, index) {
        return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product}</td>
                    <td>
                        <button class="btn" onclick="modify(${index})">Edit</button>
                        <button class="btn" onclick='removeProduct(${index})'>Delete</button>
                    </td>
                </tr>
                `
    })
    tbProducts.innerHTML = htmls.join("");
}
function addProduct() {
    
    let productName = document.querySelector("#productName").value;
    if (productName != null && productName.trim() != "") {
        products.push(productName);
        reset();
        renderProduct();
    }
    else {
        alert("Product name is required!")
        document.querySelector("#productName").focus();
    }
}
function reset() {
    document.querySelector("#productName").value = "";
}
function pressEnter(e) {
    if (e.keyCode == key_enter) {
        createProduct();
    }
}
function removeProduct(index) {
    let confirmed = window.confirm(`Are sure to want to remove ${products[index]}?`);
    if (confirmed) {
        products.splice(index, 1);
        renderProduct();
    }
}
function modify(index) {
    document.querySelector('#modifyProduct').classList.remove('d-none');
    document.querySelector("#new_ProductName").value = products[index];
    // position = index;
    document.querySelector("#btnUpdate").onclick = function () {
        let new_ProductName = document.querySelector("#new_ProductName").value;
        if (new_ProductName != null && new_ProductName.trim() != "") {
            products[index] = new_ProductName;
            renderProduct();
            clearForm();
        }
        else {
            alert("Product name is required!")
            document.querySelector("#new_ProductName").focus();
        }
    }
}
function clearForm() {
    document.querySelector('#modifyProduct').classList.add('d-none');
    position = 0;
}
function init() {
    renderProduct();
}
init();

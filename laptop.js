// Load and display data from local storage when the page is loaded
window.onload = loadFromLocalStorage;

function onFormSubmit() {
    var formData = readFormData();
    insertNewRecord(formData);
    resetForm();
    saveDataToLocalStorage();
}

function readFormData() {
    var formData = {};
    formData["brandName"] = document.getElementById("brandName").value;
    formData["model"] = document.getElementById("model").value;
    formData["price"] = document.getElementById("price").value;
    formData["quantity"] = document.getElementById("quantity").value;
    formData["totalAmount"] = document.getElementById("totalAmount").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("purchaseLaptopList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.brandName;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.model;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.price;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.quantity;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.totalAmount;
}

function resetForm() {
    document.getElementById("brandName").value = "";
    document.getElementById("model").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("totalAmount").value = "";
}

function saveDataToLocalStorage() {
    var tableData = [];
    var table = document.getElementById("purchaseLaptopList").getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
        var rowData = {
            brandName: table.rows[i].cells[0].innerHTML,
            model: table.rows[i].cells[1].innerHTML,
            price: table.rows[i].cells[2].innerHTML,
            quantity: table.rows[i].cells[3].innerHTML,
            totalAmount: table.rows[i].cells[4].innerHTML
        };
        tableData.push(rowData);
    }
    localStorage.setItem("laptopData", JSON.stringify(tableData));
}

function loadFromLocalStorage() {
    if (typeof (Storage) !== "undefined") {
        var savedData = JSON.parse(localStorage.getItem("laptopData"));

        if (savedData) {
            var table = document.getElementById("purchaseLaptopList").getElementsByTagName('tbody')[0];
            for (var i = 0; i < savedData.length; i++) {
                insertNewRecord(savedData[i]);
            }
        }
    } else {
        alert("Local storage is not supported in your browser.");
    }
}

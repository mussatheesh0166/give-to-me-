// Load and display data from local storage when the page is loaded
window.onload = loadFromLocalStorage;

function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
    saveDataToLocalStorage();
}

function readFormData() {
    var formData = {};
    formData["fullname"] = document.getElementById("fullname").value;
    formData["empcode"] = document.getElementById("empcode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    formData["number"] = document.getElementById("number").value;
    return formData;
}

var selectedRow = null;

function insertNewRecord(data) {
    var table = document.getElementById("employeelist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullname;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empcode;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.number;
    var cell6 = newRow.insertCell(5);
    cell6.innerHTML = '<a href="javascript:void(0);" onclick="onEdit(this)">Edit</a> ' +
                     '<a href="javascript:void(0);" onclick="onDelete(this)">Delete</a>';
}

function resetForm() {
    document.getElementById("fullname").value = "";
    document.getElementById("empcode").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    document.getElementById("number").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empcode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
    document.getElementById("number").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullname;
    selectedRow.cells[1].innerHTML = formData.empcode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
    selectedRow.cells[4].innerHTML = formData.number;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeelist").deleteRow(row.rowIndex);
        resetForm();
    }
    saveDataToLocalStorage();
}

function saveDataToLocalStorage() {
    var tableData = [];
    var table = document.getElementById("employeelist").getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
        var rowData = {
            fullname: table.rows[i].cells[0].innerHTML,
            empcode: table.rows[i].cells[1].innerHTML,
            salary: table.rows[i].cells[2].innerHTML,
            city: table.rows[i].cells[3].innerHTML,
            number: table.rows[i].cells[4].innerHTML
        };
        tableData.push(rowData);
    }
    localStorage.setItem("employeeData", JSON.stringify(tableData));
}

function loadFromLocalStorage() {
    if (typeof (Storage) !== "undefined") {
        var savedData = JSON.parse(localStorage.getItem("employeeData"));

        if (savedData) {
            var table = document.getElementById("employeelist").getElementsByTagName('tbody')[0];
            for (var i = 0; i < savedData.length; i++) {
                insertNewRecord(savedData[i]);
            }
        }
    } else {
        alert("Local storage is not supported in your browser.");
    }
}

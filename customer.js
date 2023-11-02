// Function to save data to local storage
function saveToLocalStorage(data) {
    // Check if local storage is available
    if (typeof (Storage) !== "undefined") {
        // Retrieve existing data from local storage or initialize an empty array
        let savedData = JSON.parse(localStorage.getItem("customerData")) || [];

        // Add the new data to the array
        savedData.push(data);

        // Store the updated data array in local storage
        localStorage.setItem("customerData", JSON.stringify(savedData));
    } else {
        alert("Local storage is not supported in your browser.");
    }
}

// Function to load and display data from local storage
function loadFromLocalStorage() {
    if (typeof (Storage) !== "undefined") {
        let savedData = JSON.parse(localStorage.getItem("customerData"));

        if (savedData) {
            const table = document.getElementById("customer").querySelector("tbody");

            // Clear the table
            table.innerHTML = "";

            // Add the saved data to the table
            savedData.forEach(data => {
                const newRow = table.insertRow(table.rows.length);
                Object.values(data).forEach(value => {
                    const cell = newRow.insertCell();
                    cell.textContent = value;
                });
            });
        }
    } else {
        alert("Local storage is not supported in your browser.");
    }
}

// Function to run on form submission
function onformsubmit() {
    // Get form input values
    const fullname = document.getElementById("fullname").value;
    const prodet = document.getElementById("prodet").value;
    const billno = document.getElementById("billno").value;
    const city = document.getElementById("city").value;
    const number = document.getElementById("number").value;

    // Create an object to represent the data
    const data = {
        "Full Name": fullname,
        "Prodet": prodet,
        "Bill No": billno,
        "City": city,
        "Number": number,
    };

    // Save the data to local storage
    saveToLocalStorage(data);

    // Create a new row in the table and add the data
    const newRow = document.getElementById("customer").querySelector("tbody").insertRow(-1);
    Object.values(data).forEach(value => {
        const cell = newRow.insertCell();
        cell.textContent = value;
    });

    // Show a window alert to indicate a successful submission
    alert("Customer details saved.");

    // Clear the form fields
    clearForm();
}

function clearForm() {
    document.getElementById("fullname").value = "";
    document.getElementById("prodet").value = "";
    document.getElementById("billno").value = "";
    document.getElementById("city").value = "";
    document.getElementById("number").value = "";
}

// Load and display data from local storage when the page is loaded
window.onload = loadFromLocalStorage;

// Load and display data from local storage when the page is loaded
window.onload = loadFromLocalStorage;
// Function to save data to local storage
function saveToLocalStorage(data) {
  // Check if local storage is available
  if (typeof (Storage) !== "undefined") {
    // Retrieve existing data from local storage or initialize an empty array
    let savedData = JSON.parse(localStorage.getItem("supplierData")) || [];
    
    // Add the new data to the array
    savedData.push(data);

    // Store the updated data array in local storage
    localStorage.setItem("supplierData", JSON.stringify(savedData));
  } else {
    alert("Local storage is not supported in your browser.");
  }
}

// Function to load and display data from local storage
function loadFromLocalStorage() {
  if (typeof (Storage) !== "undefined") {
    let savedData = JSON.parse(localStorage.getItem("supplierData"));

    if (savedData) {
      const table = document.getElementById("SupplierDetails").querySelector("tbody");

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
function onFormSubmit() {
  // Get form input values
  const supplierName = document.getElementById("supplierName").value;
  const supplierCode = document.getElementById("supplierCode").value;
  const supplierMailId = document.getElementById("supplierMailId").value;
  const supplierAddress = document.getElementById("supplierAddress").value;
  const supplierNumber = document.getElementById("supplierNumber").value;

  // Create an object to represent the data
  const data = {
    SupplierName: supplierName,
    SupplierCode: supplierCode,
    SupplierMailId: supplierMailId,
    SupplierAddress: supplierAddress,
    SupplierNumber: supplierNumber,
  };

  // Save the data to local storage
  saveToLocalStorage(data);

  // Create a new row in the table and add the data
  const newRow = document.createElement("tr");
  Object.values(data).forEach(value => {
    const cell = document.createElement("td");
    cell.textContent = value;
    newRow.appendChild(cell);
  });

  const table = document.getElementById("SupplierDetails").querySelector("tbody");
  table.appendChild(newRow);

  // Show a window alert to indicate a successful submission
  alert("Supplier details saved.");

  // Clear the form fields
  clearForm();
}

function clearForm() {
  document.getElementById("supplierName").value = "";
  document.getElementById("supplierCode").value = "";
  document.getElementById("supplierMailId").value = "";
  document.getElementById("supplierAddress").value = "";
  document.getElementById("supplierNumber").value = "";
}

// Load and display data from local storage when the page is loaded
window.onload = loadFromLocalStorage;

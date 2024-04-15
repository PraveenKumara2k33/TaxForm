(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


// JavaScript
document.addEventListener("DOMContentLoaded", function() {
  const openModalButton = document.getElementById('openModalButton');

  // Function to open modal when Enter key is pressed
  const handleKeyPress = function(event) {
    if (event.key === 'Enter') {
      openModalButton.click();
    }
  };

  // Add event listener to the document to capture Enter key press
  document.addEventListener('keypress', handleKeyPress);
});

function updateInput(value) {
  document.getElementById('validationCustom03').value = value;
}


document.getElementById('openModalButton').addEventListener('click', function(event) {
  var incomeInput = document.getElementById('validationCustom01');
  var extraIncomeInput = document.getElementById('validationCustom02');
  var ageGroupInput = document.getElementById('validationCustom03');
  var deductionsInput = document.getElementById('validationCustom04');

  if (incomeInput.value.trim() === '') {
    document.getElementById('exclamationIcon').classList.remove('d-none');
  } else {
    document.getElementById('exclamationIcon').classList.add('d-none');
  }

  // Open the modal only if all required fields are not empty
  if (incomeInput.value.trim() !== '' && 
      extraIncomeInput.value.trim() !== '' && 
      ageGroupInput.value.trim() !== '' && 
      deductionsInput.value.trim() !== '') {
    getValue();
  }
});

function getValue() {
  // Getting input values
  var grossIncome = parseFloat(document.getElementById('validationCustom01').value);
  var extraIncome = parseFloat(document.getElementById('validationCustom02').value);
  var ageGroup = document.getElementById('validationCustom03').value;
  var deductions = parseFloat(document.getElementById('validationCustom04').value);

  // Calculating total income
  var totalIncome = grossIncome + extraIncome - deductions;

  // Checking if total income is less than or equal to 8 Lakhs
  if (totalIncome <= 800000) {
    document.getElementById('overallIncome').textContent = totalIncome.toFixed(2) + " Lakhs";
  } else {
    totalIncome = totalIncome - 800000;
    var taxRate = 0;

    // Setting tax rate based on age group
    if (ageGroup === 'Below 40 age') {
      taxRate = 0.3; // 30% tax rate for age < 40
    } else if (ageGroup === 'Over 40 but Under 60 Age') {
      taxRate = 0.4; // 40% tax rate for age >= 40 but < 60
    } else if (ageGroup === 'Above 60 Age') {
      taxRate = 0.1; // 10% tax rate for age >= 60
    }

    // Calculating tax amount
    totalIncome = taxRate * totalIncome;

    // Setting modal content
    document.getElementById('overallIncome').textContent = totalIncome.toFixed(2) + " Lakhs";
  }

  // Show the modal
  var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  modal.show();

  // Close the modal after displaying the output
  setTimeout(function() {
    modal.hide();

    // Reset form fields
    document.getElementById('validationCustom01').value = '';
    document.getElementById('validationCustom02').value = '';
    document.getElementById('validationCustom03').selectedIndex = 0;
    document.getElementById('validationCustom04').value = '';

    // Set focus back to the first input field
    document.getElementById('validationCustom01').focus();
  }, 2000); // Adjust the delay if needed
}


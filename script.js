document.addEventListener('DOMContentLoaded', function () {
    // Attach event listeners to the number buttons
    var numberButtons = document.querySelectorAll('.btn-light');
    numberButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        appendToDisplay(event.target.id);
      });
    });
  
    // Attach event listeners to the operator buttons
    document.getElementById('add').addEventListener('click', function () {
      performOperation('+');
    });
  
    document.getElementById('subtract').addEventListener('click', function () {
      performOperation('-');
    });
  
    document.getElementById('multiply').addEventListener('click', function () {
      performOperation('*');
    });
  
    document.getElementById('divide').addEventListener('click', function () {
      performOperation('/');
    });
  
    // Attach event listener to the equal button
    document.getElementById('equal').addEventListener('click', function () {
      evaluateExpression();
    });
  
    // Attach event listener to the clear button
    document.getElementById('clear').addEventListener('click', function () {
      clearDisplay();
    });
  
    // Attach event listener to the decimal button
    document.getElementById('decimal').addEventListener('click', function () {
      var display = document.getElementById('result');
      if (!display.value.includes('.')) {
        appendToDisplay('.');
      }
    });
  
    // Helper function to append the clicked number/operator to the display
    function appendToDisplay(value) {
      var display = document.getElementById('result');
      display.value += value;
    }
  
    // Clear the display
    function clearDisplay() {
      var display = document.getElementById('result');
      display.value = '';
    }
  
    // Perform the operation and update the display
    function performOperation(operator) {
      var displayValue = document.getElementById('result').value;
      if (isNaN(displayValue)) {
        showAlert();
        return;
      }
  
      localStorage.setItem('lastValue', displayValue);
      localStorage.setItem('lastOperator', operator);
      clearDisplay();
    }
  
    // Evaluate the expression and display the result
    function evaluateExpression() {
      var displayValue = document.getElementById('result').value;
      if (isNaN(displayValue)) {
        showAlert();
        return;
      }
  
      var lastValue = localStorage.getItem('lastValue');
      var lastOperator = localStorage.getItem('lastOperator');
  
      if (lastValue && lastOperator) {
        var result;
        switch (lastOperator) {
          case '+':
            result = parseFloat(lastValue) + parseFloat(displayValue);
            break;
          case '-':
            result = parseFloat(lastValue) - parseFloat(displayValue);
            break;
          case '*':
            result = parseFloat(lastValue) * parseFloat(displayValue);
            break;
          case '/':
            result = parseFloat(lastValue) / parseFloat(displayValue);
            break;
        }
  
        updateDisplay(result);
        localStorage.removeItem('lastValue');
        localStorage.removeItem('lastOperator');
      }
    }
  
    // Update the display with the result
    function updateDisplay(value) {
      var display = document.getElementById('result');
      display.value = value;
    }
  
    // Helper function to show an alert for non-number keys
    function showAlert() {
      alert('Only numbers are allowed!');
    }
  });
  
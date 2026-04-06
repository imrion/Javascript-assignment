// array to store expenses
let expenses = [];

// select elements
let titleInput = document.getElementById("title");
let amountInput = document.getElementById("amount");
let addBtn = document.getElementById("addBtn");
let totalText = document.getElementById("total");
let expenseList = document.getElementById("expenseList");

// function to calculate total using reduce
function calculateTotal(arr) {
    return arr.reduce(function(sum, current) {
        return sum + current.amount;
    }, 0);
}

// function to render expenses
function renderExpenses() {
    expenseList.innerHTML = "";
    
    expenses.forEach(function(expense, index) {
        let li = document.createElement("li");
        li.innerHTML = `
            <div class="expense-item">
                <span class="expense-title">${expense.title}</span>
                <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
                <button class="delete-btn" data-index="${index}">×</button>
            </div>
        `;
        expenseList.appendChild(li);
    });

    // Add delete event listeners
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            expenses.splice(index, 1);
            renderExpenses();
            updateTotal();
        });
    });
}

function updateTotal() {
    let total = calculateTotal(expenses);
    totalText.innerText = total.toFixed(2);
}

// click event
addBtn.addEventListener("click", function() {
    let title = titleInput.value.trim();
    let value = amountInput.value;

    // validation
    if (title === "") {
        alert("Please enter an expense title");
        return;
    }
    if (value === "" || isNaN(value) || Number(value) <= 0) {
        alert("Please enter a valid positive amount");
        return;
    }

    // add to array
    expenses.unshift({
        title: title,
        amount: Number(value)
    });

    // render and update
    renderExpenses();
    updateTotal();

    // clear inputs
    titleInput.value = "";
    amountInput.value = "";
    titleInput.focus();
});

// Allow enter key to add expense
amountInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

titleInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        amountInput.focus();
    }
});
const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");

let transactions = [];

function addTransaction(e) {
    e.preventDefault();

    if (description.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter valid description and amount");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description.value,
        amount: parseFloat(amount.value),
    };

    transactions.push(transaction);
    loadTransactionDetails(transaction);
    updateBalance();

    description.value = "";
    amount.value = "";
}

function loadTransactionDetails(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp" : "inc");

    item.innerHTML = `
        ${transaction.description}
        <span>${sign} ₹${Math.abs(transaction.amount)}</span>
        <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>
    `;

    trans.appendChild(item);
}

function removeTrans(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    config();
}

function updateBalance() {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    const expense = amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0).toFixed(2);

    balance.innerText = `₹${total}`;
    inc_amt.innerText = `₹${income}`;
    exp_amt.innerText = `₹${Math.abs(expense)}`;
}

function config() {
    trans.innerHTML = "";
    transactions.forEach(loadTransactionDetails);
    updateBalance();
}

form.addEventListener("submit", addTransaction);
window.addEventListener("load", config);

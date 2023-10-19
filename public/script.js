const form = document.getElementById("form");
const result = document.getElementById("result");
const monthlyInstallmentAmountDiv = document.getElementById("monthlyInstallmentAmount");
const totalLoanCostDiv = document.getElementById("totalLoanCost");
const loanTermMonthsDiv = document.getElementById("monthsQtt");
const inputScreen = document.getElementById("input_screen");
const resultScreen = document.getElementById("result_screen");
const backButt = document.getElementById("back_butt");
const loanPrincipal = document.getElementById("loanPrincipal");
const bankId = document.getElementById("bankId");
const loanTermMonths = document.getElementById("loanTermMonths");
const select = document.getElementById("bankId");

fetch("http://localhost:3000/banks").then((response) => response.json()).then((banks) => {
    banks.forEach((bank) => {
        const option = document.createElement("option");
        option.value = bank.id;
        option.textContent = bank.name;
        select.appendChild(option)
    });
})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const bankId = form.bankId.value;
    const loanPrincipal = form.loanPrincipal.value;
    const loanTermMonths = form.loanTermMonths.value;

    try {
        const response = await fetch("http://localhost:3000/finance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bankId, loanPrincipal, loanTermMonths
            })
        });
        if (response.ok) {
            const data = await response.json();
            totalLoanCostDiv.innerHTML = toMoney(data.totalLoanCost);
            monthlyInstallmentAmountDiv.innerHTML = toMoney(data.monthlyInstallmentAmount);
            loanTermMonthsDiv.innerHTML = `<span>*</span>Financiamento em ${loanTermMonths} ${loanTermMonths > 1 ? "meses" : "mês"}.`;
            inputScreen.classList.toggle("inactive");
            resultScreen.classList.toggle("inactive");
            result.classList.add("inactive");
        } else {
            const message = await response.json();
            result.innerHTML = message;
            result.classList.remove("inactive");
        }
    } catch (err) {
        result.innerHTML = err.message;
        result.classList.remove("inactive");
    }
})

backButt.addEventListener("click", () => {
    loanPrincipal.value = "";
    loanTermMonths.value = "";
    bankId.selectedIndex = 0;
    inputScreen.classList.toggle("inactive");
    resultScreen.classList.toggle("inactive");
})

function toMoney(number) {
    return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const selected = select.options[select.selectedIndex];
if (selected.disabled) {
    select.style.color = "grey";
} else {
    select.style.color = "black";
}

select.addEventListener("change", () => {
    const selected = select.options[select.selectedIndex];
    if (selected.disabled) {
        select.style.color = "grey";
    } else {
        select.style.color = "black";
    }
})
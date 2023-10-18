const form = document.getElementById("form");
const result = document.getElementById("result");

fetch("http://localhost:3000/banks").then((response) => response.json()).then((banks) => {
        const select = document.getElementById("bankId");
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
            result.innerHTML = `<p>Valor das suas parcelas: ${toMoney(data.monthlyInstallmentAmount)}</p>
                                <p>Valor final a pagar: ${toMoney(data.totalLoanCost)}</p>
                                <p>Financiamento em ${loanTermMonths} meses.</p>`;
        } else {
            const message = await response.json();
            result.innerHTML = message.error;
        }
    } catch (err) {
        result.innerHTML = `Erro ${err}`
    }
})

function toMoney(number) {
    return `R$ ${number.toFixed(2)}`
}
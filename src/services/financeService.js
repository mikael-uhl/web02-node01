export function calcMonthlyInterest(annualInterestRate) {
  return annualInterestRate / 100 / 12;
}

export function calcMonthlyInstallment(loanPrincipal, monthlyInterestRate, loanTermMonths) {
    return (monthlyInterestRate * loanPrincipal) /
      (1 - Math.pow(1 + monthlyInterestRate, 0 - loanTermMonths));
  }

export function validateLoanTerm(loanTermMonths, maxInstallments) {
  if (!isPositive(loanTermMonths)) {
    throw new Error(
      "A quantidade de meses não pode ser menor que 1."
    )
  }
  if (loanTermMonths > maxInstallments) {
    throw new Error(
      `Limite de prazo excedido: O banco escolhido não oferece financiamento por mais de ${maxInstallments} meses.`
    );
  }
}

export function isNumber(numbers) {
  let result = true;
  numbers.forEach(number => {
    number = parseInt(number);
    if(isNaN(number)) {
      result = false;
    }
  });
  return result;
}

export function isPositive(number){
  return number > 0;
}
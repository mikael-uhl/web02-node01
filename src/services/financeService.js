export function calcMonthlyInterest(annualInterestRate) {
  return annualInterestRate / 100 / 12;
}

export function calcMonthlyInstallment(loanPrincipal, monthlyInterestRate, loanTermMonths) {
    return (monthlyInterestRate * loanPrincipal) /
      (1 - Math.pow(1 + monthlyInterestRate, 0 - loanTermMonths));
  }

export function validateLoanTerm(loanTermMonths, maxInstallments) {
  if (loanTermMonths > maxInstallments) {
    throw new Error(
      `Limite de prazo excedido: O banco escolhido não oferece financiamento por mais de ${maxInstallments} meses`
    );
  }
}

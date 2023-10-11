import * as financeService from "../services/financeService.js";
import * as bankService from "../services/bankService.js";

export async function getAllBanks(req, res) {
  try {
    const banks = await bankService.getAllBanks();
    res.status(200).send(banks);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export async function getBankById(req, res) {
  const bankId = parseInt(req.params.id);
  try {
    if (isNaN(bankId)) {
      throw new Error("O ID informado não é um número.");
    }
    const bankData = await bankService.getBankById(bankId);
    if (!bankData) {
      res.status(404).send("Banco não encontrado");
    }
    res.status(200).send(bankData);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export async function calculaAutoLoan(req, res) {
  let { bankId, loanPrincipal, loanTermMonths } = req.body;

  try {
    if (!(bankId && loanPrincipal && loanTermMonths)) {
      throw new Error("Um ou mais campos não preenchidos.");
    }
    if(!financeService.validateNumbers([bankId, loanPrincipal, loanTermMonths])) {
      throw new Error("Um ou mais campos não é número.");
    }
    
    const bankData = await bankService.getBankById(bankId);
    const { annual_interest_rate, max_installments } = bankData;
    const monthlyInterestRate =
      financeService.calcMonthlyInterest(annual_interest_rate);

    financeService.validateLoanTerm(loanTermMonths, max_installments);

    const monthlyInstallmentAmount = financeService.calcMonthlyInstallment(
      loanPrincipal,
      monthlyInterestRate,
      loanTermMonths
    );

    const totalLoanCost = monthlyInstallmentAmount * loanTermMonths;

    res.status(200).send({ monthlyInstallmentAmount, totalLoanCost });
  } catch (err) {
    res.status(405).send(err.message);
  }
}

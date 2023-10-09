import * as db from "../../db/index.js";
import * as financeService from "../services/financeService.js";
import * as bankService from "../services/bankService.js";

export async function getAllBanks(req, res) {
  try {
    const result = await db.query("SELECT * FROM banks");
    res.send(result.rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export async function getBankById(req, res) {
  const bankId = req.params.id;
  try {
    const bankData = await bankService.getBankById(bankId);
    if (!bankData) {
      res.status(404).send("Banco não encontrado");
    }
    res.send(bankData);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export async function calculaAutoLoan(req, res) {
  const { bankId, loanPrincipal, loanTermMonths } = req.body;

  try {
    const bankData = await bankService.getBankById(bankId);
    const { anual_interest_rate, max_installments } = bankData;
    const monthlyInterestRate =
      financeService.calcMonthlyInterest(anual_interest_rate);

    financeService.validateLoanTerm(loanTermMonths, max_installments);

    const monthlyInstallmentAmount = financeService.calcMonthlyInstallment(
      loanPrincipal,
      monthlyInterestRate,
      loanTermMonths
    );

    const totalLoanCost = monthlyInstallmentAmount * loanTermMonths;

    res.send({ monthlyInstallmentAmount, totalLoanCost });
  } catch (err) {
    res.status(405).send(err.message);
  }
}

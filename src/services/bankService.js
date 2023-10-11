import * as db from "../../db/index.js";

export async function getBankById(bankId) {
  const bank = await db.query("SELECT * FROM banks WHERE id = $1", [bankId]);
  return bank.rows[0];
}

export async function getAllBanks() {
  const banks = await db.query("SELECT * FROM banks");
  return banks.rows;
}
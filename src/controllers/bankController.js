import * as db from "../../db/index.js";

export async function getBanks(req, res) {
    try {
        const result = await db.query("SELECT * FROM banks");
        res.send(result.rows);
    } catch (err) {
        console.log(err);
    }
}

export async function getBank(req, res) {
    const id = req.params.id;
    try {
        const bank = await db.query("SELECT * FROM banks WHERE id = $1", [id]);
        res.send(bank.rows[0]);
    } catch (err) {
        console.log(err)
    }
}

export async function calculaAutoLoan(req, res) {
    //http://localhost:3000/banks/finance?id=1&principal=4&months=4
    const id = req.params.id;
    const principal = req.params.principal;
    const months = req.params.months;
    try {
        const interest = await db.query("SELECT anual_interest_rate FROM banks WHERE id = $1", [id]);
        res.send({
            "interest": interest.rows[0],
            "principal": principal,
            "months": months
        });
    } catch (err) {
        console.log(err)
    }
}
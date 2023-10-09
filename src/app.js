import express from "express";
import * as bankController from "./controllers/bankController.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Atividade de Node: Finanças"))

app.get("/banks", bankController.getAllBanks);

app.get("/banks/:id", bankController.getBankById);

app.post("/finance", bankController.calculaAutoLoan);

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

export default app;
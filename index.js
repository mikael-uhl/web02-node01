import express from "express";
import * as bankController from "./src/controllers/bankController.js";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => res.status(200).send("API Bancária"));

app.get("/banks", bankController.getAllBanks);

app.get("/banks/:id", bankController.getBankById);

app.post("/finance", bankController.calculaAutoLoan);

app.get("/finance", (req, res) => res.sendFile(path.join(__dirname, "public", "finance.html")));

const port = 3000;

app.listen(port, () => console.log("Servidor escutando em http://localhost:" + port));

export default app;
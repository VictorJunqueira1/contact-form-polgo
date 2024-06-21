import express from "express";
import * as dotenv from "dotenv";
import "./config/connection.js";
import { Contact } from "./models/Contact.js";
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

console.log(process.env.MONGO_PORT);

app.post("/submit", async (request, response) => {
    try {
        const { name, email, message } = request.body;
        if (name.length < 3) {
            return response.status(411).json({
                error: "Insira um nome com no mínimo 3 caracteres."
            });
        }

        if (message.length < 10) {
            return response.status(411).json({
                error: "Insira no mínimo 10 caracteres na mensagem."
            });
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return response.status(406).json({
                error: "Insira um e-mail válido."
            });
        }

        const contact = new Contact();
        const contactCollection = contact.db.collection("contacts");
        await contactCollection.insertOne({ name, email, message });
        console.log("Mensagem inserida no banco de dados");
        
        return response.status(200).json({
            message: "Mensagem do usuário enviada com sucesso."
        });
    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        return response.status(500).json({
            error: "Ocorreu um erro ao processar a sua requisição."
        });
    }
});

app.listen(PORT, () => {
    console.log("Servidor rodando na porta: " + PORT);
});
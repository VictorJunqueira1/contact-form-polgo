import e, { json } from "express"
import * as dotenv from "dotenv"
import "./config/connection.js"
dotenv.config()

const app = e()
const PORT = 3000
app.use(json())
console.log(process.env.MONGO_PORT)

app.post("/submit", (request, response) => {
    const { name, email, message } = request.body
    
    if (name.length < 3) {
        return response.status(411).json({
            error: "Insira um nome com no mínimo 3 caracteres."
        })
    } 

    if (message.length < 10) {
        return response.status(411).json({
            error: "Insira no mínimo 10 caracteres na mensagem."
        })
    } 

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) {
        return response.status(406).json({
            error: "Insira um e-mail válido."
        })
    }

    return response.status(200).json({
        message: "Mensagem do usuário enviada com sucesso."
    })

    /* 
        Passo 1: Pegar valor do email 
        Passo 2: Verificar se o email já existe no banco de dados
        Passo 3: Se existir, não deixar inserir
        Passo 4: Se não existir, registrar
    */
})

app.listen(PORT, () => {
    console.log("Servidor rodando na porta: " + PORT)
}) 
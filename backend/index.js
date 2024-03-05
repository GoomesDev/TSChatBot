const express = require('express')
const cors = require('cors')
const { NlpManager } = require('node-nlp')

const app = express()
app.use(cors())
app.use(express.json())
const port = 8000
const manager = new NlpManager({ languages: ['pt-br'] })

manager.load('./model.nlp')

app.post('/run', async (req, res) => {
    try {
        const { input } = req.body
        let response = await manager.process('pt-br', input)
        res.json({ answer: response.answer })
    } catch (eror){
        res.status(500).json({ error: 'Ocorreu um erro ao processar a requisição.' })
    }
})

app.listen(port, () => {
    console.log(`TSChatBot rodando na porta ${port}`)
})

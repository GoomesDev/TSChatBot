require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { NlpManager } = require('node-nlp')

const app = express()
app.use(cors())
app.use(express.json())
const port = 8000
const manager = new NlpManager({ languages: ['en'] })

manager.load('./model.nlp')

app.post('/run', async (req, res) => {
    try {
        const { input } = req.body
        let response = await manager.process('en', input)
        res.json({ answer: response.answer })
    } catch {
        console.error(error)
        res.status(500).json({ error: 'Error' })
    }
})

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`)
})

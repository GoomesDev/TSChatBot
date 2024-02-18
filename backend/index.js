require('dotenv').config()
const { HfInference } = require("@huggingface/inference")
const HF_TOKEN = process.env.HUGGING_AI_KEY
const inference = new HfInference(HF_TOKEN)
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 8000

app.use(bodyParser.json())
app.use(cors())

app.post('/run', async (req, res) => {
    try {
        const { input } = req.body
        const response = await inference.textGeneration({
            model: 'gpt2',
            inputs: input
          })
          // for await (const output of inference.textGenerationStream({
          //   model: "google/flan-t5-xxl",
          //   inputs: 'repeat "one two three four"',
          //   parameters: { max_new_tokens: 250 }
          // }))
          res.json({response})
    } catch {
        res.status(500).json({ error: 'Erro ao processar a requisição' })
    }
})

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`)
})

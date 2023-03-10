const express = require('express')

const {googleSearch, reply}  = require('./requests.js')
const {port} = require('./config.js')

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', async (req, res) => {
    const result = await googleSearch(req.query?.q)
    res.send(result || 'Ничего не найдено')
})

app.post('/', async (req, res) => {
    const { message } = req.body
    const messageText = message?.text?.toLowerCase()?.trim()
    const chatId = message?.chat?.id
    try {
        const result = await googleSearch(messageText)
        const {volumeInfo} = result.items[0]
        let text = volumeInfo.imageLinks?.thumbnail
        if (!text) {
            text = `${volumeInfo.authors.join(', ')} ${volumeInfo.title}`
        }
        await reply(text, chatId)
        res.end()
    } catch(e) {
        console.log(e)
        await reply('Ничего не найдено', chatId)
        res.end()
    }
})

try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
} catch(e) {
    console.log(e)
    process.exit(1)
}

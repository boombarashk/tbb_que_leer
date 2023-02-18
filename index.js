const express = require('express')

const {googleSearch, booksListSearch}  = require('./requests.js')
const {port} = require('./config.js')

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', async (req, res) => {
    const result = await googleSearch(req.query?.q)
    res.send(result || 'Ничего не найдено')
})

app.post('/new-message', async (req, res) => {
    const { message } = req.body
    const messageText = message?.text?.toLowerCase()?.trim()
    const chatId = message?.chat?.id
    console.log(chatId, messageText)

    if (!messageText || !chatId) {
        return res.sendStatus(400)
    }
    const result = await googleSearch(req.body?.q)
    //res.json({items: result?.items || []})
    res.json({thumbnail: result.data?.items[0]?.volumeInfo.imageLinks.thumbnail || null})
})

try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
} catch(e) {
    console.log(e)
    process.exit(1)
}

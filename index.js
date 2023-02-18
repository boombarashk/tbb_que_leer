const express = require('express')
//const bodyParser = require('body-parser')
const {googleSearch, booksListSearch}  = require('./requests.js')
const {port} = require('./config.js')
const axios = require('axios');
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', async (req, res) => {
    const result = await googleSearch(req.query?.q)
    res.send(result || 'Ничего не найдено')
})

app.post('/', async (req, res) => {
    const result = await googleSearch(req.body?.q)
    res.json({items: result?.items || []})
})

try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
} catch(e) {
    console.log(e)
    process.exit(1)
}

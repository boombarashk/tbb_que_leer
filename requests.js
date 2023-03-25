const axios = require('axios');
const { GoogleSpreadsheet } = require('google-spreadsheet')

const {telegramToken, spreadsheetId, client_email, private_key} = require('./config.js')

const googleSearch = async (searchString) => {
    const searchUrl = 'https://www.googleapis.com/books/v1/volumes'
    const {data, status, statusText} = await axios.get(`${searchUrl}?q=${searchString}`)
    if (status !== 200) {
        console.log(statusText)
    }
    return data
}

const sheetGetRandomBook = async (messageText) => {
    const doc = new GoogleSpreadsheet(spreadsheetId)
    await doc.useServiceAccountAuth({
        client_email,
        private_key: private_key?.replace(/\\n/g, '\n')
    })

    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    await sheet.loadCells(`A1:C${sheet.rowCount}`)

    const offsetIndex = 4
    // const FORMULA = `=CONCATENATE("Всего: "; COUNTIF($A$4:$A$150; true); "/"; COUNTA($C$4:$C$150))`
    const valueDataLines = sheet.getCell(0, 2).value
    const countDataLines = +valueDataLines.slice(valueDataLines.indexOf('/') + 1) || sheet.rowCount

    const booksNoRead = []
    for (let rowIndex=offsetIndex; rowIndex< countDataLines + offsetIndex; rowIndex++) {
        if(!sheet.getCellByA1(`A${rowIndex}`).value) {
            //fixme find messageText
            booksNoRead.push(sheet.getCellByA1(`C${rowIndex}`).value)
        }
    }
    const randomIndex = Math.floor(Math.random() * booksNoRead.length)
    return booksNoRead[randomIndex]
}

const reply = async( text, chatId, reply_to_message_id) => {
    await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {chat_id: chatId, text})
        .then(response => console.log(response.status))
        .catch(e => console.log(e))
}

module.exports = { googleSearch, sheetGetRandomBook, reply }

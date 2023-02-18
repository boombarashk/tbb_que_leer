const dotenv  = require('dotenv')
dotenv.config()

module.exports = {
    port: process.env.PORT,
    spreadsheetId: process.env['GOOGLE_DOC_ID']
}

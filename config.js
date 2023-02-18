const dotenv  = require('dotenv')
dotenv.config()

module.exports = {
    port: process.env.PORT || 3000,
    spreadsheetId: process.env['GOOGLE_DOC_ID']
}

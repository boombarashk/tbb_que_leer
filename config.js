const dotenv  = require('dotenv')
dotenv.config()

module.exports = {
    local: process.env['IS_LOCAL'],
    port: process.env.PORT || 3000,
    spreadsheetId: process.env['GOOGLE_DOC_ID'],
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    telegramToken: process.env['TELEGRAM_TOKEN'],
}

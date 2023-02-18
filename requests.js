const axios = require('axios');
const {google} = require('googleapis');

const {spreadsheetId} = require('./config.js')

const sheets = google.sheets('v4');

const googleSearch = async (searchString) => {
    const searchUrl = 'https://www.googleapis.com/books/v1/volumes'
    const {data, status, statusText} = await axios.get(`${searchUrl}?q=${searchString}`)
    if (status !== 200) {
        console.log(statusText)
    }
    return data
}

const booksListSearch = async () => {
    //fixme const authClient = await authorize();
    const request = {
        spreadsheetId,

        // The ranges to retrieve from the spreadsheet.
        ranges: ['A4:A154'],

        // True if grid data should be returned.
        // This parameter is ignored if a field mask was set in the request.
        includeGridData: false,  // TODO: Update placeholder value.

        //auth: authClient,
    };

    try {
        const response = (await sheets.spreadsheets.get(request)).data;
        // TODO: Change code below to process the `response` object:
        console.log(JSON.stringify(response, null, 2));
    } catch (err) {
        console.error(err);
    }
}

module.exports = { googleSearch, booksListSearch }

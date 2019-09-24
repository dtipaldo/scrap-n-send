const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.rate.com/loan-expert/andrewmarquis'

axios.get(url)
    .then ( response => {
        console.log(response.data);
    })
    .catch( error => {
        console.log(error)
    });
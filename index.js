const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({
    show: false
    });

const url = 'https://www.rate.com/loan-expert/andrewmarquis'

fixedRate30 = null;

nightmare
    .goto(url)
    .wait('.todaysRates-container')
    .evaluate(() => document.querySelector('.todaysRates-container').innerHTML)
    .end()
    .then( response => {
        console.log(getFixedRate30(response));
    })
    .catch(err => {
        console.log(err);
    });

function getFixedRate30(html) {
    const $ = cheerio.load(html);
    return $('table.gr-table').find('tbody tr:nth-child(1)').text();
}


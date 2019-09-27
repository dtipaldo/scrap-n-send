const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const moment = require('moment');
// const Date = require('date');

class RateScraper {
    constructor(URL) {
        this.previousFixedRate30 = null;
        this.currentFixedRate30 = null;
        this.URL = URL;
        // this.nightmare = nightmare;
    }

    async fetchAndEmail() {
        this.currentFixedRate30 = await this.fetchRateAsync();
        if (this.previousFixedRate30 == this.currentFixedRate30) {
           console.log("Rate is the same!");
        }
        console.log(moment().toString(), "-", this.currentFixedRate30);
        this.previousFixedRate30 = this.currentFixedRate30;
    }

    async fetchRateAsync() {
        const nightmare = Nightmare({show: false});
        return nightmare
            .goto(this.URL)
            .wait('.todaysRates-container')
            .evaluate(() => {
                return document.querySelector('body').innerHTML;
            })
            .end()
            .then(response => {
                return this.parseFixedRate30(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    parseFixedRate30(html) {
        const $ = cheerio.load(html);
        const fixedRate30 = $('table.gr-table').find('tbody tr:nth-child(1) td:nth-child(2)').text();
        return Number(fixedRate30.split('%')[0]);
    }
}

const URL = 'https://www.rate.com/loan-expert/andrewmarquis';
// const nightmare = Nightmare({show: false});

rateScraper = new RateScraper(URL);
interval = setInterval(() => rateScraper.fetchAndEmail(),10000);
// interval = setInterval(async function () {
//     await rateScraper.fetchRateAsync();
//     if (rateScraper.previousFixedRate30 == rateScraper.currentFixedRate30) {
//         console.log("Rate is the same!")
//     }
//     console.log(moment().toString(), "-", this.currentFixedRate30);
//     rateScraper.previousFixedRate30 = rateScraper.currentFixedRate30
//
// }, 10000 );

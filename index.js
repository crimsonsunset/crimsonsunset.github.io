var inScrape = require('in-scrape')
inScrape.getProfile('https://linkedin.com/in/josephsangiorgio')
    .then(function(profile) {
        console.log(profile)
    })
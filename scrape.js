const request = require('request');
const cheerio = require('cheerio');

request('https://www.destructoid.com/', (error, response, html) => {
	if (!error && response.statusCode === 200) {
		const $ = cheerio.load(html);

		const mediaTitle = $('.article');
		console.log(mediaTitle.html());
	}
});

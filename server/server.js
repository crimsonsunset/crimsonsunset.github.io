const express = require('express');
const app = express();
const mailjet = require('node-mailjet')
	.connect('a62b98ba9d1b79455f9f92ef61b8eed2', 'ea86a27e20e56f8a9cf4f79a8c08f6e0')


app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', function (req, res) {
	res.send('Hello World!')
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})


/**
 * This call sends an email to one recipient, using a validated sender address
 * Do not forget to update the sender address used in the sample
 */


function sendMail() {
	console.log('about to sendzz', mailjet)
	let request = mailjet
		.post("send")
		.request({
			"FromEmail": "jsangio1@gmail.com",
			"FromName": "Mailjet Pilot",
			"Subject": "Your email flight plan!",
			"Text-part": "Dear passenger, welcome to Mailjet! May the delivery force be with you!",
			"Html-part": "<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
			"Recipients": [
				{
					"Email": "passenger@mailjet.com"
				}
			]
		});


	// request
	// 	.on('success', function (response, body) {
	// 		console.log(response.statusCode, body);
	// 	})
	// 	.on('error', function (err, response) {
	// 		console.log(response.statusCode, err);
	// 	});
}


sendMail();


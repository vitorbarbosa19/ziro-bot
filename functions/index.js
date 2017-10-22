const functions = require('firebase-functions');
const request = require('request')
const url = require('url')


exports.zirobot = functions.https.onRequest( (req, res) => {
	
	const max_quantity = url.parse(req.url, true).query.quantity //parses the query string from the url request in order to retrieve the 'quantity' param
	const ig_account = url.parse(req.url, true).query.account_name
	
	request(`http://www.instagram.com/${ig_account}/media`, (error, response, body) => {
		if(!error) {
			const arrayOfImagesUrls = JSON.parse(body).items.map( post => {
				return post.images.standard_resolution.url
			})
			
			res.setHeader('Access-Control-Allow-Origin', '*') //REMOVE if deployed to custom domain

			res.end(JSON.stringify(arrayOfImagesUrls.slice(0, max_quantity))) //send only the requested amount
		}
		else
			console.log(error)
	})
})
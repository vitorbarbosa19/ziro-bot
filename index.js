//This is a micro server configured to behave as an API for the Ziro catalog of clothes
//It fetches images from IG public accounts and serves them to clients that send GET requests to the API endpoint '/'
//Clients must provide as query params the name of the account whose images will be fetched from and also how many images should be fetched

const request = require('request')
const url = require('url')

module.exports = (req, res) => {
	
	const max_quantity = url.parse(req.url, true).query.quantity //parses the query string from the url request in order to retrieve the 'quantity' param
	const ig_account = url.parse(req.url, true).query.account_name
	
	request(`https://www.instagram.com/${ig_account}/media`, function(error, response, body) {
		const arrayOfImagesUrls = JSON.parse(body).items.map( function(post) {
			return post.images.standard_resolution.url
		})
		
		res.setHeader('Access-Control-Allow-Origin', '*')
		
		res.end(JSON.stringify(arrayOfImagesUrls.slice(0, max_quantity))) //send only the requested amount

	})
}

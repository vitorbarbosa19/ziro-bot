const request = require('request')

module.exports = (req, res) => {
	request('https://www.instagram.com/ziromoda/media/?max_id=1', function(error, response, body) {
		const arrayOfImagesUrls = JSON.parse(body).items.map( function(post) {
			return post.images.standard_resolution.url
		})
		res.end(JSON.stringify(arrayOfImagesUrls))
	})
}

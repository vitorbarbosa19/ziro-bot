const express = require('express')
const request = require('request')

exports.ziroBot = function(req, res) {

	const app = express()

	app.get('/', function (req, res) {
		request('https://www.instagram.com/ziromoda/media/?max_id=1', function(error, response, body) {
			const images = JSON.parse(body).items.map( function(post) {
				return post.images.standard_resolution.url
			})
			res.send(images)
		})
	})

	app.listen(8080, function() {
		console.log('App is running at http://localhost:8082')
	})

}

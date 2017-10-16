const express = require('express')
const request = require('request')

const app = express()

app.get('/', function (req, res) {
	request('https://www.instagram.com/ziromoda/media/?max_id=1', function(error, response, body) {
		const images = JSON.parse(body).items.map( function(post) {
			return post.images.standard_resolution.url
		})
		res.send(images)
	})
})

app.listen(8082, function() {
	console.log('App is running at http://localhost:8082')
})
const request = require('request')

exports.ziroBot = function ziroBot (req, res) {
	request('https://www.instagram.com/ziromoda/media/?max_id=1', function(error, response, body) {
		const images = JSON.parse(body).items.map( function(post) {
			return post.images.standard_resolution.url
		})
		res.send(images)
	})
}

if (module === require.main) {
	const server = ziroBot.listen(process.env.PORT || 8081, function() {
		console.log(`Ziro Bot is listening on port ${server.address().port}`)
	})
}

// ziroBot.listen(8080, function() {
// 	console.log('Ziro Bot is listening on address http://localhost:8080')
// })

const { send } = require('micro')

module.exports = async (req, res) => {
	try {
		let response
		switch (req.url) {
			case '/scrape':
				const scrapeAccount = require('./functions/scrapeAccount')
				response = await scrapeAccount(req)
			case '/download':
				const downloadImageUrl = require('./functions/downloadImageUrl')
				response = await downloadImageUrl(req)
			default:
				response = '404. Rota não encontrada.'
				break
		}
		send(res, 200, response)
	} 
	catch (error) {
		console.log(error)
		send(res, 500, error)
	}
}

// const express = require('express')
// const request = require('request')

// const brand = {
// 	name: 'luzia',
// 	url: 'https://instagram.fsnc1-1.fna.fbcdn.net/t51.2885-15/e35/23507546_970353509784421_6944867946179067904_n.jpg'
// }

// const igAccount = 'https://instagram.com/nuxxoficial'

// const app = express()

// app.get('/', (req, res) => {
// 	res.attachment(`${brand.name}.jpg`)
// 	request(brand.url).pipe(res)
// })

// app.get('/scraper', async (req, res) => {
// 	const scrapeAccount = require('./functions/scrapeAccount')
// 	anchorTagsHrefs = await scrapeAccount(igAccount)
// 	const scrapeImagePage = require('./functions/scrapeImagePage')
// 	imageSrcs = await scrapeImagePage(anchorTagsHrefs)
// 	console.log(imageSrcs)
// 	res.send(imageSrcs)
// })

// app.listen(3000, () => console.log('Listening on port 3000'))
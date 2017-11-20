const { send } = require('micro')

module.exports = async (req, res) => {
	if(req.url === '/favicon.ico')
		res.end()
	else {
		// load from google spreadsheet a list of all ig accounts and the last download date for each
	  let igAccountsAndDownloadDates = []
	  try {
	  	const brands = require('./utils/brandsApi')
	  	igAccountsAndDownloadDates = await brands.fetchDownloadDates()
	  	//console.log(igAccountsAndDownloadDates)
	  } catch (error) {
	  		console.log(error.response.data)
	  		send(res, 200, error.response.data)
	  }
	  // iterate over all ig accounts loaded on previous step, saving all image urls for each account
	  let allImageUrls = []
	  try {
		  const scraper = require('./utils/igApi')
		  allImageUrls = await scraper(igAccountsAndDownloadDates)
		  console.log(allImageUrls)
	  } catch (error) {
		  	console.log(error)
		  	send(res, 200, error)
	  }

	  // await page.goto('https://instagram.com/ziromoda')
	  // const allAnchors = await page.evaluate( () => {
	  // 	return [].map.call(document.getElementsByTagName('a'), a => a.href)
	  // })
	  // console.log(allAnchors)
	  // await page.goto(allAnchors[1])
	  // const imgUrl = await page.evaluate( () => {
	  // 	return [].map.call(document.getElementsByTagName('img'), img => img.src)
	  // })
	  // const dates = await page.evaluate( () => {
	  // 	return [].map.call(document.getElementsByTagName('time'), time => time.getAttribute('datetime'))
	  // })
	  // console.log(dates)
	  

	  // console.log(imgUrl)
	  // const download = require('image-downloader')
	  // downloadImg = imgUrl.map( async (url) => {
	  // 	try {
	  // 		await download.image({
	  // 			url: url,
	  // 			dest: './ziromoda-test'
	  // 		})
	  // 	} catch (e) {
	  // 		throw e
	  // 	}
	  // })
	  // const fs = require('fs')
	  // fs.readFile('ziromoda-test/23668253_1923276864600271_5433236622755758080_n.jpg', (err, content) => {
	  // 	res.setHeader('Content-Disposition', 'attachment; filename=ziro.png')
	  // 	send(res, 200, content)
	  // })


/*---------------------------------------------------------*/

	  // const allImageUrls = await page.evaluate( () => {
	  // 	return [].map.call(document.getElementsByTagName('img'), img => img.src)
	  // })
	  // console.log(allImageUrls)
	  // fs.readFile('ziromoda/20838567_353647165048038_4464948224536346624_n.jpg', (err, content) => {
	  // 	res.setHeader('Content-Disposition', 'attachment; filename=ziro.png')
	  // 	send(res, 200, content)
	  // })

	  // const download = require('image-downloader')
	  // downloadImg = allImageLinks.map( async (imageUrl) => {
	  // 	try {
	  // 		await download.image({
	  // 			url: imageUrl,
	  // 			dest: './ziromoda'
	  // 		})
	  // 	} catch (e) {
	  // 		throw e
	  // 	}
	  // })
	}
}








// const request = require('request')
// const url = require('url')

// module.exports = (req, res) => {
	
// 	const max_quantity = url.parse(req.url, true).query.quantity //parses the query string from the url request in order to retrieve the 'quantity' param
// 	const ig_account = url.parse(req.url, true).query.account_name
	
// 	request(`https://www.instagram.com/${ig_account}/media`, function(error, response, body) {
// 		const arrayOfImagesUrls = JSON.parse(body).items.map( function(post) {
// 			return post.images.standard_resolution.url
// 		})
		
// 		res.setHeader('Access-Control-Allow-Origin', '*')
		
// 		res.end(JSON.stringify(arrayOfImagesUrls.slice(0, max_quantity))) //send only the requested amount

// 	})
// }

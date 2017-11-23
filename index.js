const { send } = require('micro')

module.exports = async (req, res) => {
	if(req.url !== '/favicon.ico') {
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
	  let accountData = []
	  try {
		  const scraper = require('./utils/scraper')
		  accountData = await scraper(igAccountsAndDownloadDates)
	  } catch (error) {
		  	console.log(error)
		  	send(res, 200, error)
	  }
	  // visit each image url and download the image if it's newer than the last download date
	  let result = []
	  try {
	  	const downloader = require('./utils/downloader')
	  	result = await downloader(accountData)
	  	console.log(result)
	  } catch (error) {
	  		console.log(error)
	  		send(res, 200, error)
	  }

	  const mkdir = require('mkdirp')
	  const download = require('image-downloader')
	  Promise.all(result.map( (allUrls) => {
	  	return Promise.all(allUrls.map( (url) => {
	  		return new Promise( async (resolve, reject) => {
		  		await download.image({
		  			url: url,
		  			dest: './images'
		  		})
		  	})
	  	}))
	  }))
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
	}
}

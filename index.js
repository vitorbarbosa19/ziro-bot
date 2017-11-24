const { send } = require('micro')

module.exports = async (req, res) => {
	if(req.url !== '/favicon.ico') {
		// load from google spreadsheet a list of all target ig accounts and the last download date for each
	  let igAccountsAndDownloadDates = []
	  try {
	  	const brands = require('./utils/brandsApi')
	  	igAccountsAndDownloadDates = await brands.fetchAccountsAndDownloadDates()
	  } catch (error) {
	  		console.log(error.response.data)
	  		send(res, 200, error.response.data)
	  }
	  // iterate over all ig accounts loaded on previous step, scraping all image urls for each account
	  let imageUrlsToScrape = []
	  try {
		  const scrapeHomepage = require('./utils/scrapeHomepage')
		  imageUrlsToScrape = await scrapeHomepage(igAccountsAndDownloadDates)
	  } catch (error) {
		  	console.log(error)
		  	send(res, 500, `Error on server function 'scrapeHomepage'`)
	  }
	  // visit each image url and store the image src if it's been published after than the last download date
	  let photosToDownload = []
	  try {
	  	const scrapeImageUrl = require('./utils/scrapeImageUrl')
	  	photosToDownload = await scrapeImageUrl(imageUrlsToScrape)
	  } catch (error) {
	  		console.log(error)
	  		send(res, 500, `Error on server function 'scrapeImageUrl'`)
	  }
	  // download to server directory all of the recent images identified in each target account
	  let downloadStatus = []
	  try {
	  	const downloadToServer = require('./utils/downloadToServer')
	  	downloadStatus = await downloadToServer(photosToDownload)
	  } catch (error) {
	  		console.log(error)
	  		send(res, 500, `Error on server function 'downloadToServer'`)
	  }
	  console.log('Status:', downloadStatus)

	  // const fs = require('fs')
	  // fs.readFile('ziromoda-test/23668253_1923276864600271_5433236622755758080_n.jpg', (err, content) => {
	  // 	res.setHeader('Content-Disposition', 'attachment; filename=ziro.png')
	  // 	send(res, 200, content)
	  // })
	}
}

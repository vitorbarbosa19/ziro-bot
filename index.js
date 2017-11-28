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
	  		send(res, 500, error.response.data)
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
	  	await downloadToServer(photosToDownload)
	  } catch (error) {
	  		console.log(error)
	  		send(res, 500, `Error on server function 'downloadToServer'`)
	  }
	  // send all images in server directory as a zip to the client app for download and then clear server directory
 		try {
 			const downloadToClient = require('./utils/downloadToClient')
 			const zipWithImages = await downloadToClient()
 			res.setHeader('Content-Disposition', 'attachment; filename=images.zip')
 			send(res, 200, zipWithImages)
 			// clear directory by deleting the zip file and the images folder
 			const clearDirectory = require('./utils/clearDirectory')
 			console.log(await clearDirectory())
 		} catch (error) {
 				console.log(error)
 				send(res, 500, `Error on server function 'downloadToClient'`)
 		}
	}
}

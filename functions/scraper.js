const scraper = async (igAccounts) => {
	try {
		// iterate over each instagram account to scrape from their feeds all the recent images URLs
		const scrapeAccount = require('./scrapeAccount')
		const scrapeImagePage = require('./scrapeImagePage')
		for (let index = 0; index < igAccounts.length; index++) {
			const anchorTagsHrefs = await scrapeAccount(igAccounts[index])
			const imagesToDownload = await scrapeImagePage(anchorTagsHrefs, igAccounts[index])
		}
		return 'Success'
	} catch (error) {
		return {
			message: 'Error on function scraper()',
			error: error
		}
	}
}

module.exports = scraper

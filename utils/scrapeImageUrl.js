const executeScraper = require('./executeScraper')

const scrapeImageUrl = (accountData) => {
	return Promise.all(accountData.map( (account) => {
		return new Promise( async (resolve, reject) => {
			try {
				const photosSrcs = await executeScraper(account)
				resolve({accountName: account.accountName, photosSrcs: photosSrcs, lastDownload: account.lastDownload })
			} catch (error) {
					reject(error)
			}
		})
	}))
}

module.exports = scrapeImageUrl

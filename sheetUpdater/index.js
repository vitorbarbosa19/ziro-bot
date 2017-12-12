const sheetUpdater = (accountsScraped) => {
	return new Promise( async (resolve, reject) => {
		try {
			// authenticate to get permission to edit the spreadsheet
			const auth = require('./authenticate')
			const { authResult, spreadsheet } = await auth()
			if (authResult === 'success') {
				// get all cells from spreadsheet
				spreadsheet.getCells(1, (error, cells) => {
					// save to spreadsheet the update date and time for all scraped accounts
					if (error)
						reject(error)
					const getCellsToUpdate = require('./getCellsToUpdate')
					const updateDatesToSheet = require('./updateDatesToSheet')
					resolve(updateDatesToSheet(getCellsToUpdate(accountsScraped, cells)))
					})
			} else {
				reject(authResult)
			}
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = sheetUpdater

const updateDatesToSheet = (accountsScraped) => {
	return new Promise ( async (resolve, reject) => {
		try {
			// authenticate to get permission to edit the spreadsheet
			const auth = require('./authenticate')
			const { authResult, sheet } = await auth()
			if (authResult === 'success') {
				// get all rows from spreadsheet
				sheet.getRows(1, (error, rows) => {
					if (error) {
						reject(error)
					}
					// save to spreadsheet the update date for all accounts scraped
					accountsScraped.map( (account) => {
						rows.map( (row) => {
							if (account.name === row.instagram) {
								row.update = account.update
								row.save()
							}
						})
					})
					resolve('Spreadsheet updated successfully!')
				})
			} else {
				reject(authResult)
			}
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = updateDatesToSheet

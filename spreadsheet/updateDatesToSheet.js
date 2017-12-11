const updateDatesToSheet = async (accountsScraped) => {
	try {
		// authenticate to get permission to edit the spreadsheet
		const auth = require('./authenticate')
		const { authResult, sheet } = await auth()
		if (authResult === 'success') {
			// get all rows from spreadsheet
			sheet.getRows(1, (error, rows) => {
				if (error)
					return error
				// save to spreadsheet the update date for all accounts scraped
				accountsScraped.map( (account) => {
					rows.map( (row) => {
						if (account.name === row.instagram) {
							row.update = account.update
							row.save()
						}
					})
				})
				return 'success'
			})
		}
		return authResult
	} catch (error) {
		return error
	}
}

module.exports = updateDatesToSheet

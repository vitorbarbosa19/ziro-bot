const saveToGoogleSheet = async () => {
	try {
		const accountsScraped = ['limonemodas', 'averarafashion']
		const auth = require('./authenticate')
		const { authResult, sheet } = await auth()
		if (authResult === 'success') {
			sheet.getRows(1, (error, rows) => {
				accountsScraped.map( (account) => {
					rows.map( (row) => {
						if (account === row.instagram) {
							row.update = '2017-11-30T12:00:00.000Z'
							row.save()
						}
					})
				})
			})
		}
	} catch (error) {
		console.log(error)
	}
}

saveToGoogleSheet()

const saveToGoogleSheet = async () => {
	try {
		const auth = require('./authenticate')
		const { authResult, sheet } = await auth()
		if (authResult === 'success') {
			sheet.getCells(1, (error, cells) => {
				if (error) {
					console.log(error)
				}
				cells.map( (cell) => {
					console.log(cell.value)
				})
			})
		}
	} catch (error) {
		console.log(error)
	}
}

saveToGoogleSheet()

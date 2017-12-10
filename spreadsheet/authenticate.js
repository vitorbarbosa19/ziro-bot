const authenticate = () => {
	try {
		require('dotenv').config()
		const GoogleSpreadsheet = require('google-spreadsheet')
		const credentials = require('./credentials')
		const spreadsheet = new GoogleSpreadsheet(process.env.ACCOUNTS_SHEET_ID)
		return new Promise( (resolve, reject) => {
			spreadsheet.useServiceAccountAuth(credentials, (error) => {
				if(error)
					reject({
						authResult: error,
						sheet: null
					})
				resolve({
					authResult: 'success',
					sheet: spreadsheet
				})
			})
		})
	}	catch (error) {
		return error
	}
}

module.exports = authenticate

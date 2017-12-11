const authenticate = () => {
	try {
		// load google credential file to module function for authentication
		require('dotenv').config()
		const GoogleSpreadsheet = require('google-spreadsheet')
		const credentials = require('./credentials')
		const spreadsheet = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
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

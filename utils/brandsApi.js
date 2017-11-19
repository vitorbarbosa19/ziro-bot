require('dotenv').config()
const axios = require('axios')

exports.fetchDownloadDates = () => {
	return new Promise ( async (resolve, reject) => {
		try {
			googleSheet = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.BRANDS_SHEET_ID}/values/updates?key=${process.env.API_KEY}`)
			resolve(googleSheet.data.values.splice(1, googleSheet.data.values.length - 1))
		} catch (error) {
			reject(error)
		}
	})
}
const getBrands = async () => {
	try {
		require('dotenv').config()
		// get brands information from google spreadsheet
		const requestPromise = require('request-promise-native')
		const brandsInfo = JSON.parse(await requestPromise(process.env.SPREADSHEET_URL))
		// save the name of all instagram accounts, remove first element (sheet title row) and return
		const igAccounts = brandsInfo.values.map( (brandInfo) => brandInfo[1])
		igAccounts.shift()
		return igAccounts
	} catch (error) {
		return error
	}
}

module.exports = getBrands
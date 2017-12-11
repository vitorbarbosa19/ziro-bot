const bot = async () => {
	try {
		// const getAccounts = require('./spreadsheet/getAccountsFromSheet')
		// const igAccounts = await getAccounts()
		// const scraper = require('./scraper/index')
		// const igAccountsTest = ['luziafazzollioficial']
		// console.log(await scraper(igAccountsTest))
		const updateDates = require('./spreadsheet/updateDatesToSheet')
		const datesTest = [{ name: 'luziafazzollioficial', update: '2017-12-08T12:00:00.000Z'}]
		console.log(await updateDates(datesTest))
	} catch (error) {
		console.log(error)
	}
}

bot()

const bot = async () => {
	try {
		const getAccounts = require('./spreadsheet/getAccountsFromSheet')
		const igAccounts = await getAccounts()
		const scraper = require('./scraper/index')
		//const igAccountsTest = [{ name: 'luziafazzollioficial', update: '2017-12-09T12:00:00.000Z'}, { name: 'talguistore', update: '2017-12-09T12:00:00.000Z'}]
		const accountsScraped = await scraper(igAccounts)
		const updateDates = require('./spreadsheet/updateDatesToSheet')
		console.log(await updateDates(accountsScraped))
	} catch (error) {
		console.log(error)
	}
}

bot()

const bot = async () => {
	try {
		const getAccounts = require('./sheetUpdater/getAccountsFromSheet')
		const igAccounts = await getAccounts()
		const scraper = require('./scraper/index')
		const accountsScraped = await scraper(igAccounts)
		console.log(`Downloads complete! ${accountsScraped.length} accounts scraped!`)
		const sheetUpdater = require('./sheetUpdater/index')
		const updateStatus = await sheetUpdater(accountsScraped.map( (account) => { return account.name }))
		console.log(`Updated ${updateStatus.length} accounts on spreadsheet!`)
	} catch (error) {
		console.log(error)
	}
}

bot()

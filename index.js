const bot = async () => {
	try {
		const getAccounts = require('./sheetUpdater/getAccountsFromSheet')
		const igAccounts = await getAccounts()
		const scraper = require('./scraper/index')
		const accountsScraped = await scraper(igAccounts)
		if (accountsScraped.message === 'Error on function scraper()') {
			console.log(`Error! No accounts were scraped`)
			console.log(accountsScraped.data)
		} else {
			console.log(`Downloads completed! ${accountsScraped.data.length} accounts scraped!`)
			const sheetUpdater = require('./sheetUpdater/index')
			const updateStatus = await sheetUpdater(accountsScraped.data.map( (account) => { return account.name }))
			console.log(`Updated ${updateStatus.length} accounts on spreadsheet!`)
		}
	} catch (error) {
		console.log(error)
	}
}

bot()

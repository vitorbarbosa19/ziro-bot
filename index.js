const bot = async () => {
	try {
		const getBrands = require('./functions/getBrands')
		const igAccounts = await getBrands()
		const scraper = require('./functions/scraper')
		const igAccountsTest = ['luziafazzollioficial']
		console.log(await scraper(igAccounts))
	} catch (error) {
		console.log(error)
	}
}

bot()

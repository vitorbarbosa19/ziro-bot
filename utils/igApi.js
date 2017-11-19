const puppeteer = require('puppeteer')

const scraper = async (accountsAndDates) => {
  return Promise.all(accountsAndDates.map( ([account, date = new Date(Date.now())]) => {
		return new Promise( (resolve, reject) => {
			puppeteer.launch().then(async browser => {
				try {
					const page = await browser.newPage()
					await page.goto(`https://instagram.com/${account}`)
					const allPageAnchors = await page.evaluate( () => {
						return [].map.call(document.getElementsByTagName('a'), (anchorTag) => anchorTag.href)
					})
					let brandImageUrls = []
					allPageAnchors.map( (anchorTag) => {
						if(anchorTag.search(/\?taken-by=/) !== -1)
							brandImageUrls.push(anchorTag)
					})
					await browser.close()
					resolve(brandImageUrls)
				} catch (error) {
					reject(error)
				}
			})
		})
  }))
}

module.exports = scraper
const puppeteer = require('puppeteer')

const scraper = async (accountsAndDates) => {
  return Promise.all(accountsAndDates.map( ([account, date = new Date(Date.now())]) => {
		return new Promise( (resolve, reject) => {
			puppeteer.launch().then(async browser => {
				try {
					// create a new page and navigate to desired account
					const page = await browser.newPage()
					await page.goto(`https://instagram.com/${account}`)
					// find and click the button that will load 12 more photos, totaling 24
					await page.click(`a[href^='/${account}/?max_id=']`)
					// wait 200 miliseconds for the new photos to appear
					const sleep = require('sleep')
					sleep.msleep(200)
					// find all anchors tags on page
					const allPageAnchors = await page.evaluate( () => {
						return [].map.call(document.getElementsByTagName('a'), (anchorTag) => anchorTag.href)
					})
					// Get only the anchor tags that are photos
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
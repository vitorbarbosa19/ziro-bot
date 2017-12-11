const scrapeAccount = async (igAccount) => {
	// initialize puppeteer and navigate to account page
	const puppeteer = require('puppeteer')
	const browser = await puppeteer.launch({ timeout: 60000 })
	const page = await browser.newPage()
	await page.goto(`https://instagram.com/${igAccount.name}`, { timeout: 60000 })
	// find and click on 'load more' button to load 12 more images, waiting 300ms for them to load on screen
	await page.click(`a[href*='/${igAccount.name}/?max_id=']`)
	await page.waitFor(500)
	// scrape all anchor tags on the page, aiming to find the 24 images loaded on screen
	const anchorTagsHrefs = await page.$$eval('a', (anchorTags) => {
		return Array.prototype.map.call(anchorTags, (a) => a.href)
	})
	await browser.close()
	// filter the anchor tags, leaving only the ones that are images
	const filteredAnchorTagsHrefs = anchorTagsHrefs.filter( (anchorTagHref) => {
		return /\/\?taken-by=/.test(anchorTagHref)
	})
	return filteredAnchorTagsHrefs
}

module.exports = scrapeAccount

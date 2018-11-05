const scrapeAccount = async (igAccount) => {
	// initialize puppeteer and navigate to account page
	const puppeteer = require('puppeteer')
	const browser = await puppeteer.launch({ timeout: 60000 })
	const page = await browser.newPage()
	await page.goto(`https://instagram.com/${igAccount.name}`, { timeout: 60000 })
	// scrolls to bottom of page to load 12 more photos
	await page.evaluate( () => window.scrollBy(0, window.innerHeight))
	await page.waitFor(500)
	// scrape all anchor tags on the page, aiming to find the 24 images loaded on screen
	const anchorTagsHrefs = await page.$$eval('a', (anchorTags) => {
		return Array.prototype.map.call(anchorTags, (a) => a.href)
	})
	await browser.close()
	// filter the anchor tags, leaving only the ones that are images
	const filteredAnchorTagsHrefs = anchorTagsHrefs.filter( (anchorTagHref) => {
		return anchorTagHref.includes('https://www.instagram.com/p/')
	})
	return filteredAnchorTagsHrefs
}

module.exports = scrapeAccount

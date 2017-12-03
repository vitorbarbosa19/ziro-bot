const scrapeAccount = async (igAccount) => {
	const puppeteer = require('puppeteer')
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(`https://instagram.com/${igAccount}`)
	const anchorTagsHrefs = await page.$$eval('a', (anchorTags) => {
		return Array.prototype.map.call(anchorTags, (a) => a.href)
	})
	await browser.close()
	const filteredAnchorTagsHrefs = anchorTagsHrefs.filter( (anchorTagHref) => {
		return /\/\?taken-by=/.test(anchorTagHref)
	})
	return filteredAnchorTagsHrefs
}

module.exports = scrapeAccount

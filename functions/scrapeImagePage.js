const scrapeImagePage = async (anchorTagsHrefs) => {
	const puppeteer = require('puppeteer')
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	const imageSrcs = []
	for (let index = 0; index < anchorTagsHrefs.length; index++) {
		await page.goto(anchorTagsHrefs[index])
		const evalResult = await page.$$eval('img', (imageTags) => {
			return Array.prototype.map.call(imageTags, (img) => img.src)
		})
		imageSrcs.push(evalResult.pop())
	}
	await browser.close()
	return imageSrcs
}

module.exports = scrapeImagePage

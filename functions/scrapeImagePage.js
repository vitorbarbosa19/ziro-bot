const scrapeImagePage = async (anchorTagsHrefs, account) => {
	const puppeteer = require('puppeteer')
	const browser = await puppeteer.launch({ timeout: 60000 })
	const page = await browser.newPage()
	const imageSrcs = []
	const request = require('request')
	const fs = require('fs')
	for (let index = 0; index < anchorTagsHrefs.length; index++) {
		await page.goto(anchorTagsHrefs[index], { timeout: 60000 })
		const evalResult = await page.$$eval('img', (imageTags) => {
			return Array.prototype.map.call(imageTags, (img) => img.src)
		})
		const filteredResult = evalResult.filter( (value) => {
			return /\/e35\//.test(value)
		})
		//imageSrcs.push(evalResult.pop())
		await request(filteredResult.pop()).pipe(fs.createWriteStream(`images/${account}-${index}.jpg`))
	}
	await browser.close()
	return imageSrcs
}

module.exports = scrapeImagePage

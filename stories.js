const puppeteer = require('puppeteer')

puppeteer.launch().then( async (browser) => {
	try {
		const page = await browser.newPage()
		await page.goto(`https://instagram.com`)
		await page.click(`a[href*='javascript']`)
		await page.type(`input[type*='text']`, 'ma.joana_', {delay: 200})
		await page.type(`input[type*='password']`, 'casa10', {delay: 200})
		await page.click(`form > span > button`)
		await page.waitFor(1500)
		await page.screenshot({ path: './images.jpg' })
		// const inputTags = await page.$$eval('input', (inputTags) => {
		// 	return Array.prototype.map.call(inputTags, input => input.placeholder)
		// })
		// console.log(inputTags)
		await browser.close()
	} catch (error) {
		console.log(error)
	}
})


// Poema Hit Stories feed
// https://i.instagram.com/api/v1/feed/user/198255331/story/

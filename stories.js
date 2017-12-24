const puppeteer = require('puppeteer')

puppeteer.launch().then( async (browser) => {
	try {
		const page = await browser.newPage()
		await page.goto(`https://instagram.com`)
		await page.click(`a[href*='javascript']`)
		await page.type(`input[type*='text']`, 'ma.joana_', {delay: 200})
		await page.type(`input[type*='password']`, 'casa10', {delay: 200})
		await page.click(`form > span > button`)
		await page.waitForNavigation()
		const loginChallenge = await page.$$eval('button', (buttonTags) => {
			return Array.prototype.map.call(buttonTags, (button) => { 
				return button.textContent === 'Send Security Code' ? true : false
			}).reduce( (accumulator, currentValue) => {
				return accumulator || currentValue
			})
		})
		if (loginChallenge) {
			await page.screenshot({ path: './screenshots/preChallenge.jpg' })
			await page.click(`form > span`)
			await page.click(`form > span`)
			await page.waitFor(1500)
			await page.screenshot({ path: './screenshots/postSecurityCodeRequest.jpg' })
			const askUserForSecurityCode = require('./askUserForSecurityCode')
			const securityCode = await askUserForSecurityCode()
			await page.type(`#security_code`, securityCode, {delay: 200})	
			await page.click(`form > span`)
			await page.waitForNavigation()
			await page.screenshot({ path: './screenshots/postChallenge.jpg' })
		}
		console.log(await page.cookies())
		await browser.close()
		// const inputTags = await page.$$eval('input', (inputTags) => {
		// 	return Array.prototype.map.call(inputTags, input => input.placeholder)
		// })
		// console.log(inputTags)
		
	} catch (error) {
		console.log(error)
	}
})

// Poema Hit Stories feed
// https://i.instagram.com/api/v1/feed/user/198255331/story/

const puppeteer = require('puppeteer')
process.setMaxListeners(Infinity)

const downloader = async (imageUrls) => {
	return Promise.all(imageUrls.map( (accountUrls) => {
		return Promise.all(accountUrls.map( (url) => {
			return new Promise( (resolve, reject) => {
				puppeteer.launch().then( async browser => {
					try {
						const page = await browser.newPage()
						await page.goto(url, { timeout: 120000 })
						const imageSrc = await page.evaluate( () => {
							return [].map.call(document.getElementsByTagName('img'), img => img.src)
						})
						const publishedDate = await page.evaluate( () => {
							return [].map.call(document.getElementsByTagName('time'), time => time.getAttribute('datetime'))
						})
						await browser.close()
						console.log(imageSrc)
						resolve(imageSrc)
					} catch (error) {
						reject(error)
					}
				})	
			})
		}))
	}))
}

module.exports = downloader

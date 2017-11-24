const puppeteer = require('puppeteer')
process.setMaxListeners(Infinity)

const executeScraper = (account) => {
	return Promise.all(account.imageUrls.map( (url) => {
		return new Promise( (resolve, reject) => {
			puppeteer.launch().then( async browser => {
				try {
					// create a new page and navigate to the image individual page
					const page = await browser.newPage()
					await page.goto(url, { timeout: 120000 })
					// find and store the src attributes of all images in the page (logo and photo)
					const pageImagesSrc = await page.evaluate( () => {
						return [].map.call(document.getElementsByTagName('img'), img => img.src)
					})
					// find and store the time at which the photo was uploaded
					const publishedDate = await page.evaluate( () => {
						return [].map.call(document.getElementsByTagName('time'), time => time.getAttribute('datetime'))
					})
					await browser.close()
					// check if photo's published date is more recent than the last photo downloaded
					if(publishedDate[0] > account.lastDownload) {
						// store only the url of the photo and ignore the url of the logo
						const photoSrc = pageImagesSrc[1]
						resolve(photoSrc)	
					}
					resolve(null)
				} catch (error) {
						reject(error)
				}
			})	
		})
	}))
}

module.exports = executeScraper

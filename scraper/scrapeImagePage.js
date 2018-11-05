const scrapeImagePage = async (anchorTagsHrefs, account) => {
	// initialize puppeteer and navigate to image page
	const puppeteer = require('puppeteer')
	const browser = await puppeteer.launch({ timeout: 60000 })
	const page = await browser.newPage()
	// scrape from each image page the image src url if the image is more recent than the last download
	const request = require('request')
	const fs = require('fs')
	for (let index = 0; index < anchorTagsHrefs.length; index++) {
		await page.goto(anchorTagsHrefs[index], { timeout: 60000 })
		// scrape the published date of the image, so we can skip it if older than our last download date
		const publishedDates = await page.$$eval('time', (timeTags) => {
			return Array.prototype.map.call(timeTags, (time) => time.getAttribute('datetime'))
		})
		const publishedDate = new Date(publishedDates.pop())
		if (publishedDate > account.update) {
			// scrape src of image on the page. Exclude the logo using the sibling selector: header + div img
			let imageSrc = await page.$$eval('header + div img', (imageTags) => {
				return Array.prototype.map.call(imageTags, (img) => img.src)
			})
			// if no image was found, it's probably because the media is a video, so we should get the poster
			if (imageSrc.length === 0) {
				imageSrc = await page.$$eval('video', (videoTags) => {
					return Array.prototype.map.call(videoTags, (video) => video.poster)
				})
			}
			// download each image to a directory by requesting the url and piping to a jpg file
			if (typeof imageSrc !== 'undefined') {
				await request(imageSrc[0]).pipe(fs.createWriteStream(`images/${account.brand}-${index}.jpg`))
			}
		} else break
	}
	await browser.close()
	return new Date(Date.now())
}

module.exports = scrapeImagePage

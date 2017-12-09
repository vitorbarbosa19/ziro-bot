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
		// scrape the published date of the image, so we can skip it if not newer than our last download date
		const times = await page.$$eval('time', (timeTags) => {
			return Array.prototype.map.call(timeTags, (time) => time.getAttribute('datetime'))
		})
		// scrape images src on the page. Will bring the logo's and the desired image's
		let imagesSrcs = await page.$$eval('img', (imageTags) => {
			return Array.prototype.map.call(imageTags, (img) => img.src)
		})
		// filter away the logo src, leaving only the desired image src
		let imageSrc = imagesSrcs.filter( (src) => {
			return /\/e35\//.test(src)
		})
		// if no image was found, it's probably because the media is a video, so we should get the poster
		if (imageSrc.length === 0) {
			imageSrc = await page.$$eval('video', (videoTags) => {
				return Array.prototype.map.call(videoTags, (video) => video.poster)
			})
		}
		// download each image to a directory by requesting the url and piping to a jpg file
		await request(imageSrc.pop()).pipe(fs.createWriteStream(`images/${account}-${index}.jpg`))
	}
	await browser.close()
}

module.exports = scrapeImagePage

const main = async () => {
	try {
		require('dotenv').config()
		// get brands information from google spreadsheet
		const requestPromise = require('request-promise-native')
		const brandsInfo = JSON.parse(await requestPromise(process.env.SPREADSHEET_URL))
		// save the name of all instagram accounts on an array and remove first element (sheet column title)
		//const igAccounts = brandsInfo.values.map( (brandInfo) => brandInfo[1])
		//igAccounts.shift()
		// iterate over each instagram account to grab from their feeds all recent images URLs
		const igAccounts = ['luziafazzollioficial']
		const scrapeAccount = require('./functions/scrapeAccount')
		const scrapeImagePage = require('./functions/scrapeImagePage')
		const accountsAndImagesToDownload = []
		for (let i = 0; i < igAccounts.length; i++) {
			const anchorTagsHrefs = await scrapeAccount(igAccounts[i])
			const imagesToDownload = await scrapeImagePage(anchorTagsHrefs)
		}
	} catch (error) {
		console.log(error)
	}
}

main()

	// const brandName = url.parse(req.url, true).query.name
	// const imageUrl = url.parse(req.url, true).query.url
	// const request = require('request')
	// request(imageUrl).pipe(res)

// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24175703_131548277520404_1511259246111490048_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24175084_490955741289301_7774733620077395968_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24254525_341752796298305_6313410120470495232_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24177798_167305563873077_7012999162719371264_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24253792_306075929877596_8118377999289548800_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24174918_1971673953091022_2134695911157137408_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24175364_157047608240905_1470863236151640064_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24253735_316329652179464_4942578025557393408_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24125399_913187785517561_4856832512481034240_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24274530_1788950548064003_8836355699203112960_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24177987_314980792332686_8737162634933043200_n.jpg
// https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/24254287_1842498755802576_2454470739038830592_n.jpg

const bot = async () => {
	try {
		const getBrands = require('./functions/getBrands')
		const igAccounts = await getBrands()
		const scraper = require('./functions/scraper')
		const igAccountsTest = ['luziafazzollioficial']
		console.log(await scraper(igAccountsTest))
	} catch (error) {
		console.log(error)
	}
}

bot()

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

const puppeteer = require('puppeteer')
puppeteer.launch().then(async browser => {
  const page = await browser.newPage()
  await page.goto('https://instagram.com/ziromoda')
  const allImageLinks = await page.evaluate( () => {
  	images = document.getElementsByTagName('img')
  	return [].map.call(images, img => img.src)
  })
  console.log(allImageLinks)



  await browser.close()
})



// const axios = require('axios')
// const https = require('https')
// const query_id = 17845312237175864
// const account_id = {
// 	"id": "221961939"
// }

// const variables = encodeURIComponent(JSON.stringify(account_id))

// module.exports = (req, res) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*')
// 	if(req.url === '/favicon.ico')
// 		res.end()
// 	axios({
// 		url: `https://www.instagram.com/graphql/query/?query_id=${query_id}&variables=${variables}`,
// 		method: 'get',
		
// 	})
// 	.then( (response) => {
// 		console.log(response.data)
// 		res.end(JSON.stringify(response.data))
// 	})
// 	.catch( (error) => {
// 		delete error.response.request
// 		console.log(error)
// 		res.end(JSON.stringify(error.response))
// 	})
// }



// const puppeteer = require('puppeteer')
// puppeteer.launch().then(async browser => {
//   const page = await browser.newPage()
//   await page.goto('https://instagram.com/ziromoda')
//   const pageWindow = await page.evaluateHandle( () => Promise.resolve(window._sharedData))
//   const data = await pageWindow.jsonValue()
//   //console.log(data.entry_data.ProfilePage[0].user.media)
//   console.log(data.entry_data.ProfilePage[0].user.saved_media.nodes)
//   await browser.close()
// })
//account_id=221961939 //ziromoda id
//query_id=17845312237175864 //first query ziromoda
//query_id=17888483320059182 //subsequent queries ziromoda




// const request = require('request')
// const url = require('url')

// module.exports = (req, res) => {
	
// 	const max_quantity = url.parse(req.url, true).query.quantity //parses the query string from the url request in order to retrieve the 'quantity' param
// 	const ig_account = url.parse(req.url, true).query.account_name
	
// 	request(`https://www.instagram.com/${ig_account}/media`, function(error, response, body) {
// 		const arrayOfImagesUrls = JSON.parse(body).items.map( function(post) {
// 			return post.images.standard_resolution.url
// 		})
		
// 		res.setHeader('Access-Control-Allow-Origin', '*')
		
// 		res.end(JSON.stringify(arrayOfImagesUrls.slice(0, max_quantity))) //send only the requested amount

// 	})
// }

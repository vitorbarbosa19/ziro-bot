const express = require('express')
const request = require('request')

const brands = [
	{
		name: 'talgui',
		url: 'https://scontent-lax3-2.cdninstagram.com/t51.2885-15/e35/24125712_1674678722603370_7799256208300310528_n.jpg'
	},
	{
		name: 'luzia',
		url: 'https://scontent-lax3-2.cdninstagram.com/t51.2885-15/e35/24125712_1674678722603370_7799256208300310528_n.jpg'
	}
]

const getImages = (brands, res) => {
	return Promise.all( brands.map( (brand) => {
		return new Promise( (resolve, reject) => {
			resolve(request(brand.url).pipe(res))
		})
	}))
}

const app = express()

app.get('/', async (req, res) => {
	res.attachment('name.jpg')
	await getImages(brands, res)
})

app.listen(3000, () => console.log('Listening on port 3000'))
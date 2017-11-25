const fs = require('fs')
const { promisify } = require('util')
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

const downloadToClient = async () => {
	try {
		const imagesOnDirectory = await readdir('./images')
		return Promise.all(imagesOnDirectory.map( (image) => {
			return readFile(`./images/${image}`)
		}))
	} catch (error) {
			return error
	}
}

module.exports = downloadToClient

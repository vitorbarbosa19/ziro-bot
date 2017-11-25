const fs = require('fs')
const { promisify } = require('util')
const zipdir = require('zip-dir')
const readFile = promisify(fs.readFile)

const downloadToClient = () => {
	return new Promise( (resolve, reject) => {
		zipdir('./images', { saveTo: './images.zip' }, async (zipError) => {
			try {
				if(zipError)
					resolve(zipError)
				const zip = await readFile('./images.zip')
				resolve(zip)	
			} catch (error) {
					reject(error)
			}
		})
	})
}

module.exports = downloadToClient

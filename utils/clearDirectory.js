const fs = require('fs')
const rmdir = require('rmdir')

const clearDirectory = () => {
	return new Promise( async (resolve, reject) => {
		try {
			fs.unlinkSync('./images.zip')
			await rmdir('./images')
			resolve('All done')
		} catch (error) {
				reject(error)
		}
	})
}

module.exports = clearDirectory

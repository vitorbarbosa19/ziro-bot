const fs = require('fs')
const downloader = require('image-downloader')
const rmdir = require('rmdir')

const downloadToServer = async (photosToDownload) => {
	fs.stat('./images', async (err, stats) => {
		if(err)
			fs.mkdirSync('./images')
		else {
			await rmdir('./images')
			fs.mkdirSync('./images')
		}
	})
	return Promise.all(photosToDownload.map( (accountPhotos) => {
  	return Promise.all(accountPhotos.photosSrcs.map( (photoSrc, index) => {
  		return new Promise( async (resolve, reject) => {
	  		try {
		  		if(photoSrc !== null) {
			  		const { filename } = await downloader.image({
			  			url: photoSrc,
			  			dest: `./images/${accountPhotos.accountName}-${index}.jpg`
			  		})
			  		resolve(filename)
		  		}
		  		resolve(null)
	  		} catch (error) {
	  				reject(error)
	  		}  		
	  	})
  	}))
  }))
}

module.exports = downloadToServer

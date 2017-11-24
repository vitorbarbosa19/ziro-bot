const mkdirp = require('mkdirp')
const downloader = require('image-downloader')

const downloadToServer = (photosToDownload) => {
	return Promise.all(photosToDownload.map( (accountPhotos) => {
  	return Promise.all(accountPhotos.photosSrcs.map( (photoSrc) => {
  		return new Promise( async (resolve, reject) => {
	  		try {
		  		const { filename } = await downloader.image({
		  			url: photoSrc,
		  			dest: './images'
		  		})
		  		resolve(filename)
	  		} catch (error) {
	  				reject(error)
	  		}
	  		
	  	})
  	}))
  }))
}

module.exports = downloadToServer

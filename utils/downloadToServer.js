const mkdirp = require('mkdirp')
const downloader = require('image-downloader')

const downloadToServer = (photosToDownload) => {
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

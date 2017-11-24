const mkdirp = require('mkdirp')
const downloader = require('image-downloader')

const downloadToServer = () => {
	return Promise.all(photosToDownload.map( (allUrls) => {
  	return Promise.all(allUrls.map( (url) => {
  		return new Promise( async (resolve, reject) => {
	  		await downloader.image({
	  			url: url,
	  			dest: './images'
	  		})
	  	})
  	}))
  }))
}
	  

module.exports = downloadToServer
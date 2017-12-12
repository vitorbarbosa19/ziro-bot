const updateDatesToSheet = async (cells) => {
	try {
		let saveResult = []
		for (index = 0; index < cells.length; index++) {
			saveResult.push(await new Promise( (resolve, reject) => {
				cells[index].save( (error) => {
					if (error)
						reject(error)
					resolve('row updated!')
				})
			}))
		}
		return Promise.all(saveResult)
	} catch(error) {
		return error
	}

	// return new Promise( (resolve, reject) => {
	// 	try {
	// 		worksheetObject.worksheets[0].bulkUpdateCells(cells, (error) => {
	// 			if (error)
	// 				reject(error)
	// 			resolve('Spreadsheet updated successfully!')
	// 		})
	// 	} catch (error) {
	// 		reject(error)
	// 	}
	// })

	// try {
	// 	return Promise.all(accountsScraped.map( async (account) => {
	// 		const result = await Promise.all(rows.map( async (row) => {
	// 				if (account.name === row.instagram) {
	// 					row.update = account.update
	// 					return await new Promise( (resolve, reject) => {
	// 						row.save( (error) => {
	// 							if (error)
	// 								reject(error)
	// 							resolve(`${account.name} updated successfully`)
	// 						})
	// 					})
	// 				}
	// 		}))
	// 		return result.filter( (row) => {
	// 			return typeof row !== 'undefined'
	// 		}).pop()
	// 	}))
	// } catch(error) {
	// 	return error
	// }
}

module.exports = updateDatesToSheet

const getCellsToUpdate = (accountsScraped, allCells) => {
	try {
		const accountRowsToUpdate = allCells.map( (cell) => {
			if (cell.value === accountsScraped.find( (account) => { return account === cell.value }))
				return cell.row
			return 'null'
		}).filter( (cellValue) => { return cellValue !== 'null' })
		const cellsToUpdate = allCells.map( (cell) => {
			if (cell.col === 4) {
				if (cell.row === accountRowsToUpdate.find( (row) => { return row === cell.row })) {
					cell.value = new Date(Date.now())
					return cell
				}
				return 'null'
			}
			return 'null' 
		}).filter( (cellValue) => { return cellValue !== 'null' })
		return cellsToUpdate
	} catch(error) {
		return error
	}
}

module.exports = getCellsToUpdate

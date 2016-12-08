/**
 * @param(content): array
 * @return: array
 **/

function getDescr(content) {
	if (!(content instanceof Array)) {
		return [];
	}

	var startIndex = content.length;
	var endIndex = 0;
	content.map( (item, i) => {
		if (item[0] == 'h2' && item[1] && item[1] == 'Descr') {
			startIndex = i + 1;
		} else if (item[0] == 'h2' && i > startIndex) {
			endIndex = i;
		}
	})

	if (!endIndex) {
		endIndex = content.length;
	}

	return content.slice(startIndex, endIndex);
}

module.exports = {
	getDescr
}
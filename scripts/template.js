/*
 * use: to create index.js template
 * author: liangminjian
 */
function createDemoTemplate(code) {

var indexTemple = 
`//dependence
import React, {Component, PropTypes} from 'react';

${code}

export default App;`;

	return indexTemple;
}


function createIndexTemplate(componentName, demoList) {

	const importTemplate = (demoName) => {
		return `import ${demoName} from '../../dist/${componentName}/${demoName}';
`
	}

	const exportTemplate = (demoName) => {
		return demoName;
	}

	var importStr = ``;
	var exportStr = ``;
	demoList.map( (item, i) => {
		importStr += importTemplate(item.fileName);
		if (i == demoList.length - 1) {
			exportStr += `${item.fileName}`;
		} else {
			exportStr += `${item.fileName},`;
		}
		
	})
	
var template = `
${importStr}

export default {
	${exportStr}
};`

return template;
}

module.exports = {
	createDemoTemplate,
	createIndexTemplate
}
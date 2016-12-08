import React from 'react';
import {Card} from 'antd';
import Marked from 'marked';


//code template
function getCodeTemplate(code) {
	var str = '';
	str += `
\`\`\`javascript
${code}
\`\`\`
`
return str;
}

class DemoCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { demo, title, descr, code } = this.props;
		return (
			<Card style={{ width: 300 }}>
				<div>
					{demo}
				</div>
				<div>
					{title}
				</div>
				<div>
					{descr}
				</div>
				<div dangerouslySetInnerHTML={{__html: Marked(getCodeTemplate(code))}} />
			</Card>
		)
	}

}

DemoCard.propsType = {
	demo: React.PropTypes.element.isRequired,
	title: React.PropTypes.string.isRequired,
	descr: React.PropTypes.string.isRequired,
	code: React.PropTypes.string.isRequired
}


export default DemoCard;

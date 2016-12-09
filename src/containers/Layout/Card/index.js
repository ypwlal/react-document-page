import React from 'react';
import CSSModules from 'react-css-modules';

import Marked from 'marked';
import toReactComponent from 'jsonml-to-react-component';

import hls from 'highlight.js';
import { Icon, Card, Row, Col } from 'antd';

import styles from './index.css';

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


Marked.setOptions({
	highlight: (code) => {
		return hls.highlight('jsx', code).value;
	}
})


@CSSModules(styles, {errorWhenNotFound: false})

class DemoCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showCode: false
		}
	}

	componentDidMount() {
		hls.initHighlighting();
	}

	handleSwitch = (e) => {
		e.preventDefault();
		this.setState(Object.assign({}, this.state, { showCode: !this.state.showCode }));
	}

	render() {
		const { demo, title, descr, code, article } = this.props;

		return (
			<Card styleName="demo-card">
				<div styleName="demo">
					{demo}
				</div>
				<div styleName="meta">
					<div styleName="title">
						{title}
					</div>
					<div styleName="descr-container">
						<div styleName="descr">
							{toReactComponent(['article'].concat(descr))}
						</div>
						{ this.state.showCode ? 
							<Icon type="up-circle-o" styleName="switch-icon" onClick={this.handleSwitch}/> :
							<Icon type="down-circle-o" styleName="switch-icon" onClick={this.handleSwitch}/>
						}
					</div>
				</div>
				{ this.state.showCode && <div styleName="code" dangerouslySetInnerHTML={{__html: Marked(getCodeTemplate(code))}} />}
			</Card>
		)
	}

}

DemoCard.propsType = {
	demo: React.PropTypes.element.isRequired,
	title: React.PropTypes.string.isRequired,
	descr: React.PropTypes.array.isRequired,
	code: React.PropTypes.string.isRequired,
	article: React.PropTypes.any
}


export default DemoCard;

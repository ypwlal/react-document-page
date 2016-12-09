import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Row, Col } from 'antd';
import toReactComponent from 'jsonml-to-react-component';

import DemoCard from '../Card';

import { getDescr, splitDescr } from '../../../utils/markdown.js';

class DemoPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { componentName, demoList, indexInfo } = this.props;

		let componentList = [];

		demoList.map( item => {
			componentList.push(require('../../../dist/' + componentName + '/' + item.fileName).default);
		})

		const DESCR = splitDescr(indexInfo.content);

		return (
			<div>
				<div><div>{toReactComponent(['article'].concat(DESCR[0]))}</div></div>
				{ componentList && componentList.map( (component, i) => {
					console.log(getDescr(demoList[i].content))
					if(typeof(component) == 'function') {
						return (
							<Col span={12} key={demoList[i].fileName} styleName="col"> 
								<DemoCard 
									 	  demo={React.createElement(component)}
									 	  title={demoList[i].meta.title}
									 	  descr={getDescr(demoList[i].content)}
									 	  code={demoList[i].code}/>
							</Col>
						)
					}
				})}
				<div>{toReactComponent(['article'].concat(DESCR[1]))}</div>
			</div>
		)
	}

}

DemoPage.propTypes = {
	componentName: React.PropTypes.string.isRequired,
	demoList: React.PropTypes.array.isRequired,
	indexInfo: React.PropTypes.object.isRequired
}

export default DemoPage;

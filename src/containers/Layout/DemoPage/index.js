import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Row, Col } from 'antd';

import DemoCard from '../Card';

class DemoPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { componentName, demoList } = this.props;

		console.log(demoList)

		let componentList = [];

		demoList.map( item => {
			componentList.push(require('../../../dist/' + componentName + '/' + item.fileName).default);
		})

		console.log(componentList)

		return (
			<div>
				{ componentList && componentList.map( (component, i) => {
					if(typeof(component) == 'function') {
						return (
							<Col span={12} key={demoList[i].fileName} styleName="col"> 
								<DemoCard 
									 	  demo={React.createElement(component)}
									 	  title={demoList[i].meta.title}
									 	  descr={demoList[i].descr}
									 	  code={demoList[i].code}/>
							</Col>
						)
					}
				})}
			</div>
		)
	}

}

DemoPage.propTypes = {
	componentName: React.PropTypes.string.isRequired,
	demoList: React.PropTypes.array.isRequired
}

export default DemoPage;

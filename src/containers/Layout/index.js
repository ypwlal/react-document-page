import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import DemoList from '../../dist/a';
import Config from '../../dist/a/config';

import DemoCard from './Card';

const demo = Object.keys(DemoList);

let componentList = [];

demo.map( item => {
	componentList.push(DemoList[item]);
})


class Layout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Row>
					{ componentList && componentList.map( (component, i) => {
						if(typeof(component) == 'function') {
							return (
								<Col span={12}> 
									<DemoCard key={demo[i]}
										 	  demo={React.createElement(component)}
										 	  title={Config[i].meta.title}
										 	  descr={Config[i].descr}
										 	  code={Config[i].code}/>
								</Col>
							)
						}
					})}
				</Row>
			</div>
		)
	}

}

export default Layout;

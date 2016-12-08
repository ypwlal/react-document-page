import React, { Component, PropTypes } from 'react';
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
				{ componentList && componentList.map( (component, i) => {
					if(typeof(component) == 'function') {
						return <DemoCard demo={React.createElement(component, {key: demo[i]})}
										 title={Config[i].title}
										 descr={Config[i].descr}
										 code={Config[i].code}/>
					}
				})}
			</div>
		)
	}

}

export default Layout;

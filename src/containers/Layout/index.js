import React, { Component, PropType } from 'react';
import DemoList from '../../dist/a';
import Config from '../../dist/a/config';

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
						return React.createElement(component, {key: demo[i]})
					}
				})}
			</div>
		)
	}

}

export default Layout;

import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Row, Col } from 'antd';
import Config from '../../dist/config';

import DemoPage from './DemoPage';

import styles from './index.css';

const componentList = Object.keys(Config);

console.log(Config)
console.log(componentList)
console.log(Config[componentList[0]])

@CSSModules(styles, {errorWhenNotFound: false})
class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0
		}
	}

	render() {
		return (
			<div>
				<Col span={4}>
					<div styleName="nav-container">
						{
							componentList.map( item => {
								return item;
							})
						}
					</div>
				</Col>
				<Col span={20}>
					<DemoPage componentName={componentList[this.state.current]} demoList={Config[componentList[this.state.current]]}/>
				</Col>
			</div>
		)
	}

}

export default Layout;

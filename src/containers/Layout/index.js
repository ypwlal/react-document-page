import React, { Component, PropTypes } from 'react';
import { AutoComplete, Menu, Icon, Row, Col } from 'antd';
import Config from '../../dist/config';

import DemoPage from './DemoPage';

import styles from './index.css';

const componentList = Object.keys(Config);

console.log(Config)
console.log(componentList)
console.log(Config[componentList[0]].demo)

const SubMenu = Menu.SubMenu;

const HeaderNav = [
	'首页',
	'组件',
	'规范(施工中)',
]

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navCurrent: '0',
			headerCurrent: '1'
		}
	}

	autoCompleteChange = (value) => {
		console.log(value)
	}

	handleMenuClick = (e) => {
		if (e.key.split('-')[1] == this.state.navCurrent) {
			return;
		}
		this.setState(Object.assign({}, this.state, { navCurrent: e.key.split('-')[1]}));
	}

	headerNavClick = (e) => {
		if (e.key.split('-')[1] == this.state.headerCurrent) {
			return;
		}
		this.setState(Object.assign({}, this.state, { headerCurrent: e.key.split('-')[1]}));
		console.log(this.state)
	}


	render() {
		const componentConfig = Config[componentList[this.state.navCurrent]];
		return (
			<div className={styles["main"]}>
				<div className={styles["header-container"]}>
					<Col span={4}>
						<div className={styles["logo"]}>logo</div>
					</Col>
					<Col span={20} className={styles["header-col"]}>
						<AutoComplete
							className={styles["auto-complete"]}
	        				dataSource={componentList}
	       				 	style={{ width: 200 }}
	       				 	onChange={this.autoCompleteChange}
	        				placeholder="input here"
	      				/>
	      				<Menu className={styles["header-nav"]}
	      					onClick={this.headerNavClick}
	      					selectedKeys={['headerNav-' + this.state.headerCurrent]}
        					mode="horizontal"
      					>
      						{
      							HeaderNav.map( (item, i) => {
									return <Menu.Item key={'headerNav-' + i}>{item}</Menu.Item>
								})
								
      						}
      					</Menu>
		      		</Col>
				</div>
				<div className={styles["layout-container"]}>
					<Col span={4}>
						<div className={styles["nav-container"]}>
							<Menu selectedKeys={["nav-" + this.state.navCurrent]}
								  onClick={this.handleMenuClick}
								  defaultOpenKeys={['components']}
								  mode="inline"
							>
								<SubMenu key="components" title={<span>Components</span>}>
								{
									componentList.map( (item, i) => {
										return <Menu.Item key={"nav-" + i}>
	          										{item + ' ' + componentConfig.index.meta['subtitle']}
	        									</Menu.Item>
									})
								}
								</SubMenu>
							</Menu>
						</div>
					</Col>
					<Col span={20}>
						<div className={styles["body"]}>
							<DemoPage componentName={componentList[this.state.navCurrent]} 
									  demoList={componentConfig.demo} 
									  indexInfo={componentConfig.index}/>
						</div>
					</Col>
				</div>
			</div>
		)
	}

}

export default Layout;

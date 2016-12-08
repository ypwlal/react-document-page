import 'babel-polyfill';

import 'antd/lib/style/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './containers/Layout';

import './styles/highlight.css';

ReactDOM.render(
	<div>
		<Layout />
	</div>
, document.getElementById('app'));

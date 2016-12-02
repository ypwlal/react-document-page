import 'babel-polyfill';

import 'antd/lib/style/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

ReactDOM.render(
  <div>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="ghost">Ghost</Button>
    <Button type="dashed">Dashed</Button>
  </div>
, document.getElementById('app'));

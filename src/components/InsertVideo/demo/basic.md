---
order: 0
title: 基本用法
---

## Descr

按钮有四种类型：主按钮、次按钮、幽灵按钮、虚线按钮。

通过设置 `type` 为 `primary` `ghost` `dashed` 可分别创建主按钮、幽灵按钮、虚线按钮，若不设置 `type` 值则为次按钮。不同的样式可以用来区别其重要程度。

主按钮和次按钮可独立使用，幽灵按钮用于和主按钮组合。需要强引导用主按钮，切记主按钮在同一个操作区域最多出现一次。


## code

```jsx
import { Button } from 'antd';
import InsertVideo from '../../components/InsertVideo/src';

const App = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  show() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
    });
  },
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  },
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.show}>点击弹出播放</Button>
        <InsertVideo visible={this.state.visible} 
                     title="测试"
                     onConfirm={this.handleOk}
                     onCancel={this.handleCancel}/>
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
```

```html

<div id="app"></div>

```
---
order: 0
title: 按钮类型
---

## Descr

按钮有四种类型：主按钮、次按钮、幽灵按钮、虚线按钮。

通过设置 `type` 为 `primary` `ghost` `dashed` 可分别创建主按钮、幽灵按钮、虚线按钮，若不设置 `type` 值则为次按钮。不同的样式可以用来区别其重要程度。

主按钮和次按钮可独立使用，幽灵按钮用于和主按钮组合。需要强引导用主按钮，切记主按钮在同一个操作区域最多出现一次。


## code

```jsx
import { Modal, Button } from 'antd';

const App = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  showModal() {
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
        <Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>
        <Modal title="Basic Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
```

```html

<div id="app"></div>

```
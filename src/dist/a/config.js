
const config = [{"fileName":"basic","meta":{"order":0,"title":"按钮类型"},"title":"","descr":[["p","按钮有四种类型：主按钮、次按钮、幽灵按钮、虚线按钮。"],["p","通过设置 ",["code","type"]," 为 ",["code","primary"]," ",["code","ghost"]," ",["code","dashed"]," 可分别创建主按钮、幽灵按钮、虚线按钮，若不设置 ",["code","type"]," 值则为次按钮。不同的样式可以用来区别其重要程度。"],["p","主按钮和次按钮可独立使用，幽灵按钮用于和主按钮组合。需要强引导用主按钮，切记主按钮在同一个操作区域最多出现一次。"]],"content":["article",["h2","Descr"],["p","按钮有四种类型：主按钮、次按钮、幽灵按钮、虚线按钮。"],["p","通过设置 ",["code","type"]," 为 ",["code","primary"]," ",["code","ghost"]," ",["code","dashed"]," 可分别创建主按钮、幽灵按钮、虚线按钮，若不设置 ",["code","type"]," 值则为次按钮。不同的样式可以用来区别其重要程度。"],["p","主按钮和次按钮可独立使用，幽灵按钮用于和主按钮组合。需要强引导用主按钮，切记主按钮在同一个操作区域最多出现一次。"],["h2","code"],["pre",{"lang":"jsx"},["code","import { Modal, Button } from 'antd';\n\nconst App = React.createClass({\n  getInitialState() {\n    return { visible: false };\n  },\n  showModal() {\n    this.setState({\n      visible: true,\n    });\n  },\n  handleOk() {\n    console.log('Clicked OK');\n    this.setState({\n      visible: false,\n    });\n  },\n  handleCancel(e) {\n    console.log(e);\n    this.setState({\n      visible: false,\n    });\n  },\n  render() {\n    return (\n      <div>\n        <Button type=\"primary\" onClick={this.showModal}>Open a modal dialog</Button>\n        <Modal title=\"Basic Modal\" visible={this.state.visible}\n          onOk={this.handleOk} onCancel={this.handleCancel}\n        >\n          <p>some contents...</p>\n          <p>some contents...</p>\n          <p>some contents...</p>\n        </Modal>\n      </div>\n    );\n  },\n});\n\nReactDOM.render(<App />, mountNode);"]],["pre",{"lang":"html"},["code","<div id=\"app\"></div>"]]],"code":"import { Modal, Button } from 'antd';\n\nconst App = React.createClass({\n  getInitialState() {\n    return { visible: false };\n  },\n  showModal() {\n    this.setState({\n      visible: true,\n    });\n  },\n  handleOk() {\n    console.log('Clicked OK');\n    this.setState({\n      visible: false,\n    });\n  },\n  handleCancel(e) {\n    console.log(e);\n    this.setState({\n      visible: false,\n    });\n  },\n  render() {\n    return (\n      <div>\n        <Button type=\"primary\" onClick={this.showModal}>Open a modal dialog</Button>\n        <Modal title=\"Basic Modal\" visible={this.state.visible}\n          onOk={this.handleOk} onCancel={this.handleCancel}\n        >\n          <p>some contents...</p>\n          <p>some contents...</p>\n          <p>some contents...</p>\n        </Modal>\n      </div>\n    );\n  },\n});\n\nReactDOM.render(<App />, mountNode);","html":"<div id=\"app\"></div>","css":null,"view":null},{"fileName":"more","meta":{},"title":"","descr":[],"content":["article"],"code":null,"html":null,"css":null,"view":null}];
export default config;
			
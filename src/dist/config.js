const config = {
	"a": {
		"index": {
			"meta": {
				"category": "Components",
				"type": "General",
				"title": "Button",
				"subtitle": "按钮"
			},
			"content": ["article", ["p", "按钮用于开始一个即时操作。"],
				["h2", "何时使用"],
				["p", "标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。"],
				["h2", "API"],
				["p", "通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：", ["code", "type"], " -> ", ["code", "shape"], " -> ", ["code", "size"], " -> ", ["code", "loading"], " -> ", ["code", "disabled"]],
				["p", "按钮的属性说明如下："],
				["table", ["thead", ["tr", ["th", "属性"],
						["th", "说明"],
						["th", "类型"],
						["th", "默认值"]
					]],
					["tbody", ["tr", ["td", "type"],
							["td", "设置按钮类型，可选值为 ", ["code", "primary"], " ", ["code", "ghost"], " ", ["code", "dashed"], " 或者不设"],
							["td", "string"],
							["td", "-"]
						],
						["tr", ["td", "htmlType"],
							["td", "设置 ", ["code", "button"], " 原生的 ", ["code", "type"], " 值，可选值请参考 ", ["a", {
								"title": null,
								"href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type"
							}, "HTML 标准"]],
							["td", "string"],
							["td", ["code", "button"]]
						],
						["tr", ["td", "icon"],
							["td", "设置按钮的图标类型"],
							["td", "string"],
							["td", "-"]
						],
						["tr", ["td", "shape"],
							["td", "设置按钮形状，可选值为 ", ["code", "circle"], " 或者不设"],
							["td", "string"],
							["td", "-"]
						],
						["tr", ["td", "size"],
							["td", "设置按钮大小，可选值为 ", ["code", "small"], " ", ["code", "large"], " 或者不设"],
							["td", "string"],
							["td", ["code", "default"]]
						],
						["tr", ["td", "loading"],
							["td", "设置按钮载入状态"],
							["td", "boolean"],
							["td", "false"]
						],
						["tr", ["td", "onClick"],
							["td", ["code", "click"], " 事件的 handler"],
							["td", "function"],
							["td", "-"]
						]
					]
				],
				["p", ["code", "<Button>Hello world!</Button>"], " 最终会被渲染为 ", ["code", "<button>Hello world!</button>"], "，并且除了上表中的属性，其它属性都会直接传到 ", ["code", "<button></button>"], "。"]
			]
		},
		"list": ["basic.md", "more.md"],
		"demo": [{
			"fileName": "basic",
			"meta": {
				"order": 0,
				"title": "按钮类型"
			},
			"title": "",
			"content": ["article", ["h2", "Descr"],
				["p", "按钮有四种类型：主按钮、次按钮、幽灵按钮、虚线按钮。"],
				["p", "通过设置 ", ["code", "type"], " 为 ", ["code", "primary"], " ", ["code", "ghost"], " ", ["code", "dashed"], " 可分别创建主按钮、幽灵按钮、虚线按钮，若不设置 ", ["code", "type"], " 值则为次按钮。不同的样式可以用来区别其重要程度。"],
				["p", "主按钮和次按钮可独立使用，幽灵按钮用于和主按钮组合。需要强引导用主按钮，切记主按钮在同一个操作区域最多出现一次。"],
				["h2", "code"],
				["pre", {
						"lang": "jsx"
					},
					["code", "import { Modal, Button } from 'antd';\n\nconst App = React.createClass({\n  getInitialState() {\n    return { visible: false };\n  },\n  showModal() {\n    this.setState({\n      visible: true,\n    });\n  },\n  handleOk() {\n    console.log('Clicked OK');\n    this.setState({\n      visible: false,\n    });\n  },\n  handleCancel(e) {\n    console.log(e);\n    this.setState({\n      visible: false,\n    });\n  },\n  render() {\n    return (\n      <div>\n        <Button type=\"primary\" onClick={this.showModal}>Open a modal dialog</Button>\n        <Modal title=\"Basic Modal\" visible={this.state.visible}\n          onOk={this.handleOk} onCancel={this.handleCancel}\n        >\n          <p>some contents...</p>\n          <p>some contents...</p>\n          <p>some contents...</p>\n        </Modal>\n      </div>\n    );\n  },\n});\n\nReactDOM.render(<App />, mountNode);"]
				],
				["pre", {
						"lang": "html"
					},
					["code", "<div id=\"app\"></div>"]
				]
			],
			"code": "import { Modal, Button } from 'antd';\n\nconst App = React.createClass({\n  getInitialState() {\n    return { visible: false };\n  },\n  showModal() {\n    this.setState({\n      visible: true,\n    });\n  },\n  handleOk() {\n    console.log('Clicked OK');\n    this.setState({\n      visible: false,\n    });\n  },\n  handleCancel(e) {\n    console.log(e);\n    this.setState({\n      visible: false,\n    });\n  },\n  render() {\n    return (\n      <div>\n        <Button type=\"primary\" onClick={this.showModal}>Open a modal dialog</Button>\n        <Modal title=\"Basic Modal\" visible={this.state.visible}\n          onOk={this.handleOk} onCancel={this.handleCancel}\n        >\n          <p>some contents...</p>\n          <p>some contents...</p>\n          <p>some contents...</p>\n        </Modal>\n      </div>\n    );\n  },\n});\n\nReactDOM.render(<App />, mountNode);",
			"html": "<div id=\"app\"></div>",
			"css": null,
			"view": null
		}, {
			"fileName": "more",
			"meta": {
				"order": 0,
				"title": "按钮类型"
			},
			"title": "",
			"content": ["article", ["h2", "Descr"],
				["p", "按钮有四种类型：主按钮、次按钮、幽灵按钮、虚线按钮。"],
				["p", "通过设置 ", ["code", "type"], " 为 ", ["code", "primary"], " ", ["code", "ghost"], " ", ["code", "dashed"], " 可分别创建主按钮、幽灵按钮、虚线按钮，若不设置 ", ["code", "type"], " 值则为次按钮。不同的样式可以用来区别其重要程度。"],
				["p", "主按钮和次按钮可独立使用，幽灵按钮用于和主按钮组合。需要强引导用主按钮，切记主按钮在同一个操作区域最多出现一次。"],
				["h2", "code"],
				["pre", {
						"lang": "jsx"
					},
					["code", "import { Modal, Button } from 'antd';\n\nconst App = React.createClass({\n  getInitialState() {\n    return { visible: false };\n  },\n  showModal() {\n    this.setState({\n      visible: true,\n    });\n  },\n  handleOk() {\n    console.log('Clicked OK');\n    this.setState({\n      visible: false,\n    });\n  },\n  handleCancel(e) {\n    console.log(e);\n    this.setState({\n      visible: false,\n    });\n  },\n  render() {\n    return (\n      <div>\n        <Button type=\"primary\" onClick={this.showModal}>Open a modal dialog</Button>\n        <Modal title=\"Basic Modal\" visible={this.state.visible}\n          onOk={this.handleOk} onCancel={this.handleCancel}\n        >\n          <p>some contents...</p>\n          <p>some contents...</p>\n          <p>some contents...</p>\n        </Modal>\n      </div>\n    );\n  },\n});\n\nReactDOM.render(<App />, mountNode);"]
				],
				["pre", {
						"lang": "html"
					},
					["code", "<div id=\"app\"></div>"]
				]
			],
			"code": "import { Modal, Button } from 'antd';\n\nconst App = React.createClass({\n  getInitialState() {\n    return { visible: false };\n  },\n  showModal() {\n    this.setState({\n      visible: true,\n    });\n  },\n  handleOk() {\n    console.log('Clicked OK');\n    this.setState({\n      visible: false,\n    });\n  },\n  handleCancel(e) {\n    console.log(e);\n    this.setState({\n      visible: false,\n    });\n  },\n  render() {\n    return (\n      <div>\n        <Button type=\"primary\" onClick={this.showModal}>Open a modal dialog</Button>\n        <Modal title=\"Basic Modal\" visible={this.state.visible}\n          onOk={this.handleOk} onCancel={this.handleCancel}\n        >\n          <p>some contents...</p>\n          <p>some contents...</p>\n          <p>some contents...</p>\n        </Modal>\n      </div>\n    );\n  },\n});\n\nReactDOM.render(<App />, mountNode);",
			"html": "<div id=\"app\"></div>",
			"css": null,
			"view": null
		}]
	},
	"b": {
		"index": {
			"meta": {
				"category": "Components",
				"type": "General",
				"title": "Button",
				"subtitle": "按钮"
			},
			"content": ["article", ["p", "按钮用于开始一个即时操作。"],
				["h2", "何时使用"],
				["p", "标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。"],
				["h2", "API"],
				["p", "通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：", ["code", "type"], " -> ", ["code", "shape"], " -> ", ["code", "size"], " -> ", ["code", "loading"], " -> ", ["code", "disabled"]],
				["p", "按钮的属性说明如下："],
				["table", ["thead", ["tr", ["th", "属性"],
						["th", "说明"],
						["th", "类型"],
						["th", "默认值"]
					]],
					["tbody", ["tr", ["td", "type"],
							["td", "设置按钮类型，可选值为 ", ["code", "primary"], " ", ["code", "ghost"], " ", ["code", "dashed"], " 或者不设"],
							["td", "string"],
							["td", "-"]
						],
						["tr", ["td", "htmlType"],
							["td", "设置 ", ["code", "button"], " 原生的 ", ["code", "type"], " 值，可选值请参考 ", ["a", {
								"title": null,
								"href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type"
							}, "HTML 标准"]],
							["td", "string"],
							["td", ["code", "button"]]
						],
						["tr", ["td", "icon"],
							["td", "设置按钮的图标类型"],
							["td", "string"],
							["td", "-"]
						],
						["tr", ["td", "shape"],
							["td", "设置按钮形状，可选值为 ", ["code", "circle"], " 或者不设"],
							["td", "string"],
							["td", "-"]
						],
						["tr", ["td", "size"],
							["td", "设置按钮大小，可选值为 ", ["code", "small"], " ", ["code", "large"], " 或者不设"],
							["td", "string"],
							["td", ["code", "default"]]
						],
						["tr", ["td", "loading"],
							["td", "设置按钮载入状态"],
							["td", "boolean"],
							["td", "false"]
						],
						["tr", ["td", "onClick"],
							["td", ["code", "click"], " 事件的 handler"],
							["td", "function"],
							["td", "-"]
						]
					]
				],
				["p", ["code", "<Button>Hello world!</Button>"], " 最终会被渲染为 ", ["code", "<button>Hello world!</button>"], "，并且除了上表中的属性，其它属性都会直接传到 ", ["code", "<button></button>"], "。"]
			]
		},
		"list": ["basic.md"],
		"demo": [{
			"fileName": "basic",
			"meta": {
				"order": 0,
				"title": "按钮类型"
			},
			"title": "",
			"content": ["article", ["h2", "Descr"],
				["p", "按钮有四种类型：主按钮、次按钮、幽灵按钮、虚线按钮。"],
				["p", "通过设置 ", ["code", "type"], " 为 ", ["code", "primary"], " ", ["code", "ghost"], " ", ["code", "dashed"], " 可分别创建主按钮、幽灵按钮、虚线按钮，若不设置 ", ["code", "type"], " 值则为次按钮。不同的样式可以用来区别其重要程度。"],
				["p", "主按钮和次按钮可独立使用，幽灵按钮用于和主按钮组合。需要强引导用主按钮，切记主按钮在同一个操作区域最多出现一次。"],
				["h2", "code"],
				["pre", {
						"lang": "jsx"
					},
					["code", "import { Modal, Button } from 'antd';\n\nconst App = React.createClass({\n  getInitialState() {\n    return { visible: false };\n  },\n  showModal() {\n    this.setState({\n      visible: true,\n    });\n  },\n  handleOk() {\n    console.log('Clicked OK');\n    this.setState({\n      visible: false,\n    });\n  },\n  handleCancel(e) {\n    console.log(e);\n    this.setState({\n      visible: false,\n    });\n  },\n  render() {\n    return (\n      <div>\n        <Button type=\"primary\" onClick={this.showModal}>Open a modal dialog</Button>\n        <Modal title=\"Basic Modal\" visible={this.state.visible}\n          onOk={this.handleOk} onCancel={this.handleCancel}\n        >\n          <p>some contents...</p>\n          <p>some contents...</p>\n          <p>some contents...</p>\n        </Modal>\n      </div>\n    );\n  },\n});\n\nReactDOM.render(<App />, mountNode);"]
				],
				["pre", {
						"lang": "html"
					},
					["code", "<div id=\"app\"></div>"]
				]
			],
			"code": "import { Modal, Button } from 'antd';\n\nconst App = React.createClass({\n  getInitialState() {\n    return { visible: false };\n  },\n  showModal() {\n    this.setState({\n      visible: true,\n    });\n  },\n  handleOk() {\n    console.log('Clicked OK');\n    this.setState({\n      visible: false,\n    });\n  },\n  handleCancel(e) {\n    console.log(e);\n    this.setState({\n      visible: false,\n    });\n  },\n  render() {\n    return (\n      <div>\n        <Button type=\"primary\" onClick={this.showModal}>Open a modal dialog</Button>\n        <Modal title=\"Basic Modal\" visible={this.state.visible}\n          onOk={this.handleOk} onCancel={this.handleCancel}\n        >\n          <p>some contents...</p>\n          <p>some contents...</p>\n          <p>some contents...</p>\n        </Modal>\n      </div>\n    );\n  },\n});\n\nReactDOM.render(<App />, mountNode);",
			"html": "<div id=\"app\"></div>",
			"css": null,
			"view": null
		}]
	}
};

export default config;
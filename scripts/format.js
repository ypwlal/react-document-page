const fs = require('fs');
const vm = require("vm");
const path = require('path');
const mt = require('mark-twain');
const async = require('async');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const babel = require("babel-core");
const createTemplate = require('./template.js');

const ComponentPath = path.join(__dirname, '../src/components/');
const OUTPUT = path.join(__dirname, '../src/dist/');


//execution context
var sandbox = new vm.createContext({ React });

//统计component数量
function countComponent(callback) {
	var dirPath = ComponentPath;
	var componentList = [];

	var files = fs.readdirSync(dirPath);

	files.map( (file, i) => {
		var state = fs.statSync(dirPath + file);
		if (state.isDirectory() && fs.readdirSync(dirPath + file).find( (item) => item == 'index.md')) {
			componentList.push(files[i]);
		}
	})
	console.log(componentList)
	return callback && callback(componentList);
}	


//统计md文件数量
function countMd(componentName, cb) {
	var dirPath = ComponentPath + componentName + '/demo/';
	var mdList = [];

	fs.readdir(dirPath, (err, files) => {
		if (err) {
			console.log(err)
			return cb(err, null);
		}

		files.forEach( (file) => {
			if (/(\.md)$/.test(file)) {
				mdList.push(file);
			}
		})
		return cb && cb(null, mdList)
	})
}
//normalize index.md
function normalizeIndexMd(componentName, callback) {
	fs.readFile(ComponentPath + componentName + '/index.md', (err, data) => {
		if (err) {
			console.log(err);
			throw err;
		}

		const mdJson = mt(data.toString());
		const content = mdJson.content;

		var data = {
			meta: mdJson.meta,
			content: content
		}

		return callback && callback(null, data);

	})
}


//normalize demo/*.md
function normalizeMd(componentName, mdName, callback) {
	return (mdName, callback) => {
		fs.readFile(ComponentPath + componentName + '/demo/' + mdName, function(err, data) {
			if (err) {
				console.log(err);
				throw err;
			}

			const mdJson = mt(data.toString());
			const content = mdJson.content;

			//code
			const codeIndex = content.findIndex( item => {
				return item[0] == 'pre' 
						&& (item[1].lang == 'js' || item[1].lang == 'javascript' || item[1].lang == 'jsx')
			});

			//html
			const htmlIndex = content.findIndex( item => {
				return item[0] == 'pre' 
						&& (item[1].lang == 'html')
			});

			//style css
			const styleIndex = content.findIndex( item => {
				return item[0] == 'pre' 
						&& (item[1].lang == 'css')
			});

			var data = {
				fileName: mdName.split('.')[0],
				meta: mdJson.meta,
				title: '',
				content: content,
				code: content[codeIndex] ? content[codeIndex][2][1] : null,
				html: content[htmlIndex] ? content[htmlIndex][2][1] : null,
				css: content[styleIndex] ? content[styleIndex][2][1] : null,
				view: null
			}

			return callback(null, data);
		})
	}
}


//code转component
function turnComponent(componentName, data, callback) {

	return (data, callback) => {
		var outPath = OUTPUT + componentName + '/' + data.fileName + '.js';

		if (!data.code) {
			return callback(null, outPath)
		}

		var componentString = data.code.slice(0 , data.code.indexOf('ReactDOM.render'));

		fs.writeFile(outPath, createTemplate.createDemoTemplate(componentString), {flag: 'w+', encoding: 'utf-8', mode: 0666}, (err) => {
			if (err) throw err;
			return callback(null, outPath);
		})
	}
}

//component获取viewString
function getViewString(path, callback) {

	fs.readFile(path, (err, data) => {
		var template = babel.transform(data, {
        	"presets": ["es2015","react"],
       	 	"plugins": ["babel-plugin-transform-react-jsx"]
    	});
    	fs.writeFile(path, template.code, {flag: 'w+', encoding: 'utf-8', mode: 0666}, (err) => {
			if (err) throw err;
			var component = require(path).default;

			if (!component) {
				return callback(null, null);
			}
			var rootAppFactory = React.createFactory(component);
			var viewString = ReactDOMServer.renderToStaticMarkup(rootAppFactory({}));
			return callback(null, viewString);
		})
	})
}


//build
function build(componentName) {
	var componentList = [];
	var config = {};
	var mdDataList = [];
	var mdList = [];
	var indexMd = null;

	async.series([
		//统计component数量
		(cb) => {
			console.log('0')
			countComponent( (list) => {
				componentList = list;
				cb(null, '0')
			})
		},
		//normalize index.md
		(cb) => {
			console.log('1')
			console.log(componentList)
			async.map(componentList, normalizeIndexMd, (err, res) => {
				console.log(res)
				componentList.map( (item, i) => {
					config[item] = {};
					config[item].index = res[i];
				})
				console.log(config)
				cb(null, '1');
			})
		},
		//统计md数量
		(cb) => {
			console.log('2')
			async.map(componentList, countMd, (err, res) => {
				console.log(res)
				componentList.map( (item, i) => {
					config[item].list = res[i];
				})
				console.log(config)
				cb(null, '2');
			})
		},
		//获取md数据
		(cb) => {
			console.log('3')
			var components = Object.keys(config);

			async.map(components, (name, callback) => {
				async.map(config[name].list, normalizeMd(name), (err, res) => {
					config[name].demo = res;
					callback(null, res)
				})
			}, (err, res) => {
				if (err) {
					console.log(err);
					return err;
				}
				console.log(config)
				cb(null, '3');
			})
		},
		//code转成component
		(cb) => {
			console.log('4')
			var components = Object.keys(config);
			async.map(components, (name, callback) => {
				async.map(config[name].demo, turnComponent(name), (err, res) => {
					if (err) {
						console.log(err);
						return err;
					}
					callback(null, res);
				})
			}, (err, res) => {
				cb(null, '4')
			})
			
		},

		//renderToComponentString
		/*(pathList, cb) => {
			console.log('4')
			console.log(pathList)

			async.map(pathList, getViewString, (err, res) => {
				if (err) {
					console.log(err);
					return err;
				}
				res.map( (item, i) => {
					mdDataList[i].view = item;
				})

				cb(null, res);
			})
		},*/

		//write /index.js
		(cb) => {
			console.log('5');
			var components = Object.keys(config);
			async.map(components, (name, callback) => {
				var IndexPath = OUTPUT + name + '/index.js';
				fs.writeFile(IndexPath, createTemplate.createIndexTemplate(name, config[name].demo), {flag: 'w+', encoding: 'utf-8', mode: 0666}, 
					(err) => {
						if (err) throw err;
					}
				)
				callback(null, null)
			}, (err, res) => {
				console.log(res)
				cb(null, '5');
			})
		},
		//write config
		(cb) => {
			console.log('6')

			var IndexPath = OUTPUT + '/config.js';

			var objStr = createTemplate.createConfigTemplate(JSON.stringify(config));

			fs.writeFile(IndexPath, objStr, {flag: 'w+', encoding: 'utf-8', mode: 0666}, (err) => {
				if (err) throw err;
				return cb();
			})
		}
	], (err, res) => {
/*		console.log(res)
		console.log(mdList);
		console.log(mdDataList);*/
	})
}


/*
 * 接收参数创建component模板
 */
//build(process.argv[2]);
build()
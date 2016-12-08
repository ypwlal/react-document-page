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



//统计md文件数量
function staticMd(componentName, cb) {
	var dirPath = ComponentPath + componentName + '/demo/';
	var mdList = [];

	var files = fs.readdir(dirPath, (err, files) => {
		if (err) {
			console.log(err)
			return cb();
		}

		files.forEach( (file) => {
			if (/(\.md)$/.test(file)) {
				mdList.push(file);
			}
		})
		return cb && cb(mdList)
	})
}

//normalize md
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
				title: '',
				descr: '',
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
	var mdDataList = [];
	var mdList = [];

	async.waterfall([
		//统计md数量
		(cb) => {
			console.log('1')
			staticMd(componentName, (list) => {
				mdList = list;
				cb(null, list);
			})
		},
		//获取md数据
		(list, cb) => {
			console.log('2')
			console.log(list)
			async.map(list, normalizeMd(componentName), (err, res) => {
				if (err) {
					console.log(err);
					return err;
				}
				mdDataList = res;
				cb(null, res);
			})
		},
		//code转成component
		(res, cb) => {
			console.log('3')
			console.log(res)

			async.map(mdDataList, turnComponent(componentName), (err, res) => {
				if (err) {
					console.log(err);
					return err;
				}
				cb(null, res);
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

		//write layout
		(res, cb) => {
			console.log('4');
			var IndexPath = OUTPUT + componentName + '/index.js';
			fs.writeFile(IndexPath, createTemplate.createIndexTemplate(componentName, mdDataList), {flag: 'w+', encoding: 'utf-8', mode: 0666}, 
				(err) => {
					if (err) throw err;
					return cb(null, null);
				}
			)

		},
		//write config
		(res, cb) => {
			console.log('5')
			console.log(mdDataList)
			var IndexPath = OUTPUT + componentName + '/config.js';

			var objStr = `
const config = ${JSON.stringify(mdDataList)};
export default config;
			`;

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
build(process.argv[2]);
var express = require('express');
var router = express.Router();
var path = require('path');

const defaultJson = {
    "status": 200,
    "code": 0,
    "message": "success"
}

router.get('/*', function(req, res, next) {
    console.log(req.url)
    if (req.url.split('/')[1] == 'api') {
        next();
    } else if (req.url.split('/')[1] == 'lib'){
        res.sendFile(path.join(__dirname, './src' + req.url));
    } else if (req.url.split('/')[1] == 'uptoken'){
        next();
    } else if (req.url.split('/')[1] == 'statics') {
        res.sendFile(path.join(__dirname, './src' + req.url));
    } else if (req.url.split('/')[1] == 'images') {
        res.sendFile(path.join(__dirname, req.url));
    } else if (req.url.split('/')[1] == 'src' && req.url.split('/')[2] == 'theme') {
        res.sendFile(path.join(__dirname, req.url));
    } else {
        res.sendFile(path.join(__dirname, './src/main.html'));
    } 
})

module.exports = router;

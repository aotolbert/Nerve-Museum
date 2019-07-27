const util = require('util');
const fs = require('fs');
var staticModule = require('static-module')
const express = require('express');

const router = express.Router();


router.use('/favicon.ico', express.static(__dirname + '/../static/favicon.ico', { maxAge: '1y' }));

// Set default caching headers
router.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache');
    next();
  });

router.get('/sw.js', (req, res) => {
const input = fs.createReadStream(`${__dirname}/../app/sw.js`);
const toCache = [
    '/static/styles.css',
    '/static/offline.html',
    '/static/shell-end.html',
    '/static/css/all.css',
]
//.map(u => rev.get(u));

// const hash = crypto.createHash('md5');
// for (const url in toCache) hash.update(url);

// const version = hash.digest('hex').slice(0, 10);

res.set('Content-Type', 'application/javascript');
    input.pipe(
        staticModule({
            'static-to-cache': () => JSON.stringify(toCache, null, '  '),
            'static-version': () => JSON.stringify(version)
    })).pipe(res);
});
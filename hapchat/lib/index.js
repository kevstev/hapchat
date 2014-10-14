// Load modules

var Fs = require('fs');
var Path = require('path');
var Handlers = require('./handlers');


// Declare internals


module.exports = {
    data: require('./data'),
    handlers: Handlers
};


module.exports.registerRoutes = function registerRoutes(server) {

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: Handlers.home
        },
        {
            method: 'POST',
            path: '/upload',
            config: Handlers.upload
        },
        {
            method: 'GET',
            path: '/static/{path*}',
            config: {
                handler: {
                    directory: {
                        path: Path.join(server.settings.app.root, 'public'),
                        index: false
                    }
                },
                cache: {
                    expiresIn: server.settings.app.oneDay * 10
                }
            }
        }
    ]);
};


module.exports.initPaths = function initPaths(root) {

    try {
        var dataDir = Path.join(root, 'data');

        Fs.mkdirSync(dataDir);
    }
    catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }

    try {
        var photosDir = Path.join(root, 'public', 'photos');

        Fs.mkdirSync(photosDir);
    }
    catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
};

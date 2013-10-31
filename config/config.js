var path     = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
    development: {
        root: rootPath,
        sessionSecret: 'XrQ2Vsw2tESughz71l1B80NwqxA7z499',
        db: 'mongodb://localhost/templatemanager_dev',
        amember: {
            url: 'http://amember.dev',
            key: 'CM1ttnc4YlVEf8QhlXxS'
        }
    },
    test: {
        root: rootPath
    },
    production: {
        root: rootPath
    }
};
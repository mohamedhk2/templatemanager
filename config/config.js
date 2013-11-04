var path     = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
    development: {
        root: rootPath,
        sessionSecret: 'XrQ2Vsw2tESughz71l1B80NwqxA7z499',
        db: 'mongodb://localhost/templatemanager_dev',
        upload: {
            dir: '/Volumes/data/projects_workspace/templatemanager',
            maxSize: 1024 * 1024 * 1024 * 2     // 2 GB
        },
        thumbs: {
            dir: '/Volumes/data/projects_workspace/templatemanager/thumbs',
            url: 'http://thumbs.templatemanager.dev',
            versions: {
                square: ['crop', 150],
                small: ['resize', 240],
                medium: ['resize', 640]
            }
        },
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
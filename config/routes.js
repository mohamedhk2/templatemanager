var account   = require('../app/controllers/account'),
    auth      = require('../app/controllers/auth'),
    dashboard = require('../app/controllers/dashboard'),
    index     = require('../app/controllers/index'),
    template  = require('../app/controllers/template'),
    user      = require('../app/controllers/user');

var authentication     = require('./middlewares/authentication'),
    adminAuthorization = [authentication.requireAuthentication, authentication.user.hasAuthorization];

module.exports = function(app) {
    // --- Front-end routes ---
    app.get('/', index.index);
    app.post('/filter', index.filter);

    // --- Administration routes ---

    // Auth
    app.all('/admin/signin', auth.signin);
    app.get('/admin/signout', auth.signout);

    // Back-end
    app.get('/admin', authentication.requireAuthentication, dashboard.index);
    app.all('/admin/password', authentication.requireAuthentication, auth.changePassword);

    app.get('/admin/template', authentication.requireAuthentication, template.index);
    app.all('/admin/template/add', authentication.requireAuthentication, template.add);
    app.all('/admin/template/edit/:id', authentication.requireAuthentication, template.edit);
    app.post('/admin/template/slug', authentication.requireAuthentication, template.slug);

    // Upload
    app.post('/admin/thumb', authentication.requireAuthentication, template.thumb);
    app.post('/admin/upload', authentication.requireAuthentication, template.upload);

    // User
    app.get('/admin/user', adminAuthorization, user.index);
    app.all('/admin/user/add', adminAuthorization, user.add);
    app.post('/admin/user/check/:field', adminAuthorization, user.check);

    // --- Account routes ---
    app.all('/account/signin', account.signin);
    app.all('/account/signout', account.signout);

    app.all('/account', authentication.requireAccountAuthentication, account.dashboard);
    app.all('/account/template', authentication.requireAccountAuthentication, account.template);
    app.get('/account/template/download/:id', authentication.requireAccountAuthentication, account.download);
};
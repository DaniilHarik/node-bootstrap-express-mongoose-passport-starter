var User = require('../../app/models/user');

exports.find = function (req, res, next) {
    if (req.url.indexOf(".") !== -1) {
        next();
        return;
    }

    var model;
    var id;
    var pattern = '/[0-9a-f]{24}/';
    var parts = req.url.split('/');

    for (i in parts) {
        if (parts[i].length === 24) {
            id = parts[i];
            continue;
        }
    }

    if (id === undefined) {
        next();
        return;
    }

    User.findOne({
        _id: id
    }, function (err, item) {
        if (err) {
            console.log("Did not find user with id " + id);
            next();
            return;
        }

        req.item = item;
        next();
    })
}
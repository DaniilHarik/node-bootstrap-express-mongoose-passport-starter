var User = require('../../app/models/user');
var Group = require('../../app/models/group');

exports.find = function (req, res, next) {
    if (req.url.indexOf(".") !== -1) {
        next();
        return;
    }

    var model;
    var repo;
    var id;
    var pattern = '/[0-9a-f]{24}/';
    var parts = req.url.split('/');

    for (i in parts) {
        if (parts[i].length === 24) {
            id = parts[i];
            continue;
        }else if(parts[i] === "users"){
            model = "users";
        }else if(parts[i] === "groups"){
            model = "groups";
        }
    }

    if (id === undefined || model === undefined) {
        next();
        return;
    }

    if(model === "users")
        repo = User;
    else if(model === "groups")
        repo = Group;
        
    repo.findOne({
        _id: id
    }, function (err, item) {
        if (err) {
            console.log("Did not find " + model + " with id " + id);
            next();
            return;
        }

        req.item = item;
        next();
    })
}
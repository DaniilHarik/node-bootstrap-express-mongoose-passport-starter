var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.get = function (req, res) {
    User.findOne({
        _id: req.params.id
    }, function (err, item) {
        if (err)
            console.log(item);

        res.json(item);
    })
}


exports.delete = function (req, res) {
    User.findOne({
        _id: req.params.id
    }, function (err, item) {
        if (err)
            console.log(items);

        res.render("admin/user/edit", {
            user: req.user,
            item: item
        });
    })
}

exports.update = function (req, res) {
    User.findOne({
        _id: req.params.id
    }, function (err, item) {
        if (err)
            console.log(err);

        for (var field in User.schema.paths) {
            if ((field !== '_id') && (field !== '__v')) {
                if (req.body[field] !== undefined) {
                    item[field] = req.body[field];
                }
            }
        }

        item.save();
        
        res.json({
            result: true
        });
    })
}

exports.edit = function (req, res) {
    User.findOne({
        _id: req.params.id
    }, function (err, item) {
        if (err)
            console.log(items);

        res.render("admin/user/edit", {
            user: req.user,
            item: item
        });
    })
}

exports.index = function (req, res) {
    User.find(function (err, items) {
        if (err)
            console.log(items);

        res.render("admin/user/index", {
            user: req.user,
            items: items
        });
    })
}
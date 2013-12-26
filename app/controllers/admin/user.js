var mongoose = require('mongoose'),
    binder = require('../../util/binder.js'),
    validator = require('express-validator'),
    sanitize = require('validator').sanitize,
    User = mongoose.model('User');


exports.get = function (req, res) {
    res.json(req.item);
}

exports.delete = function (req, res) {
    res.render("admin/user/edit", {
        user: req.user,
        item: req.item
    });
}

exports.edit = function (req, res) {
    res.render("admin/user/edit", {
        user: req.user,
        item: req.item
    });
}

exports.update = function (req, res) {
    req.body.role = sanitize(req.body.role).toInt();

    req.assert('email', 'required').notEmpty();
    req.assert('email', 'valid email required').isEmail();
    req.assert('password', 'required').notEmpty();

    var errors = req.validationErrors();

    if (errors !== null && errors.length > 0) {
        res.json({
            result: false,
            errors: errors
        });
        return;
    }
    
    binder(req, req.item, User)

    req.item.save();

    res.json({
        result: true
    });
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
var mongoose = require('mongoose'),
    binder = require('../../util/binder.js'),
    validator = require('express-validator'),
    sanitize = require('validator').sanitize,
    Repository = mongoose.model('Group');

var views = "admin/group/";

function validate(req, res) {
    req.assert('name', 'name is required').notEmpty();
    var errors = req.validationErrors();

    if (errors !== null && errors.length > 0) {
        res.json({
            result: false,
            errors: errors
        });
        return false;
    }
    return true;
}

exports.get = function (req, res) {
    res.json(req.item);
}

exports.index = function (req, res) {
    Repository.find(function (err, items) {
        if (err)
            console.log(items);

        if (req.accepts('json')) {
            res.json(items);
        } else {
            res.render(views + "index", {
                user: req.user,
                items: items
            });
        }
    })
}

exports.delete = function (req, res) {
    res.render(views + "edit", {
        user: req.user,
        item: req.item
    });
}

exports.add = function (req, res) {
    res.render(views + "add", {
        user: req.user
    });
}

exports.edit = function (req, res) {
    res.render(views + "edit", {
        user: req.user,
        item: req.item
    });
}

exports.create = function (req, res) {
    if (!validate(req, res))
        return;

    var item = new Repository()
    binder(req, item, Repository)
    item.save();

    res.json({
        result: true
    });
}

exports.update = function (req, res) {
    if (!validate(req, res))
        return;

    binder(req, req.item, Repository)
    req.item.save();

    res.json({
        result: true
    });
}
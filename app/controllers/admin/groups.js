var mongoose = require('mongoose'),
    binder = require('../../util/binder.js'),
    validator = require('express-validator'),
    sanitize = require('validator').sanitize,
    Group = mongoose.model('Group');

var views = "admin/group/";

exports.get = function (req, res) {
    res.json(req.item);
}

exports.index = function (req, res) {
    Group.find(function (err, items) {
        if (err)
            console.log(items);

        res.render(views+ "index", {
            user: req.user,
            items: items
        });
    })
}

exports.delete = function (req, res) {
    res.render(views + "edit", {
        user: req.user,
        item: req.item
    });
}

exports.edit = function (req, res) {
    res.render(views + "edit", {
        user: req.user,
        item: req.item
    });
}

exports.add = function (req, res) {
    res.render(views + "create", {
        user: req.user
    });
}

exports.create = function (req, res) {
    req.assert('name', 'name is required').notEmpty();
    var errors = req.validationErrors();

    if (errors !== null && errors.length > 0) {
        res.json({
            result: false,
            errors: errors
        });
        return;
    }
    
    var item = new Group()
    
    binder(req, item, Group)

    item.save();

    res.json({
        result: true
    });
}

exports.update = function (req, res) {
    req.assert('name', 'namme is required').notEmpty();
    var errors = req.validationErrors();

    if (errors !== null && errors.length > 0) {
        res.json({
            result: false,
            errors: errors
        });
        return;
    }
    
    binder(req, req.item, Group)

    req.item.save();

    res.json({
        result: true
    });
}
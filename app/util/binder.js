// Does model binding

module.exports = function (req, item, model) {
    for (var field in model.schema.paths) {
        if ((field !== '_id') && (field !== '__v')) {
            if (req.body[field] !== undefined) {
                item[field] = req.body[field];
            }
        }
    }
}
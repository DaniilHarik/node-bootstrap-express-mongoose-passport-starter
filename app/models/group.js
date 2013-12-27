var mongoose = require('mongoose');

GroupSchema = mongoose.Schema({
    name: {
        type: String, required: true
    }
});

var Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
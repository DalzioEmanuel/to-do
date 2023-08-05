const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;

const task = new Schema({
    Task:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: data
    }
});

mongoose.model('task', task);
module.exports = mongoose.model('task');
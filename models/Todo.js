const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    synopsis: String,
    date: { type: Date, default: Date.now },
    User:{
      type: Schema.Types.ObjectId, ref: "users"
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo

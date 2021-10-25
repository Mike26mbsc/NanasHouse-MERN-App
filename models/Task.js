const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const TasksSchema = new Schema({
  text: {
    type: String,
  }, 
  day: {
    type: String, 
  },
  details: {
    type: String, 
  },

  reminder: {
    type: Boolean, 
  }
});
//export
module.exports = Tasks = mongoose.model('tasks', TasksSchema);

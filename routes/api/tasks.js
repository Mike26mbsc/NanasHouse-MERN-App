const express = require('express');

const router = express.Router();
const cors = require('cors');
//Item model
 
const Task = require('../../models/Task');

let demoLogger = (req, res, next) =>{
  console.log("hello from router demoLogger");
  next();
}
//router.use(demoLogger);
router.use(cors());
// @route GET api/items
// @desc GET all items
// @access Public
router.get('/', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:3000');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, x-requested-with');
	res.setHeader('Content-Type','application/json');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS, DELETE');
	
  Task.find().then(tasks => res.json(tasks))
});

router.get('/:id', (req, res) => {
    Task.findById(req.params.id)
    .then(task => res.json(task))

});

router.put('/:id', (req, res) => {
	console.log(req.body.reminder);
	Task.findByIdAndUpdate(req.params.id, {reminder: req.body.reminder}).then(task => res.json(task));
});

// @route POST api/items
// @desc create a post
// @access Public
router.post('/', (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    day: req.body.day,
    details: req.body.details,
    reminder: req.body.reminder
    
  });

  newTask.save().then(task => res.json(task));
});

router.delete('/:id', (req, res) => {
  Task.findById(req.params.id)
	.then(task => task.remove().then(() => res.json({success: true})))
	.catch(err => res.status(404).json({success: false}));
})
module.exports = router;



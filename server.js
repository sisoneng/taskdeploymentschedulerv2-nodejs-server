const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { Task } = require('./models/task.model');

require('dotenv').config();

// connect to mongoose server
mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;

// display message once connected to mongoose server
connection.once('open', () => {
	console.log('Succesfully connected to MongoDB');
});

// make server listen to port
app.listen(process.env.PORT, () => {
	console.log(`Succesfully connected to Port ${process.env.PORT}`);
});

// middlewares
app.use(cors()); // allow access to different domain
app.use(bodyParser.json()); // parse json request data

app.get('/test', (req, res) => {
	console.log("Test test")
});

//@route htt://localhost:5000/save
//@desc save task
app.post('/save', (req, res) => {
	console.log(`Post Route: http://localhost:5000/`);
	let leader = req.body.leader;
	let member = req.body.member;
	let title = req.body.title;
	let description = req.body.description;
	let deadline = req.body.deadline;
	let status = req.body.status;

	let task = new Task({
		leader: leader,
		member: member,
		title: title,
		description: description,
		deadline: deadline,
		status: status,
	});

	task.save((err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success');
			res.send({ msg: 'Saved task successfully!' });
		}
	});
});

//@route http:localhost/:leader
//@desc get all tasks of leader
app.get('/leader/:leader', (req, res) => {
	let leader = req.params.leader;
	console.log(`Get Route: http://localhost:5000/leader/${leader}`);

	Task.find({ leader: leader }, (err, tasks) => {
		if (err) {
			console.log(err);
		} else {
			res.send(tasks);
		}
	});
});

//@route http:localhost/:member
//@desc get all tasks of member
app.get('/member/:member', (req, res) => {
	let member = req.params.member;
	console.log(`Get Route: http://localhost:5000/member/${member}`);

	Task.find({ member: member }, (err, tasks) => {
		if (err) {
			console.log(err);
		} else {
			console.log(tasks);
			res.send(tasks);
		}
	});
});

//@route http:localhost/:taskid
//@desc delete a task
app.delete('/delete/:taskid', (req, res) => {
	let id = mongoose.Types.ObjectId(req.params.taskid);
	console.log(`Delete Route: http://localhost:5000/delete/${id}`);
	Task.deleteOne({ _id: id }, (err, docs) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success');
			res.send('Task deleted');
		}
	});
});

//@route http:localhost/:status
//@desc update status and get tasks
app.put('/update/:taskid', (req, res) => {
	let id = mongoose.Types.ObjectId(req.params.taskid);
	let status = req.body.status;
	let member = req.body.member;
	console.log(`Get Put: http://localhost:5000/update/${id}`);
	Task.updateOne({ _id: id }, { status: status }, (err, docs) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Update Success');
		}
	});

	Task.find({ member: member }, (err, tasks) => {
		if (err) {
			console.log(err);
		} else {
			console.log(tasks);
			res.send(tasks);
		}
	});
});

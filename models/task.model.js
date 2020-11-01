const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	leader: {
		type: String,
	},
	member: {
		type: String,
	},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	deadline: {
		type: String,
	},
	status: {
		type: String,
	},
});
const Task = mongoose.model('Task', TaskSchema);
module.exports = { Task };

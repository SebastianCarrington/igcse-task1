const { model, Schema } = require("mongoose");

const formSchema = new Schema({
	forename: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	isVolunteer: {
		type: Boolean,
		required: true,
	},
	area: {
		type: String,
		required: false,
	},
	date: {
		type: String,
		required: true,
	},
	paid: {
		type: Boolean,
		required: true,
	},
});

module.exports = model("volunteer", formSchema);

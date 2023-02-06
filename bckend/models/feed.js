const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
	{
		post: {
			photo: {
				type: Buffer,
			},
			description: {
				type: String,
			},
			owner: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
			},
			profession: {
				type: String,
				trim: true,
			},
			avatar: {
				type: Buffer,
			},
			firstName: {
				type: String,
				trim: true,
				default: "__",
			},
			lastName: {
				type: String,
				trim: true,
				default: "__",
			},
		},
	},
	{
		timestamps: true,
	}
);

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;

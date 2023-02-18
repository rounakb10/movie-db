import mongoose from "mongoose"

const ListSchema = new mongoose.Schema(
	{
		imdbid: {
			type: String,
			required: [true, "Please provide imdb id"],
			maxLength: 20,
		},
		name: {
			type: String,
			maxLength: 100,
		},
		status: {
			type: String,
			enum: ["completed", "planning"],
			default: "planning",
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide user"],
		},
	},
	{ timestamps: true }
)

export default mongoose.model("List", ListSchema)

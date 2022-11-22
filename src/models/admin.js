const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Email is invalid");
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 7,
			validate(value) {
				if (value.toLowerCase().includes("password")) {
					throw new Error("Password is invalid");
				}
			},
		},

		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

adminSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.tokens;
	return userObject;
};

adminSchema.methods.generateAuthToken = async function () {
	const admin = this;
	const token = jwt.sign({ _id: admin._id.toString() }, "umeshkishorpatel");
	admin.tokens = admin.tokens.concat({ token });
	await admin.save();
	return token;
};

adminSchema.statics.findByCredentials = async (email, password) => {
	const admin = await Admin.findOne({ email });
	if (!admin) {
		throw new Error("Unable to login..");
	}
	const isMatch = await bcrypt.compare(password, admin.password);
	if (!isMatch) {
		throw new Error("Unable to login...");
	}
	return admin;
};

adminSchema.pre("save", async function (next) {
	const admin = this;
	if (admin.isModified("password")) {
		admin.password = await bcrypt.hash(admin.password, 8);
	}
	next();
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;

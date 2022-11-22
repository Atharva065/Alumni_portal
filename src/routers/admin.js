const express = require("express");
const Admin = require("../models/admin");
const adminAuth = require("../middleware/adminAuth");
const multer = require("multer");
const sharp = require("sharp");
const Feed = require("../models/feed");
const User = require("../models/user");
const router = new express.Router();

router.post("/admin", async (req, res) => {
	const admin = new Admin(req.body);
	try {
		await admin.save();
		const token = await admin.generateAuthToken();
		res.status(201).send({ admin, token });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post("/admin/login", async (req, res) => {
	try {
		const admin = await Admin.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await admin.generateAuthToken();
		res.send({ admin, token });
	} catch (e) {
		console.log(e);
		res.status(400).send();
	}
});

router.post("/admin/logout", adminAuth, async (req, res) => {
	try {
		req.admin.tokens = [];
		await req.admin.save();
		res.send();
	} catch (error) {
		res.status(500).send();
	}
});

router.get("/admin/me", adminAuth, async (req, res) => {
	res.send(req.admin);
});

router.patch("/admin/me", adminAuth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["email", "password", "info"];
	const isValid = updates.every((update) => {
		return allowedUpdates.includes(update);
	});
	if (!isValid) {
		return res.status(400).send({ error: "Invalid Update" });
	}
	try {
		updates.forEach((update) => {
			req.admin[update] = req.body[update];
		});
		await req.admin.save();
		res.send(req.admin);
	} catch (error) {
		res.status(400).send(error);
	}
});

const upload = multer({
	limits: {
		fileSize: 4000000,
	},
	fileFilter(req, file, cb) {
		if (
			!file.originalname.match(
				/\.(apng|jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp)$/
			)
		) {
			return cb(new Error("Please upload image"));
		}
		cb(undefined, true);
	},
});

// router.post(
// 	"/admin/carousel",
// 	auth,
// 	upload.single("carousel"),
// 	async (req, res) => {
// 		const buffer = await sharp(req.file.buffer)
// 			.resize({ width: 700, height: 500 })
// 			.png()
// 			.toBuffer();
// 		req.user.avatar = buffer;
// 		await req.user.save();
// 		res.send();
// 	},
// 	(error, req, res, next) => {
// 		res.status(400).send({ error: error.message });
// 	}
// );

// router.get("/users/me/avatar", auth, async (req, res) => {
// 	try {
// 		const user = await User.findById(req.user.id);
// 		// const user = await User.findById("61a101690bbb56891e77fa05");
// 		if (!user || !user.avatar) {
// 			throw new Error();
// 		}
// 		res.set("Content-Type", "image/png");
// 		res.send(user.avatar);
// 	} catch (e) {
// 		res.status(404).send();
// 	}
// });

// router.delete("/users/me/avatar", auth, async (req, res) => {
// 	req.user.avatar = undefined;
// 	await req.user.save();
// 	res.send();
// });

router.delete("/admin/me", adminAuth, async (req, res) => {
	try {
		await req.admin.remove();
		res.send(req.admin);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete("/user/delete", adminAuth, async (req, res) => {
	try {
		console.log(req.query._id);
		await Feed.deleteMany({ owner: req.query._id });
		const data = await User.deleteOne({ _id: req.query._id });
		res.send({ message: `User deleted`, data });
	} catch (error) {
		console.log();
		res.status(500).send(error);
	}
});

module.exports = router;

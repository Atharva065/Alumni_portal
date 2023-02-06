const express = require("express");
const User = require("../models/user");
const Feed = require("../models/feed");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const router = new express.Router();

const upload = multer({
	// limits: {
	// 	fileSize: 300000,
	// },
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

router.post(
	"/users/me/post",
	auth,
	upload.single("post"),
	async (req, res) => {
		const feed = new Feed();
		if (req.file) {
			if (req.file.buffer !== undefined) {
				const buffer = await sharp(req.file.buffer)
					// .resize({ width: 250, height: 250 })
					.png()
					.toBuffer();
				feed.post.photo = buffer;
			}
		}

		feed.post.owner = req.user._id;

		if (req.body.description) {
			feed.post.description = req.body.description;
		}
		if (req.user.profession) {
			feed.post.profession = req.user.profession;
		}
		if (req.user.avatar) {
			feed.post.avatar = req.user.avatar;
		}
		if (req.user.firstName) {
			feed.post.firstName = req.user.firstName;
		}
		if (req.user.lastName) {
			feed.post.lastName = req.user.lastName;
		}
		await feed.save();
		res.send();
	},
	(error, req, res, next) => {
		// console.log(error);
		res.status(400).send({ error: error.message });
	}
);
router.post("/users/me/tweet", auth, async (req, res) => {
	try {
		const feed = new Feed();
		feed.post.description = req.body.description;
		feed.post.owner = req.user._id;
		if (req.user.profession) {
			feed.post.profession = req.user.profession;
		}
		if (req.user.avatar) {
			feed.post.avatar = req.user.avatar;
		}
		if (req.user.firstName) {
			feed.post.firstName = req.user.firstName;
		}
		if (req.user.lastName) {
			feed.post.lastName = req.user.lastName;
		}
		await feed.save();
		res.send();
	} catch (e) {
		// // console.log(e);
		res.status(404).send();
	}
});

router.get("/users/me/post", auth, async (req, res) => {
	let size = req.query.size;
	let page = req.query.page;
	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 3;
	}
	const limit = parseInt(size);
	const skip = (page - 1) * size;
	// // console.log(limit, skip);
	try {
		// const user = await User.findById("61a101690bbb56891e77fa05");
		const feed = await Feed.find()
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip(skip);
		if (!feed) {
			throw new Error();
		}
		// res.set("Content-Type", "image/png");
		res.send({ feed });
	} catch (e) {
		// // console.log(e);
		res.status(404).send();
	}
});

router.get("/users/me/myPost", auth, async (req, res) => {
	try {
		// const post = post.qwner;
		const post = await Feed.find({ "post.owner": req.user._id });
		if (!post) {
			throw new Error("post not found");
		}
		// res.set("Content-Type", "image/png");
		res.send(post);
	} catch (e) {
		// // console.log(e);
		res.status(404).send(e);
	}
});

router.delete("/users/me/post/:id", auth, async (req, res) => {
	const _id = req.params.id;
	const feed = await Feed.findByIdAndDelete(_id);
	// await req.user.save();
	res.send();
});

module.exports = router;

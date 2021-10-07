import express from "express";
import fs from "fs";
// import webpush from "web-push";

// const vapidKeys = webpush.generateVAPIDKeys();

// webpush.setVapidDetails("mailto:test@test.com", vapidKeys.publicKey, vapidKeys.privateKey);

const router = express.Router();

router.get("/:collection", async (req, res, next) => {
	const data = await fs.promises.readFile(`${process.cwd()}/server/data/${req.params.collection}.json`);
	// Simulate slow server response
	setTimeout(() => res.json(JSON.parse(data)), 1500);
});

router.get("/subscribe");

//subscribe route
// router.post("/subscribe", (req, res) => {
// 	//Get push subscription object
// 	const subscription = req.body;
// 	res.status(201).json({});
// 	//create payload
// 	const payload = JSON.stringify({ title: "Push text" });
// 	//Pass object to send notification
// 	console.log("app.post / subscribe");
// 	webpush.sendNotification(subscription, payload).catch((err) => console.log(err));
// });

export { router };

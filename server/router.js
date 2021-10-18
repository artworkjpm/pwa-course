import express from "express";
import fs from "fs";
import webpush from "web-push";

const pushTokens = new Map();
const router = express.Router();
const publicKey = "BCP-MxswepN7VilAen5Qtt6EbT29bOJmt0nfdW06j071j9tSQcYCHFERg_xqKwRlP20jOmmC8huFZwq3UoHosEg";
const privateKey = "aW2gi8M4xZVclqAuHQOejvLCNbn1ziOU7IvXw5_bcMA";
webpush.setVapidDetails("mailto:test@test.com", publicKey, privateKey);

router.get("/:collection", async (req, res, next) => {
	console.log("router collection....");
	const data = await fs.promises.readFile(`${process.cwd()}/server/data/${req.params.collection}.json`);
	// Simulate slow server response
	setTimeout(() => res.json(JSON.parse(data)), 1500);
});

router.get("/turn-on-notifications", (req, res, next) => {
	console.log("router turn-on-notifications....");
	for (let subscription of pushTokens.values()) {
		webpush.sendNotification(subscription, JSON.stringify({ title: `Turn on notifications` }));
	}
	res.sendStatus(200);
});

router.post("/send-notification", (req, res) => {
	console.log("router send-notification....");
	const payload = JSON.stringify({
		title: "PWA push notifications are active",
	});
	const subscription = req.body;
	console.log(subscription);
	if (!pushTokens.has(subscription.keys.auth)) {
		pushTokens.set(subscription.keys.auth, subscription);
	}
	webpush.sendNotification(subscription, payload);
	res.status(201).json({});
});

export { router };

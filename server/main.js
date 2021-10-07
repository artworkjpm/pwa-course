import express from "express";
import { router } from "./router.js";

const app = express();
const port = 3000;

import webpush from "web-push";

const publicKey = "BCP-MxswepN7VilAen5Qtt6EbT29bOJmt0nfdW06j071j9tSQcYCHFERg_xqKwRlP20jOmmC8huFZwq3UoHosEg";

const privateKey = "aW2gi8M4xZVclqAuHQOejvLCNbn1ziOU7IvXw5_bcMA";

app.use(express.json());

webpush.setVapidDetails("mailto:test@test.com", publicKey, privateKey);
app.post("/subscribe", (req, res) => {
	// Get pushSubscription object
	const subscription = req.body;

	// Send 201 - resource created
	res.status(201).json({});

	// Create payload
	const payload = JSON.stringify({ title: "Push Test" });

	console.log(subscription);
	// Pass object into sendNotification
	webpush.sendNotification(subscription, payload).catch((err) => console.error(err));
});

/* app.get('/js/service-worker.js', (req, res, next) => {
  res.set('Service-Worker-Allowed', '/');
  next();
}); */

app.get("/images/:image.jpg", (req, res, next) => {
	// Simulate slow server response
	setTimeout(() => res.sendFile(`${process.cwd()}/dist/images/${req.params.image}.jpg`), 1500);
});

app.use(express.static(`${process.cwd()}/dist`));

app.get("/", (req, res) => {
	res.sendFile(`${process.cwd()}/server/index.html`);
});

app.use("/api", router);

app.listen(port, () => {
	console.log(`PWA workshp app listening at http://localhost:${port}`);
});

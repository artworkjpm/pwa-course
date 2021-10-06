import express from "express";
import { router } from "./router.js";

const webpush = require("web-push");
const path = require("path");
const app = express();
const port = 3000;

/* app.get('/js/service-worker.js', (req, res, next) => {
  res.set('Service-Worker-Allowed', '/');
  next();
}); */

const publicVapidKey = "BCP-MxswepN7VilAen5Qtt6EbT29bOJmt0nfdW06j071j9tSQcYCHFERg_xqKwRlP20jOmmC8huFZwq3UoHosEg";

const privateVapidKey = "aW2gi8M4xZVclqAuHQOejvLCNbn1ziOU7IvXw5_bcMA";

webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

//subscribe route
app.post("/subscribe", (req, res) => {
	//Get push subscription object
	const subscription = req.body;
	res.status(201).json({});
	//create payload
	const payload = JSON.stringify({ title: "Push text" });
	//Pass object to send notification
	webpush.sendNotification(subscription, payload).catch((err) => console.log(err));
});

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

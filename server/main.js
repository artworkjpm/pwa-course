import express from "express";
import { router } from "./router.js";
import webpush from "web-push";

const app = express();
const port = 3000;

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

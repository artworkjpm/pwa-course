console.log("test");
const publicVapidKey = "BCP-MxswepN7VilAen5Qtt6EbT29bOJmt0nfdW06j071j9tSQcYCHFERg_xqKwRlP20jOmmC8huFZwq3UoHosEg";
const privateVapidKey = "aW2gi8M4xZVclqAuHQOejvLCNbn1ziOU7IvXw5_bcMA";
//Its important to remember that the root folder is /dist not where the index.html is in /server
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("service-worker.js").then((e) => {
		if (e.installing) {
			console.log("installing");
		} else if (e.waiting) {
			console.log("waiting");
		} else if (e.active) {
			console.log("active");
			push(e);
		}
	});
} else {
	console.log("Service worker is not supported in your browser");
}

async function push(reg) {
	const subscription = await reg.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: publicVapidKey,
	});
	console.log("push registered");
	//send push notification
	console.log("sending push...");
	await fetch("/subscribe", {
		method: "POST",
		body: JSON.stringify(subscription),
		headers: {
			"content-type": "application/json",
		},
	});
	console.log("push sent....");
}

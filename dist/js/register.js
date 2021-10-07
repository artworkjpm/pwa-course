console.log("test");
const publicVapidKey = "BCP-MxswepN7VilAen5Qtt6EbT29bOJmt0nfdW06j071j9tSQcYCHFERg_xqKwRlP20jOmmC8huFZwq3UoHosEg";
const privateVapidKey = "aW2gi8M4xZVclqAuHQOejvLCNbn1ziOU7IvXw5_bcMA";
//Its important to remember that the root folder is /dist not where the index.html is in /server
if ("serviceWorker" in navigator) {
	send().catch((err) => console.log(err));
} else {
	console.log("Service worker is not supported in your browser");
}

//Register push, send push
async function send() {
	const register = await navigator.serviceWorker.register("service-worker.js");
	/* navigator.serviceWorker.register('/js/service-worker.js', { scope: '../' }); */
	console.log("pwa is working...");
	console.log("register push...");

	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: publicVapidKey,
	});
	console.log("push registered");
	//send push notification
	console.log("sending push...");
	await fetch("/subscribe", {
		method: "POST",
		body: JSON.stringify,
		headers: {
			"content-type": "application/json",
		},
	});
	console.log("push sent....");
}

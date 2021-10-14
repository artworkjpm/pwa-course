console.log("test");
const publicKey = "BCP-MxswepN7VilAen5Qtt6EbT29bOJmt0nfdW06j071j9tSQcYCHFERg_xqKwRlP20jOmmC8huFZwq3UoHosEg";
const privateKey = "aW2gi8M4xZVclqAuHQOejvLCNbn1ziOU7IvXw5_bcMA";

//Its important to remember that the root folder is /dist not where the index.html is in /server
if ("serviceWorker" in navigator) {
	serviceWorkerRegistration().catch((err) => console.error(err));
} else {
	console.log("Service worker is not supported in your browser");
}

let register;

document.addEventListener("DOMContentLoaded", () => {
	document.addEventListener(
		"click",
		function (event) {
			if (!event.target.matches("#subscribe")) return;
			event.preventDefault();
			console.log("subscribe me...");
			fetch("/api/notify");
		},
		false
	);

	document.addEventListener(
		"click",
		async (event) => {
			if (!event.target.matches("#send-notification")) return;
			event.preventDefault();
			console.log("#send-notification");
			await navigator.serviceWorker.ready;

			const subscription = await register.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: publicKey,
			});

			await fetch("/api/subscribe", {
				method: "POST",
				body: JSON.stringify(subscription),
				headers: {
					"content-type": "application/json",
				},
			});
		},
		false
	);
});

async function serviceWorkerRegistration() {
	register = await navigator.serviceWorker.register("service-worker.js");
}

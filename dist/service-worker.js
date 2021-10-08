const CACHE_NAME = "v1";
const publicVapidKey = "BCP-MxswepN7VilAen5Qtt6EbT29bOJmt0nfdW06j071j9tSQcYCHFERg_xqKwRlP20jOmmC8huFZwq3UoHosEg";
const privateVapidKey = "aW2gi8M4xZVclqAuHQOejvLCNbn1ziOU7IvXw5_bcMA";

self.addEventListener("install", (event) => {
	console.log("installing....");
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(["/css/styles.css", "/fonts/redemption.woff", "/images/main-teaser.jpg"]);
		})
	);
});

self.addEventListener("activate", (event) => {
	console.log("activated....>>>>>");

	// const subscription = event.pushManager.subscribe({
	// 	userVisibleOnly: true,
	// 	applicationServerKey: publicVapidKey,
	// });
	// console.log("push registered");
	// //send push notification
	// console.log("sending push...");
	// fetch("/subscribe", {
	// 	method: "POST",
	// 	body: JSON.stringify(subscription),
	// 	headers: {
	// 		"content-type": "application/json",
	// 	},
	// });
	// console.log("push sent....");

	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(async () => {
		// const subscription = event.pushManager.subscribe({
		// 	userVisibleOnly: true,
		// 	applicationServerKey: publicVapidKey,
		// });
		// console.log("push registered");
		// //send push notification
		// console.log("sending push...");
		// fetch("/subscribe", {
		// 	method: "POST",
		// 	body: JSON.stringify(subscription),
		// 	headers: {
		// 		"content-type": "application/json",
		// 	},
		// });
		// console.log("push sent....");

		const cacheNames = await caches;
		await Promise.all(
			cacheNames.map(async (cacheName) => {
				if (cacheWhitelist.indexOf(cacheName) === -1) {
					return await caches.delete(cacheName);
				}
			})
		);
	});
});

// self.addEventListener("fetch", (event) => {
// 	event.respondWith(
// 		(async () => {
// 			const cache = await caches.open(CACHE_NAME);
// 			const response = await cache.match(event.request);
// 			if (!response) {
// 				const responseFromServer = await fetch(event.request);
// 				await cache.put(event.request.url, responseFromServer.clone());
// 				return responseFromServer;
// 			}
// 			return response;
// 		})()
// 	);
// });

self.addEventListener("push", (e) => {
	const data = e.data.json();
	console.log("push received...");
	console.log(data);
	self.registration.showNotification(data.title, {
		body: "John Notification",
		icon: "/images/fav/favicon-32x32.png",
	});
});

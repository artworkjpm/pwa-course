tips:
npm i,
npm start

video:
https://www.youtube.com/watch?v=HlYFW2zaYQM

using web-push, obtain vapid keys with this command
`./node_modules/.bin/web-push generate-vapid-keys`

Public Key:
BCP-MxswepN7VilAen5Qtt6EbT29bOJmt0nfdW06j071j9tSQcYCHFERg_xqKwRlP20jOmmC8huFZwq3UoHosEg

Private Key:
aW2gi8M4xZVclqAuHQOejvLCNbn1ziOU7IvXw5_bcMA

Order of functions:

main.js (app.use("/api", router);) >>>
register.js (await fetch("/api/send-notification") >>>
router.js (outer.post("/send-notification", (req, res)) >>>
service-worker.js(self.addEventListener("push")

How to turn off subscribe permission?

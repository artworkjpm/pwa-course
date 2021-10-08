document.addEventListener("DOMContentLoaded", () => {
	const dataAttributeLoad = "data-load";
	const buttons = document.querySelectorAll(`[${dataAttributeLoad}]`);

	for (let button of buttons) {
		button.addEventListener("click", clickHandler);
	}

	async function clickHandler(event) {
		const collection = await fetchCollection(event.target.getAttribute(`${dataAttributeLoad}`));
		renderCollection(event.target, getCollectionMarkup(collection));
		removeElement(event.target);
	}

	async function fetchCollection(collectionName) {
		const response = await fetch(`/api/${collectionName}`, {
			headers: { "Content-Type": "application/json; charset=utf-8" },
		});

		return response.json();
	}

	function getCollectionMarkup(collection) {
		return `
      <h2>${collection.name}</h2>
      <div class="characters-grid">
        <img class="image" src="${collection.imageUrl}" alt="${collection.imageAltText}">
        <ul>
          ${collection.characters.map((character) => `<li><p>${character}</p></li>`).join("")}
        </ul>
      </div>
      `;
	}

	function renderCollection(element, markup) {
		element.parentElement.insertAdjacentHTML("afterend", markup);
	}

	function removeElement(element) {
		element.removeEventListener("click", clickHandler);
		element.parentElement.parentElement.removeChild(element.parentElement);
	}

	document.addEventListener(
		"click",
		function (event) {
			if (!event.target.matches("#subscribe")) return;
			event.preventDefault();
			console.log("subscribe");
			console.log("push sent from click...");
			console.log(swRegistration);
			const title = "From click";
			swRegistration.showNotification(title, {
				body: "from click",
				icon: "/images/fav/favicon-32x32.png",
			});
		},
		false
	);
});

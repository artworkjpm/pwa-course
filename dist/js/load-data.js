document.addEventListener('DOMContentLoaded', () => {
  const dataAttributeLoad = 'data-load';
  const buttons = document.querySelectorAll(`[${dataAttributeLoad}]`);

  for (let button of buttons) {
    button.addEventListener('click', clickHandler);
  }

  async function clickHandler(event) {
    const collection = await fetchCollection(
      event.target.getAttribute(`${dataAttributeLoad}`)
    );

    if (document.querySelector('.characters')) {
      removeElement();
    } else {
      renderCollection(event.target, getCollectionMarkup(collection));
    }
  }

  async function fetchCollection(collectionName) {
    const response = await fetch(`/api/${collectionName}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });

    return response.json();
  }

  function getCollectionMarkup(collection) {
    return `
    <div class="characters">
      <h2>${collection.name}</h2>
      <div class="characters-grid">
        <img class="image" src="${collection.imageUrl}" alt="${
      collection.imageAltText
    }">
        <ul>
          ${collection.characters
            .map((character) => `<li><p>${character}</p></li>`)
            .join('')}
        </ul>
      </div>
    </div>
      `;
  }

  function renderCollection(element, markup) {
    element.parentElement.insertAdjacentHTML('afterend', markup);
  }

  function removeElement() {
    document.querySelector('.characters').remove();
  }
});

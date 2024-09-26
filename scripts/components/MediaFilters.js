import { displayPage } from "../pages/photographer.js";

export const render = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const filterBy = urlParams.get("filterBy") || "popularité"; // Récupération du filtre par défaut ou de l'URL

  return `
    <div class="media-filter">
      <label id="filterBy-label" for="filterBy-options">Trier par</label> <!-- Ajout d'une étiquette avec id pour aria-labelledby -->
      <!-- Wrapper pour personnaliser le select -->
      <div class="custom-select-wrapper">
        <div class="custom-select" role="button" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="filterBy-label"> <!-- Role bouton avec ARIA pour accessibilité -->
          <!-- Déclencheur du menu déroulant avec un tabindex pour l'accessibilité clavier -->
          <div class="custom-select__trigger" tabindex="0" aria-labelledby="filterBy-label">
            <span>${filterBy}</span>
            <div class="arrow"></div>
          </div>
          <!-- Options du filtre, chaque option est accessible avec le clavier grâce à tabindex -->
          <div class="custom-options" role="listbox" id="filterBy-options"> <!-- Role listbox pour indiquer qu'il s'agit d'une liste de sélection -->
            <span class="custom-option" data-value="popularité" tabindex="0" role="option" aria-selected="false">Popularité</span>
            <span class="custom-option" data-value="date" tabindex="0" role="option" aria-selected="false">Date</span>
            <span class="custom-option" data-value="titre" tabindex="0" role="option" aria-selected="false">Titre</span>
          </div>
        </div>
      </div>
    </div>`;
};

export const events = (photographer, medias) => {
  const customSelect = document.querySelector(".custom-select");
  const trigger = customSelect.querySelector(".custom-select__trigger span");
  const options = customSelect.querySelectorAll(".custom-option");

  customSelect.addEventListener("click", function() {
    this.classList.toggle("open");
    const isOpen = this.classList.contains("open");
    this.setAttribute("aria-expanded", isOpen); 
  });

  customSelect.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
      this.classList.toggle("open");
      const isOpen = this.classList.contains("open");
      this.setAttribute("aria-expanded", isOpen);
    }
  });

  for (const option of options) {
    option.addEventListener("click", function() {
      trigger.textContent = this.textContent;
      customSelect.classList.remove("open");
      customSelect.setAttribute("aria-expanded", "false");

      const sortedMedias = sortMedia(medias, this.dataset.value);

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("filterBy", this.dataset.value);

      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParams.toString();
      window.history.pushState({ path: newUrl }, '', newUrl);
      displayPage(photographer, sortedMedias, -1); 
    });

    option.addEventListener("keydown", function(event) {
      if (event.key === "Enter" || event.key === " ") {
        trigger.textContent = this.textContent;
        customSelect.classList.remove("open");
        customSelect.setAttribute("aria-expanded", "false");

        const sortedMedias = sortMedia(medias, this.dataset.value);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("filterBy", this.dataset.value);

        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParams.toString();
        window.history.pushState({ path: newUrl }, '', newUrl);

        displayPage(photographer, sortedMedias, -1);
      }
    });
  }

  window.addEventListener("click", function(e) {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("open");
      customSelect.setAttribute("aria-expanded", "false");
    }
  });
};

const sortMedia = (medias, sortBy) => {
  switch (sortBy) {
    case "popularité":
      return medias.sort((a, b) => b.likes - a.likes);
    case "titre":
      return medias.sort((a, b) => a.title.localeCompare(b.title));
    case "date":
      return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    default:
      return medias;
  }
};

export default {
  render,
  events,
};

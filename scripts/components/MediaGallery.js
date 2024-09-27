import Media from "./Media.js"; 
import NewCarrousel from "./NewCarrousel.js"; 

export const render = (photographerName, medias) => {
  return `
    <div class="gallery">
      ${medias.map((media) => Media.render(media, photographerName)).join("")}
    </div>
  `;
};

export const events = (photographer, medias) => {
  const mediaItems = document.querySelectorAll('.media-item');

  mediaItems.forEach((item, index) => {
    item.setAttribute("tabindex", "0");

    // Clic pour ouvrir le carrousel
    item.addEventListener("click", (event) => {
      if (!event.target.closest('.likes')) {
        handleMediaClick(medias, index);
      }
    });

    // Accessibilité avec "Enter" ou "Espace"
    item.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && !event.target.closest('.likes')) {
        event.preventDefault();
        handleMediaClick(medias, index);
      }
    });
  });
};

const handleMediaClick = (medias, index) => {
  const photographerId = new URLSearchParams(window.location.search).get("id");
  NewCarrousel.render(medias, photographerId, index); 
};

export default {
  render,
  events,
};

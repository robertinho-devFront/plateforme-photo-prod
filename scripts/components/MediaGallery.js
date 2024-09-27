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

    // Gestion du clic sur le média pour ouvrir le carrousel
    item.addEventListener("click", (event) => {
      if (!event.target.closest('.likes')) {
        handleMediaClick(medias, index);
      }
    });

    // Gestion de l'accessibilité avec "Enter" ou "Espace"
    item.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && !event.target.closest('.likes')) {
        event.preventDefault();
        handleMediaClick(medias, index);
      }
    });

    // Gestion du clic sur le bouton "like"
    const likeButton = item.querySelector('.likes');
    likeButton.addEventListener("click", () => {
      handleLikeClick(medias, index);
    });
  });
};

// Gestion du clic sur le média pour le carrousel
const handleMediaClick = (medias, index) => {
  const photographerId = new URLSearchParams(window.location.search).get("id");
  NewCarrousel.render(medias, photographerId, index); 
};

// Gestion du clic sur le bouton "like"
const handleLikeClick = (medias, index) => {
  medias[index].likes += 1; // Incrémentation du nombre de "likes" pour le média spécifique

  // Mettre à jour l'affichage du nombre de "likes" sur le bouton
  const likeButton = document.querySelector(`#button-like-${medias[index].id}`);
  likeButton.querySelector('span').textContent = medias[index].likes;
};

export default {
  render,
  events,
};

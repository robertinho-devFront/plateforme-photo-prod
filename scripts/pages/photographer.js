import { 
  getPhotographerById,
  fetchMediaForPhotographer,
} from "../utils/api.js";
import Headline from '../components/Headline.js'; 
import MediaFilters from '../components/MediaFilters.js';
import MediaLikes from '../components/MediaLikes.js';
import MediaGallery from "../components/MediaGallery.js";
import NewCarrousel from '../components/NewCarrousel.js';

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");
  const mediaId = urlParams.get('mediaId');
  
  let filterBy = urlParams.get("filterBy") || "popularité"; // Filtrage par défaut par popularité

  if (!photographerId) {
    return;
  }

  try {
    const photographer = await getPhotographerById(photographerId);
    let medias = await fetchMediaForPhotographer(photographerId);

    // Trier les médias en fonction du filtre sélectionné
    medias = sortMedia(medias, filterBy);

    const currentIndex = mediaId ? medias.findIndex(media => media.id.toString() === mediaId) : -1;

    displayPage(photographer, medias, currentIndex, filterBy);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

export function displayPage(photographer, medias, currentIndex, filterBy) {
  const mainElement = document.querySelector("#main");
  if (!mainElement) {
    console.error("Main element not found in the DOM");
    return;
  }

  const totalLikes = medias.reduce((total, currentMedia) => total + currentMedia.likes, 0);
  const carouselStyle = currentIndex !== -1 ? 'display: block; z-index: 1000;' : 'display: none;';

  mainElement.innerHTML = `
    ${Headline.render(photographer)}
    ${MediaFilters.render(filterBy)}
    ${MediaGallery.render(photographer.name, medias)}
    ${MediaLikes.render({ price: photographer.price, likes: totalLikes })}
    <div id="carouselContainer" style="${carouselStyle}"></div>
  `;

  if (currentIndex !== -1) {
    NewCarrousel.render(medias, photographer.id, currentIndex);
  }

  // Attacher les événements après le rendu
  attachEvents(photographer, medias);
}

function attachEvents(photographer, medias) {
  Headline.events(); 
  MediaFilters.events(photographer, medias); 
  MediaGallery.events(photographer, medias); 
  attachLikeEvents(photographer, medias);
}

function attachLikeEvents(photographer, medias) {
  const likeButtons = document.querySelectorAll('.likes');
  const totalLikesElement = document.querySelector('.media-likes__totals');

  likeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mediaId = parseInt(button.getAttribute('data-id'));
      const media = medias.find(media => media.id === mediaId);
      if (media) {
        media.likes += 1;
        button.querySelector('span').textContent = media.likes; // Mettre à jour le nombre de "likes" pour ce média
        const totalLikes = medias.reduce((total, media) => total + media.likes, 0);
        totalLikesElement.textContent = totalLikes; // Mettre à jour le compteur total
      }
    });
  });
}

// Fonction de tri des médias
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

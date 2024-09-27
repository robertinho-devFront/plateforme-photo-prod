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
  
  // Par défaut, le filtre est sur "popularité" si aucun filtre n'est défini dans l'URL
  let filterBy = urlParams.get("filterBy") || "popularité";

  if (!photographerId) {
    return;
  }

  console.log("Photographer ID from URL:", photographerId);
  console.log("Media ID from URL (if present):", mediaId);
  console.log("Filter by (default or from URL):", filterBy);

  try {
    const photographer = await getPhotographerById(photographerId);
    console.log("Photographer fetched:", photographer); 

    let medias = await fetchMediaForPhotographer(photographerId);

    if (!photographer || !medias) {
      console.error("Failed to load photographer or media data.");
      return;
    }

    // Tri des médias selon la valeur initiale du filtre (popularité, titre ou date)
    medias = sortMedia(medias, filterBy);

    const currentIndex = mediaId ? medias.findIndex(media => media.id.toString() === mediaId) : -1;
    console.log("Initial currentIndex:", currentIndex);

    displayPage(photographer, medias, currentIndex, filterBy);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Fonction pour afficher la page du photographe
export function displayPage(photographer, medias, currentIndex, filterBy) {
  const mainElement = document.querySelector("#main");

  if (!mainElement) {
    console.error("Main element not found in the DOM");
    return;
  }

  const carouselStyle = currentIndex !== -1 ? 'display: block; z-index: 1000;' : 'display: none;';

  mainElement.innerHTML = `
    ${Headline.render(photographer)}
    ${MediaFilters.render(filterBy)} <!-- On passe le filtre actuel ici -->
    ${MediaGallery.render(photographer.name, medias)}
    ${MediaLikes.render({
      price: photographer.price,
      likes: medias.reduce((total, currentMedia) => total + currentMedia.likes, 0)
    })}
    <div id="carouselContainer" style="${carouselStyle}"></div>
  `;

  if (currentIndex !== -1) {
    NewCarrousel.render(medias, photographer.id, currentIndex);
  }

  attachEvents(photographer, medias);
  MediaLikes.events(); // Appel des événements pour les likes
}

// Attache les événements aux composants
function attachEvents(photographer, medias) {
  Headline.events(); 
  MediaFilters.events(photographer, medias); 
  MediaGallery.events(photographer, medias); 
  attachCarouselEvents(photographer, medias); 
  attachLikeEvents(photographer, medias);
}

// Gère les événements du carrousel
function attachCarouselEvents(photographer, medias) {
  const mediaItems = document.querySelectorAll('.media-item');
  mediaItems.forEach((item) => {
    item.removeEventListener('click', handleMediaItemClick);
    item.addEventListener('click', (event) => handleMediaItemClick(event, medias));
  });
}

// Gère les événements des boutons "likes"
function attachLikeEvents(photographer, medias) {
  const likeButtons = document.querySelectorAll('.likes');
  likeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); 
      const mediaId = parseInt(button.getAttribute("data-id"));
      const updatedMedias = medias.map(media => {
        if (media.id === mediaId) {
          return { ...media, likes: media.likes + 1 };
        }
        return media;
      });
      displayPage(photographer, updatedMedias, -1); 
    });
  });
}

// Gère le clic sur un élément média
function handleMediaItemClick(event, medias) {
  const mediaId = event.currentTarget.getAttribute('data-id');
  if (!mediaId) {
    console.error("No media ID found on the clicked item.");
    return;
  }
  const currentIndex = medias.findIndex(media => media.id.toString() === mediaId);
  if (currentIndex === -1) {
    console.error("Media not found in medias array.");
    return;
  }
  console.log("handleMediaItemClick - currentIndex:", currentIndex);
  updateUrlWithMediaId(mediaId);
  const photographerId = new URLSearchParams(window.location.search).get('id');
  console.log("handleMediaItemClick - photographerId:", photographerId);
  NewCarrousel.render(medias, photographerId, currentIndex);
  document.getElementById('carouselContainer').style.display = 'block';
}

// Met à jour l'URL avec l'ID du média
function updateUrlWithMediaId(mediaId) {
  const url = new URL(window.location);
  url.searchParams.set('mediaId', mediaId); 
  window.history.pushState({}, '', url);
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

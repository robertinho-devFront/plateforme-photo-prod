import { displayPage } from "../pages/photographer.js";
import { getFolderNameFromPhotographerName } from "../utils/getFolderNameFromPhotographerName.js";

const render = (media, photographerName) => {
  const mediaType = media.image ? "image" : "video"; 
  const mediaFile = media.image || media.video; 
  const sanitizedMediaFile = encodeURIComponent(mediaFile);
  const sanitizedFolderName = encodeURIComponent(
    getFolderNameFromPhotographerName(photographerName)
  );

  // Construction du chemin d'accès pour les médias (images et vidéos dans le même dossier)
  const mediaPath = `assets/images/SamplePhotos/${sanitizedFolderName}/${sanitizedMediaFile}`;

  // Ajoute une vérification de l'existence du fichier avant d'essayer de l'afficher
  fetch(mediaPath)
    .then(response => {
      if (response.ok) {
        return response.url;
      } else {
        console.error(`Media not found: ${mediaPath}`);
        // Retourne un média par défaut si le fichier n'existe pas
        return 'assets/images/default_media.png';
      }
    })
    .then(validMediaPath => {
      // Génère le HTML avec le chemin du fichier vérifié
      const mediaHTML = mediaType === "image"
        ? `<img src="${validMediaPath}" alt="${media.title}" class="media-content"/>`
        : `<video controls class="media-content">
            <source src="${validMediaPath}" type="video/mp4">
          </video>`;

      // Insère le HTML du média dans le DOM
      const mediaContainer = document.createElement('section');
      mediaContainer.classList.add('media-item');
      mediaContainer.setAttribute("data-id", media.id);
      mediaContainer.setAttribute("data-media-type", mediaType);

      mediaContainer.innerHTML = `
        <article>
          ${mediaHTML}
          <div class="media-item-infos">
            <h3>${media.title}</h3>
            <button class="likes" id="button-like-${media.id}" data-id="${media.id}">
              ${media.likes}
              <img src="assets/images/favorite.png" alt="Icône de cœur rouge indiquant le nombre de likes">
            </button>
          </div>
        </article>
      `;

      // Insère l'élément section dans la galerie (ou autre conteneur)
      document.querySelector('.gallery').appendChild(mediaContainer);
    })
    .catch(error => {
      console.error(`Error fetching media file: ${error}`);
    });
};

const events = (photographer, medias) => {
  const likeButtons = document.querySelectorAll(".likes");

  likeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
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
};

export default {
  render,
  events,
};

import { displayPage } from "../pages/photographer.js";
import { getFolderNameFromPhotographerName } from "../utils/getFolderNameFromPhotographerName.js";

const render = (media, photographerName) => {
  const mediaType = media.image ? "image" : "video"; 
  const mediaFile = media.image || media.video; 
  const sanitizedMediaFile = encodeURIComponent(mediaFile);
  const sanitizedFolderName = encodeURIComponent(
    getFolderNameFromPhotographerName(photographerName) 
  );

  const mediaPath =
    mediaType === "image"
      ? `assets/images/SamplePhotos/${sanitizedFolderName}/${sanitizedMediaFile}`
      : `assets/videos/${sanitizedFolderName}/${sanitizedMediaFile}`;

  return `
    <!-- Utilisation d'une section pour chaque média avec article pour contenir les informations -->
    <section class="media-item" data-id="${media.id}" data-media-type="${mediaType}">
      <article>
        ${mediaType === "image"
          ? `<img src="${mediaPath}" alt="${media.title}" class="media-content"/>`
          : `<video controls class="media-content">
              <source src="${mediaPath}" type="video/mp4">
            </video>`
        }
        <!-- Informations sur le média et gestion des likes -->
        <div class="media-item-infos"> 
          <h3>${media.title}</h3>
          <button class="likes" id="button-like-${media.id}" data-id="${media.id}">
            ${media.likes}
            <img src="assets/images/favorite.png" alt="Icône de cœur rouge indiquant le nombre de likes">
          </button>
        </div>
      </article>
    </section>
  `;
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

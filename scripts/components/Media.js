import { displayPage } from "../pages/photographer.js";
import { getFolderNameFromPhotographerName } from "../utils/getFolderNameFromPhotographerName.js";

const render = (media, photographerName) => {
  const mediaType = media.image ? "image" : "video"; 
  const mediaFile = media.image || media.video; 
  const sanitizedMediaFile = encodeURIComponent(mediaFile);
  const sanitizedFolderName = encodeURIComponent(
    getFolderNameFromPhotographerName(photographerName)
  );

  const mediaPath = `assets/images/SamplePhotos/${sanitizedFolderName}/${sanitizedMediaFile}`;

  return `
    <section class="media-item" data-id="${media.id}" data-media-type="${mediaType}">
      <article>
        ${mediaType === "image"
          ? `<img src="${mediaPath}" alt="${media.title}" class="media-content"/>`
          : `<video controls class="media-content">
              <source src="${mediaPath}" type="video/mp4">
            </video>`
        }
        <div class="media-item-infos">
          <h3>${media.title}</h3>
          <button class="likes" id="button-like-${media.id}" data-id="${media.id}">
            <span>${media.likes}</span>
            <img src="assets/images/favorite.png" alt="Icône de cœur rouge indiquant le nombre de likes">
          </button>
        </div>
      </article>
    </section>
  `;
};

export default {
  render,
};

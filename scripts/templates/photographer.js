export const getPhotographerHTML = (photographer) => {
  const sanitizedPortrait = encodeURIComponent(photographer.portrait);

  return `
        <a href="photographer.html?id=${photographer.id}" class="photographer-article">
            <article>
                <!-- Portrait du photographe avec un alt pour l'accessibilité -->
                <img src="assets/images/Photographers-ID-Photos/${sanitizedPortrait}" alt="${photographer.name}" class="photographer-portrait"/>
               
                <!-- Informations du photographe (nom, localisation, slogan et prix) dans un article -->
                <section class="photographer-infos">
                    <h2 class="photographer_section-article-title">${photographer.name}</h2>
                    <p class="photographer-location">${photographer.city}, ${photographer.country}</p>
                    <p class="photographer-tagline">${photographer.tagline}</p>
                    <p class="photographer-price">${photographer.price}€/jour</p>
                </section>
            </article>
        </a>
    `;
};

export const getMediaHTML = (media, folderName) => {
  const mediaType = media.image ? "image" : "video"; 
  const mediaFile = media.image || media.video;
  const sanitizedMediaFile = encodeURIComponent(mediaFile);
  const sanitizedFolderName = encodeURIComponent(folderName);

  const mediaPath =
    mediaType === "image"
      ? `assets/images/SamplePhotos/${sanitizedFolderName}/${sanitizedMediaFile}`
      : `assets/videos/${sanitizedFolderName}/${sanitizedMediaFile}`;

  return `
        <!-- Utilisation de section et article pour structurer chaque media -->
        <section class="media-item">
            <article>
                ${mediaType === "image"
      ? `<img src="${mediaPath}" alt="${media.title}" class="media-content"/>`
      : `<video controls class="media-content">
                    <source src="${mediaPath}" type="video/mp4">
          </video>`
    }
                <!-- Informations du media avec nombre de likes -->
                <div class="media-item-infos"> 
                    <h3>${media.title}</h3>
                    <p class="likes">${media.likes} 
                        <button class="like-button">
                            <img src="assets/images/favorite.png" alt="Icône de cœur rouge indiquant le nombre de likes">
                        </button>
                    </p>
                </div>
            </article>
        </section>
    `;
};

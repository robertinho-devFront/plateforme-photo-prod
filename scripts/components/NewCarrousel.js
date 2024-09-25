import { getPhotographerById } from "../utils/api.js";
import { getFolderNameFromPhotographerName } from "../utils/getFolderNameFromPhotographerName.js";

export const render = async (medias, photographerId, currentIndex) => {
  console.log("render - photographerId:", photographerId);
  console.log("render - currentIndex:", currentIndex);

  if (
    typeof currentIndex === "undefined" ||
    currentIndex < 0 ||
    currentIndex >= medias.length
  ) {
    console.error("Index du média invalide ou non défini.");
    document.querySelector("#carouselContainer").innerHTML = "";
    return;
  }

  const selectedMedia = medias[currentIndex];
  console.log("render - selectedMedia:", selectedMedia);

  let photographer;
  try {
    photographer = await getPhotographerById(photographerId);
    console.log("Photographer data fetched in NewCarrousel.js:", photographer);
  } catch (error) {
    console.error("Erreur lors de la récupération du photographe:", error);
    return;
  }

  if (!photographer) {
    console.error("Photographe non trouvé.");
    return;
  }

  const folderName = getFolderNameFromPhotographerName(photographer.name);
  const mediaFile = selectedMedia.image || selectedMedia.video;
  const filePath = `assets/images/SamplePhotos/${folderName}/${mediaFile}`;

  const carouselContainer = document.querySelector("#carouselContainer");
  if (carouselContainer) {
    carouselContainer.innerHTML = `
      <div class="carousel-overlay" style="z-index: 1000;">
        <div class="carousel">
          <button class="carousel-close">x</button>
          <button class="carousel-control left"><</button>
          ${
            selectedMedia.image
              ? `<img src="${filePath}" alt="${selectedMedia.title}" class="carousel-image">`
              : `<video controls class="carousel-image">
                <source src="${filePath}" type="video/mp4">
              </video>`
          }
          <button class="carousel-control right">></button>
          <div class="carousel-title">${selectedMedia.title}</div>
        </div>
      </div>
    `;
    carouselContainer.style.display = "block";
    attachEvents(medias, currentIndex);
  } else {
    console.error("Élément container du carrousel non trouvé dans le DOM.");
  }
};

const attachEvents = (medias, currentIndex) => {
  const overlay = document.querySelector(".carousel-overlay");
  const closeButton = document.querySelector(".carousel-close");
  const leftButton = document.querySelector(".carousel-control.left");
  const rightButton = document.querySelector(".carousel-control.right");

  if (!overlay || !closeButton || !leftButton || !rightButton) {
    console.log("One or more elements are missing:");
    console.log({ overlay, closeButton, leftButton, rightButton });
    return;
  }

  closeButton.focus();

  closeButton.addEventListener("click", closeCarousel);
  closeButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      closeCarousel();
    }
  });

  overlay.addEventListener("click", handleOverlayClick);

  overlay.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "Escape":
        closeCarousel();
        break;
      case "ArrowLeft":
        handleLeftClick();
        break;
      case "ArrowRight":
        handleRightClick();
        break;
      default:
        break;
    }
  });

  leftButton.addEventListener("click", handleLeftClick);
  leftButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleLeftClick();
    }
  });

  rightButton.addEventListener("click", handleRightClick);
  rightButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleRightClick();
    }
  });

  overlay.focus();

  function handleLeftClick() {
    const newIndex = (currentIndex + medias.length - 1) % medias.length;
    updateCarousel(medias, newIndex);
  }

  function handleRightClick() {
    const newIndex = (currentIndex + 1) % medias.length;
    updateCarousel(medias, newIndex);
  }

  function handleOverlayClick(event) {
    if (event.target === overlay) {
      closeCarousel();
    }
  }
};

const closeCarousel = () => {
  const overlay = document.querySelector(".carousel-overlay");
  const carouselContainer = document.getElementById("carouselContainer");
  if (overlay) overlay.remove();
  if (carouselContainer) {
    carouselContainer.style.display = "none";
    carouselContainer.style.zIndex = "";
  }

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("mediaId");
  window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
};

const updateCarousel = (medias, newIndex) => {
  const newMediaId = medias[newIndex].id;
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("mediaId", newMediaId);
  window.history.pushState(
    {},
    "",
    `${window.location.pathname}?${urlParams.toString()}`
  );

  const photographerId = new URLSearchParams(window.location.search).get("id");
  console.log("updateCarousel - photographerId:", photographerId);
  render(medias, photographerId, newIndex);
};

export default {
  render,
  events: attachEvents,
};

import Modal from './Modal.js';

export const render = ({ name, city, country, tagline, portrait }) => {
  return `
    <header>
      <!-- Lien de retour à la page d'accueil avec un aria-label pour améliorer l'accessibilité -->
      <a href="index.html" aria-label="Retour à la page d'accueil">
        <!-- Image du logo avec une description explicite pour les lecteurs d'écran -->
        <img src="assets/images/logo.png" class="logo" alt="Fisheye Home page"/>
      </a>
    </header>

    <!-- Section qui contient les informations du photographe -->
    <div class="headline">
      <div class="headline__photographer-informations">
        <!-- Nom du photographe en titre, balise h2 pour indiquer une hiérarchie -->
        <h2 class="headline__photographer-informations__name">${name}</h2>
        <!-- Localisation du photographe : ville et pays -->
        <p class="headline__photographer-informations__location">${city}, ${country}</p>
        <!-- Slogan ou description courte du photographe -->
        <p class="headline__photographer-informations__tagline">${tagline}</p>
      </div>

      <!-- Bouton pour ouvrir la fenêtre de contact avec un aria-label pour les utilisateurs de lecteurs d'écran -->
      <button class="headline__contact-button" id="openModalButton" aria-label="Ouvrir la fenêtre de contact">
        Contactez-moi
      </button>

      <!-- Image de l'avatar du photographe avec une description alt explicite -->
      <img class="headline__avatar" src="assets/images/Photographers-ID-Photos/${encodeURIComponent(portrait)}" alt="Portrait de ${name}" />
    </div>

    <!-- Rendu du composant Modal pour afficher la fenêtre modale de contact -->
    ${Modal.render(name)}
  `;
};

export const events = () => {
  Modal.events();
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML += Modal.render();
  Modal.events();
});

export default {
  render,
  events,
};

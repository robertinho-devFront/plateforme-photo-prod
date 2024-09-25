export const render = (photographerName = "") => {
  return `
    <div class="modal" id="contactModal" style="display:none;" role="dialog" aria-labelledby="contactModalTitle" aria-modal="true">
      <!-- Contenu de la modal, cachée par défaut avec display: none -->
      <div class="modal-content">
        <!-- Titre de la modal "Contactez Moi" avec aria-labelledby -->
        <h2 class="modal-title" id="contactModalTitle">Contactez Moi</h2>
        <!-- Nom du photographe ajouté dynamiquement pour personnaliser la modal -->
        <h3 class="modal-title">${photographerName}</h3>  
        
        <!-- Bouton de fermeture avec l'icône "X" et aria-label pour accessibilité -->
        <span class="close-button" aria-label="Fermer la fenêtre de contact">&times;</span>
        
        <!-- Formulaire de contact -->
        <form id="contactForm" novalidate> <!-- Ajout de l'attribut novalidate pour gérer la validation manuellement -->
          <!-- Champ pour le nom avec un label accessible et aria-required pour indiquer l'obligation -->
          <label for="name">Nom :</label>
          <input type="text" id="name" name="name" required aria-required="true" aria-label="Nom">
          
          <!-- Champ pour le prénom avec un label accessible -->
          <label for="lastname">Prénom :</label>
          <input type="text" id="lastname" name="lastname" required aria-required="true" aria-label="Prénom">
  
          <!-- Champ pour l'email avec une validation intégrée et une regex pour le format email -->
          <label for="email">Votre email :</label>
          <input type="email" id="email" name="email" required aria-required="true" aria-label="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$">
  
          <!-- Champ texte pour le message avec un aria-label -->
          <label for="message">Votre message :</label>
          <textarea id="message" name="message" required aria-required="true" aria-label="Message"></textarea>
  
          <!-- Bouton de soumission du formulaire -->
          <input type="submit" value="Envoyer" aria-label="Envoyer le formulaire">
        </form>
      </div>
    </div>
  `;
};

export const events = () => {
  const modal = document.querySelector("#contactModal");

  const openModalButton = document.querySelector("#openModalButton");

  const closeModalButton = document.querySelector(".close-button");

  if (openModalButton) {
    openModalButton.onclick = () => {
      modal.style.display = "block"; 
    };
  }

  if (closeModalButton) {
    closeModalButton.onclick = () => {
      modal.style.display = "none"; 
    };
  }

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none"; 
    }
  };

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none"; 
    }
  });

  const contactForm = document.querySelector("#contactForm");
  
  if (contactForm) {
    contactForm.onsubmit = (event) => {
      event.preventDefault(); 

      const name = document.querySelector("#name").value;
      const lastname = document.querySelector("#lastname").value;
      const email = document.querySelector("#email").value;
      const message = document.querySelector("#message").value;

      console.log("Nom :", name);
      console.log("Prénom :", lastname);
      console.log("Email :", email);
      console.log("Message :", message);

      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailRegex.test(email)) {
        alert("Veuillez entrer un email valide.");
        return; 
      }

      alert("Message envoyé !"); 
      
      modal.style.display = "none";
    };
  }
};

export default {
  render,
  events,
};

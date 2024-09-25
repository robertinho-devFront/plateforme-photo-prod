// Fonction utilitaire pour générer un nom de dossier à partir du nom d'un photographe
// Cette fonction transforme un nom de photographe en format "Nom-Prenom" avec la première lettre de chaque partie en majuscule.

export const getFolderNameFromPhotographerName = (photographerName) => {
  return (
    photographerName
      // Divise le nom du photographe en plusieurs parties en utilisant l'espace comme séparateur.
      // Exemple : "jean dupont" devient ["jean", "dupont"].
      .split(" ")

      // Remplace chaque espace par un tiret.
      // Exemple : ["jean", "dupont"] devient "jean-dupont".
      .join("-")

      // Divise à nouveau la chaîne en utilisant le tiret comme séparateur pour traiter les noms composés.
      // Exemple : "jean-dupont" devient ["jean", "dupont"].
      .split("-")

      // Parcourt chaque mot du tableau résultant et met la première lettre de chaque mot en majuscule,
      // tout en laissant les autres lettres en minuscule.
      // Exemple : ["jean", "dupont"] devient ["Jean", "Dupont"].
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))

      // Rejoint tous les mots avec des tirets pour reformer la chaîne.
      // Exemple : ["Jean", "Dupont"] devient "Jean-Dupont".
      .join("-")
  );
};

// Export par défaut de la fonction pour qu'elle puisse être utilisée ailleurs dans le projet.
export default getFolderNameFromPhotographerName;

# Base de code du projet P6 - Parcours Front-end

## Démarrer le projet

Rien à installer ici, il suffit d'ouvrir le fichier `index.html`.

Structure du Dossier
Fichiers Principaux :
api.js
Ce fichier gère les appels API pour récupérer les données des photographes et leurs médias. Vous y trouverez des fonctions asynchrones pour effectuer des requêtes vers un fichier JSON local, ainsi que des méthodes pour filtrer et obtenir des données spécifiques.

getFolderNameFromPhotographerName.js
Ce fichier contient une fonction utilitaire utilisée pour transformer les noms des photographes en noms de dossiers formatés. Cela permet de normaliser l'organisation des fichiers d'images et vidéos dans le système.

Explications étape par étape : le processus de transformation des noms est décrit, notamment la manipulation des chaînes de caractères.
NewCarrousel.js
Ce fichier gère la logique du carrousel (lightbox) permettant de naviguer à travers les images et vidéos d'un photographe. Il inclut les fonctions pour afficher le carrousel, naviguer entre les médias et fermer la lightbox.

Événements et navigation : les événements clavier (flèches, escape) sont documentés, et la gestion des interactions utilisateur est décrite.
MediaGallery.js
Ce fichier s'occupe du rendu des médias dans la galerie du photographe. Il inclut le tri des médias et leur affichage dans un format cohérent.

Rendu dynamique : le fichier est commenté pour expliquer la génération dynamique de la galerie et comment les événements (clics, navigation) sont gérés.
Structure des Commentaires
Tous les fichiers contiennent des commentaires bien structurés afin de :

Décrire la fonction : chaque fonction principale est introduite avec une explication de son objectif et de sa finalité dans le projet.
Expliquer les étapes internes : lorsque le code réalise des opérations complexes ou non évidentes, des explications étape par étape sont fournies pour clarifier le flux logique.
Mettre en lumière les aspects d'accessibilité : certains fichiers, comme ceux liés aux formulaires et à la navigation, incluent des détails sur l'accessibilité pour s'assurer que le code respecte les bonnes pratiques.
Utilisation des Commentaires




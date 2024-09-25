import { getPhotographerHTML } from '../templates/photographer.js'

async function fetchPhotographers() {
    try {
        const response = await fetch('data/photographers.json'); 

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des photographes');
        }

        const data = await response.json();

        console.log("Photographers fetched: ", data.photographers);

        return data.photographers;
    } catch (error) {
        console.error("Erreur lors de la récupération des photographes:", error);
        return [];
    }
}

async function getPhotographers() {
    try {
        const photographers = await fetchPhotographers();

        console.log("Liste des photographes récupérés :", photographers);

        return photographers;
    } catch (error) {
        console.error("Could not fetch photographers:", error);

        return [
            {
                "name": "Paul Emploi",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "France Travail",
                "id": 2,
                "city": "Paris aussi",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            }
        ];
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    const photographersHTML = photographers.map(getPhotographerHTML).join("");
    photographersSection.innerHTML = photographersHTML;
}

async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();

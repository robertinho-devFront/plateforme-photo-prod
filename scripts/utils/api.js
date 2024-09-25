export const fetchMediaForPhotographer = async (photographerId) => {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data.media.filter(
      (media) => media.photographerId === parseInt(photographerId)
    );
  } catch (error) {
    console.error("Could not fetch media for photographer:", error);
    return [];
  }
};

export const fetchPhotographers = async () => {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    
    return data.photographers;
  } catch (error) {
    console.error("Could not fetch photographers:", error);
    return [];
  }
};

export const getPhotographerById = async (id) => {
  const photographersData = await fetchPhotographers();
  const photographer = photographersData.find((p) => p.id.toString() === id.toString());
  
  return photographer;
};

const getFolderNameFromPhotographerName = (photographerName) => {
  if (typeof photographerName !== 'string') {
    console.error("photographerName is not a string:", photographerName);
    return '';
  }

  const words = photographerName.split(" ");
  const capitalizedWords = words.map(word => {
    const hyphenatedParts = word.split("-");
    const capitalizedHyphenatedParts = hyphenatedParts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
    return capitalizedHyphenatedParts.join("-");
  });
  
  const folderName = capitalizedWords.join("-");
  console.log("Converted folder name:", folderName); 
  
  return folderName;
};

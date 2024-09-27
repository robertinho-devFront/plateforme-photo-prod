export const render = ({ price, likes }) => {
  return `<div class="media-likes"> 
    <div class="media-likes__totalblock">
      <p class="media-likes__totals">${likes}</p>
      <img src="assets/images/black-heart.png" class="media-likes__heart" alt="like" tabindex="0">
    </div>
    <div class="media-likes__photographer">
      <p class="media-likes__photographer-price">${price}€/jour</p>
    </div>
  </div>`;
};

export const events = () => {
  const likeIcons = document.querySelectorAll('.media-likes__heart');
  if (likeIcons.length) {
    likeIcons.forEach(icon => {
      icon.addEventListener('click', () => handleLike(icon));
      icon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault(); 
          handleLike(icon);
        }
      });
    });
  }

  function handleLike(icon) {
    const totalLikesElement = icon.previousElementSibling; // Sélectionne l'élément juste avant (total des likes)
    let totalLikes = parseInt(totalLikesElement.textContent, 10);
    totalLikes += 1;
    totalLikesElement.textContent = totalLikes;
  }
};

export default {
  render,
  events,
};

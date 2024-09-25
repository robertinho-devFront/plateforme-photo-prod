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
  const likeIcon = document.querySelector('.media-likes__heart');
  if (likeIcon) {
    likeIcon.addEventListener('click', handleLike);
    likeIcon.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); 
        handleLike();
      }
    });
  }

  function handleLike() {
    const totalLikesElement = document.querySelector('.media-likes__totals');
    let totalLikes = parseInt(totalLikesElement.textContent, 10);
    totalLikes += 1;
    totalLikesElement.textContent = totalLikes;
  }
};

export default {
  render,
};

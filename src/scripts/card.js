const cardTemplate = document.querySelector('#card-template').content; 

const createCard = (cardContent, onDeleteClick, onImageClick, addLike) => {
  const { name, link } = cardContent;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const image = card.querySelector('.card__image');
  const title = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const like = card.querySelector('.card__like-button');

  image.src = link;
  image.alt = link;
  title.textContent = name;

  deleteButton.addEventListener('click', onDeleteClick);
  image.addEventListener('click', () => onImageClick({ name, link }));
  like.addEventListener('click', () => addLike(like));

  return card;
}

const deleteCard = ({ target }) => {
  target.closest('.card').remove();
}

const addLike = (like) => {
  like.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, addLike }

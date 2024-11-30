import { apiService } from "./api";

const cardTemplate = document.querySelector('#card-template').content; 

const createCard = (cardContent, deleteCard, onImageClick, toggleLike, profileId) => {
  const { name, link, likes, _id : cardId, owner } = cardContent;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const image = card.querySelector('.card__image');
  const title = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const like = card.querySelector('.card__like');
  const likeButton = like.querySelector('.card__like-button');
  const likesCount = like.querySelector('.card__like-count');

  const isLiked = likes.some((like) => like._id === profileId);

  image.src = link;
  image.alt = link;
  title.textContent = name;
  likesCount.textContent = likes.length;

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (owner._id === profileId) {
    deleteButton.addEventListener('click', (event) => deleteCard(event, cardId));
  } else {
    deleteButton.remove();
  }

  image.addEventListener('click', () => onImageClick({ name, link }));
  likeButton.addEventListener('click', () => toggleLike(like, cardId));

  return card;
}

const deleteCard = async ({ target }, cardId) => {
  apiService.deleteCard(cardId)
    .then(() => {
      target.closest('.card').remove();
    })
    .catch(() => {
      console.log(`Ошибка удаления карточки: ${error}`);
    });
}

const toggleLike = async (likeElement, cardId) => {  
  const likeButton = likeElement.querySelector('.card__like-button');
  const likesCount = likeElement.querySelector('.card__like-count');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    apiService.deleteLike(cardId)
    .then((updatedCard) => {
      likeButton.classList.remove('card__like-button_is-active');
      likesCount.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.log(`Ошибка удаления лайка: ${error}`);
    });

    return;
  }

  apiService.addLike(cardId)
    .then((updatedCard) => {
      likeButton.classList.add('card__like-button_is-active');
      likesCount.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.log(`Ошибка добавления лайка: ${error}`);
    });
}

export { createCard, deleteCard, toggleLike }

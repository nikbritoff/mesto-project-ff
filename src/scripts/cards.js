import { closePopup, openPopup } from "./popup";

const cardTemplate = document.querySelector('#card-template').content; 
const cardsList = document.querySelector('.places__list');
const addNewCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const closeButton = addCardPopup.querySelector('.popup__close');

const form = addCardPopup.querySelector('.popup__form');
const placeNameInput = form.querySelector(`[name="place-name"]`);
const linkInput = form.querySelector(`[name="link"]`);

const fullModePopup = document.querySelector('.popup_type_image');
const fullModeImage = fullModePopup.querySelector('.popup__image');
const fullModeCaption = fullModePopup.querySelector('.popup__caption');
const fullModeCloseButton = fullModePopup.querySelector('.popup__close');


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

const closeFullMode = () => {
  fullModePopup.removeEventListener('click', handleFullModeOverlayClick);
  fullModeCloseButton.removeEventListener('click', closeFullMode);
  window.removeEventListener('keydown', handleFullModePopupEscKeyDown);

  closePopup(fullModePopup);
}

const handleFullModePopupEscKeyDown = (e) => {
  if (e.code === 'Escape') {
    closeFullMode();
  }
};

const handleFullModeOverlayClick = (e) => {
  if (e.target.matches('.popup_type_image ')) {
    closeFullMode();
  }
}

const openFullMode = ({ name, link }) => {
  fullModeImage.src = link;
  fullModeCaption.textContent = name;

  fullModePopup.addEventListener('click', handleFullModeOverlayClick);
  fullModeCloseButton.addEventListener('click', closeFullMode);
  window.addEventListener('keydown', handleFullModePopupEscKeyDown);

  openPopup(fullModePopup);
}

// AddCard

const handleAddCardPopupEscKeyDown = (e) => {
  if (e.code === 'Escape') {
    closeAddCardPopup();
  }
};

const handleOverlayClick = (e) => {
  if (e.target.matches('.popup_type_new-card')) {
    closeAddCardPopup();
  }
}


const closeAddCardPopup = () => {
  window.removeEventListener('keydown', handleAddCardPopupEscKeyDown);
  addCardPopup.removeEventListener('click', handleOverlayClick);
  closeButton.removeEventListener('click', closeAddCardPopup);  
  form.removeEventListener('submit', handleFormSubmit); 

  closePopup(addCardPopup);
}

const openAddCardPopup = () => {
  openPopup(addCardPopup);

  window.addEventListener('keydown', handleAddCardPopupEscKeyDown);
  addCardPopup.addEventListener('click', handleOverlayClick);
  closeButton.addEventListener('click', closeAddCardPopup);
  form.addEventListener('submit', handleFormSubmit); 
}

const handleAddCardButtonClick = () => {
  openAddCardPopup();
}

const handleFormSubmit = (e) => {
  e.preventDefault();

  const name = placeNameInput.value;
  const link = linkInput.value;

  const newCard = createCard({ name, link }, deleteCard, openFullMode, addLike);
  cardsList.prepend(newCard);

  placeNameInput.value = '';
  linkInput.value = '';

  closeAddCardPopup();
}

export const initAddCardPopup = () => {
  addNewCardButton.addEventListener('click', handleAddCardButtonClick);
}

export const renderCards = (cards) => {
  cards.forEach((card) => {
    cardsList.appendChild(createCard(card, deleteCard, openFullMode, addLike));
  });
}
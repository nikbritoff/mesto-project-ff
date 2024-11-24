import './index.css';

import { initialCards } from './scripts/constants.js';
import { createCard, deleteCard, addLike } from './scripts/card.js';
import { openPopup,closePopup } from './scripts/popup.js';

const cardsList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = editProfilePopup.querySelector(`[name="edit-profile"]`);
const titleInput = editProfileForm.querySelector(`[name="name"]`);
const descriptionInput = editProfileForm.querySelector(`[name="description"]`);

const addNewCardPopup = document.querySelector('.popup_type_new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const addNewCardForm = addNewCardPopup.querySelector('.popup__form');
const placeNameInput = addNewCardForm.querySelector(`[name="place-name"]`);
const linkInput = addNewCardForm.querySelector(`[name="link"]`);

const fullModePopup = document.querySelector('.popup_type_image');
const fullModeImage = fullModePopup.querySelector('.popup__image');
const fullModeCaption = fullModePopup.querySelector('.popup__caption');

const renderCards = (cards) => {
  cards.forEach((card) => {
    cardsList.appendChild(createCard(card, deleteCard, openFullModePopup, addLike));
  });
};

const openEditProfilePopup = () => {
  openPopup(editProfilePopup);

  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
};

const handleEditFormFormSubmit = (e) => {
  e.preventDefault();

  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(editProfilePopup);
};

const openAddNewCardPopup = () => {
  placeNameInput.value = '';
  linkInput.value = '';

  openPopup(addNewCardPopup);
};

const handleAddNewCardFormSubmit = (e) => {
  e.preventDefault();

  const name = placeNameInput.value;
  const link = linkInput.value;

  const newCard = createCard({ name, link }, deleteCard, openFullModePopup, addLike);
  cardsList.prepend(newCard);

  placeNameInput.value = '';
  linkInput.value = '';

  closePopup(addNewCardPopup);
};

const openFullModePopup = ({ name, link }) => {
  fullModeImage.src = link;
  fullModeCaption.textContent = name;

  openPopup(fullModePopup);
};


renderCards(initialCards);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup')) {
          closePopup(popup);
      }
  });
}); 

popups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close')
    closeButton.addEventListener('click', () => {
       closePopup(popup);
    });
});

editProfileButton.addEventListener('click', openEditProfilePopup);
editProfileForm.addEventListener('submit', handleEditFormFormSubmit); 
addNewCardButton.addEventListener('click', openAddNewCardPopup);
addNewCardForm.addEventListener('submit', handleAddNewCardFormSubmit);


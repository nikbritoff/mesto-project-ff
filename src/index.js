import './index.css';

import { createCard, deleteCard, toggleLike } from './scripts/card.js';
import { openPopup,closePopup } from './scripts/popup.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { apiService } from './scripts/api.js';

const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button--disabled',
  inputErrorClass: 'popup__input--error',
  errorClass: 'popup__input_error--active'
};

const cardsList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = editProfilePopup.querySelector(`[name="edit-profile"]`);
const titleInput = editProfileForm.querySelector(`[name="name"]`);
const descriptionInput = editProfileForm.querySelector(`[name="description"]`);
const editProfileSubmitButton = editProfileForm.querySelector('.popup__button');

const addNewCardPopup = document.querySelector('.popup_type_new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const addNewCardForm = addNewCardPopup.querySelector('.popup__form');
const placeNameInput = addNewCardForm.querySelector(`[name="place-name"]`);
const linkInput = addNewCardForm.querySelector(`[name="link"]`);
const addNewCardSubmitButton = addNewCardForm.querySelector('.popup__button');

const fullModePopup = document.querySelector('.popup_type_image');
const fullModeImage = fullModePopup.querySelector('.popup__image');
const fullModeCaption = fullModePopup.querySelector('.popup__caption');

const updateAvatarPopup = document.querySelector('.popup_type_avatar');
const updateAvatarForm = updateAvatarPopup.querySelector('.popup__form');
const updateAvatarInput = updateAvatarForm.querySelector(`[name="avatar"]`);
const updateAvatarSubmitButton = updateAvatarForm.querySelector('.popup__button');
const profileImageContainer = document.querySelector('.profile__image-container');
const profileImage = profileImageContainer.querySelector('.profile__image');

const setButtonLoadingState = (buttonElement) => {
  buttonElement.textContent = 'Сохранение...';
  buttonElement.disabled = true;
}

const removeButtonLoadingState = (buttonElement) => {
  buttonElement.textContent = 'Сохранить';
  buttonElement.disabled = false;
}

const renderCards = (cards, profileId) => {
  cards.forEach((card) => {
    cardsList.appendChild(createCard(card, deleteCard, openFullModePopup, toggleLike, profileId));
  });
};

const renderProfile = (user) => {
  const { name, about, avatar } = user;
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileImage.src = avatar;
}

const openEditProfilePopup = () => {
  openPopup(editProfilePopup);
  clearValidation( editProfileForm, VALIDATION_CONFIG);

  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
};

const handleEditFormFormSubmit = async (e) => {
  e.preventDefault();

  setButtonLoadingState(editProfileSubmitButton);
  const updatedProfile = await apiService.editProfile({
    name: titleInput.value,
    about: descriptionInput.value,
  });

  if (updatedProfile) {
    profileTitle.textContent = updatedProfile.name;
    profileDescription.textContent = updatedProfile.about;
    closePopup(editProfilePopup);
  }

  removeButtonLoadingState(editProfileSubmitButton);
};

const openAddNewCardPopup = () => {
  placeNameInput.value = '';
  linkInput.value = '';

  openPopup(addNewCardPopup);
  clearValidation( addNewCardForm, VALIDATION_CONFIG);
};

const handleAddNewCardFormSubmit = async (e) => {
  e.preventDefault();

  const name = placeNameInput.value;
  const link = linkInput.value;

  setButtonLoadingState(addNewCardSubmitButton);
  const newCardData = await apiService.addNewCard({ name, link });

  if (newCardData) {
    const newCard = createCard(newCardData, deleteCard, openFullModePopup, toggleLike);
    cardsList.prepend(newCard);
  
    placeNameInput.value = '';
    linkInput.value = '';
  
    closePopup(addNewCardPopup);
  }

  removeButtonLoadingState(addNewCardSubmitButton);
};

const openFullModePopup = ({ name, link }) => {
  fullModeImage.src = link;
  fullModeCaption.textContent = name;

  openPopup(fullModePopup);
};

const openUpdateAvatarPopup = () => {
  updateAvatarInput.value = "";

  openPopup(updateAvatarPopup);
  clearValidation(updateAvatarPopup, VALIDATION_CONFIG);
};

const handleUpdateAvatarFormSubmit = async (e) => {
  e.preventDefault();

  const avatar = updateAvatarInput.value;

  setButtonLoadingState(updateAvatarSubmitButton);
  const profile = await apiService.updateAvatar(avatar);

  if (profile) {
    profileImage.src = avatar;
    closePopup(updateAvatarPopup);
  }

  removeButtonLoadingState(updateAvatarSubmitButton);
}

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
profileImageContainer.addEventListener('click', openUpdateAvatarPopup);
updateAvatarForm.addEventListener('submit', handleUpdateAvatarFormSubmit);

enableValidation(VALIDATION_CONFIG);


Promise.all([apiService.getUser(), apiService.getCards()]).then(([user, cards]) => {
  renderCards(cards, user._id);
  renderProfile(user);
});

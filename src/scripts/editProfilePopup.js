import { openPopup, closePopup } from "./popup";

const editProfilePopup = document.querySelector('.popup_type_edit');
const closeButton = editProfilePopup.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const form = editProfilePopup.querySelector(`[name="edit-profile"]`);
const titleInput = form.querySelector(`[name="name"]`);
const descriptionInput = form.querySelector(`[name="description"]`);

const handleFormSubmit = (e) => {
  e.preventDefault();

  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeEditPopup();
}

const handleEditProfilePopupEscKeyDown = (e) => {
  if (e.code === 'Escape') {
    closeEditPopup();
  }
};

const handleOverlayClick = (e) => {
  if (e.target.matches('.popup_type_edit')) {
    closeEditPopup();
  }
}

const openEditPopup = () => {
  openPopup(editProfilePopup);

  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  window.addEventListener('keydown', handleEditProfilePopupEscKeyDown);  
  closeButton.addEventListener('click', closeEditPopup);
  editProfilePopup.addEventListener('click', handleOverlayClick);
  form.addEventListener('submit', handleFormSubmit); 
}

const closeEditPopup = () => {  
  window.removeEventListener('keydown', handleEditProfilePopupEscKeyDown);
  closeButton.removeEventListener('click', closeEditPopup);
  editProfilePopup.removeEventListener('click', handleOverlayClick);
  form.removeEventListener('submit', handleFormSubmit); 

  closePopup(editProfilePopup);
}

// init

const initPopup = () => {
  const editProfileButton = document.querySelector('.profile__edit-button');
  editProfileButton.addEventListener('click', openEditPopup);
}

export { initPopup };
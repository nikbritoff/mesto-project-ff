const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.classList.remove('popup_is-animated');
  document.addEventListener('keydown', handleEscKeyDown);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.removeEventListener('keydown', handleEscKeyDown);
}

const handleEscKeyDown = (e) => {
  if (e.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup };
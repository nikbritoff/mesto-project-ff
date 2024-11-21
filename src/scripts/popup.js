const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.classList.remove('popup_is-animated');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
}

export { openPopup, closePopup };
import './index.css';
import { initialCards } from "./cards.js";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (cardContent, onDeleteClick) => {
  const { name, link } = cardContent;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const image = card.querySelector('.card__image');
  const title = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');

  image.src = link;
  image.alt = link;
  title.textContent = name;

  deleteButton.addEventListener('click', onDeleteClick);

  return card;
}

// @todo: Функция удаления карточки

const deleteCard = ({ target }) => {
  target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу

const renderCards = (cards) => {
  cards.forEach((card) => {
    cardsList.appendChild(createCard(card, deleteCard));
  });
}

renderCards(initialCards);

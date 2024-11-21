import './index.css';

import { initialCards } from './scripts/constants.js';
import { renderCards, initAddCardPopup } from './scripts/cards.js';
import { initPopup } from './scripts/editProfilePopup.js';

renderCards(initialCards);
initPopup();
initAddCardPopup();

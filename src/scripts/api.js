const BASE_URL = 'https://mesto.nomoreparties.co/v1';
const ID = 'cohort-mag-4';
const AUTH_TOKEN = '0e5cb93e-01e9-44b7-9c6b-a5311a25f48d';

class Api {
  constructor({ baseUrl, id, authToken }) {
    this._baseUrl  = `${baseUrl}/${id}`;
    this._headers = {
      authorization: authToken,
      'Content-Type': 'application/json'
    };
  }

  async _checkResponse (response) {
    if (!response.ok) {
      const error = await response.json()
      return Promise.reject(`Ошибка ${response.status} - ${error.message}`);
    }

    return response.json()
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl }/${endpoint}`, options).then(this._checkResponse);
  }


  async get(endpoint) {
    const response = await this._request(endpoint, {
      headers: this._headers,
    });

    return response;
  }

  async patch(endpoint, data) {
    const response = await this._request(endpoint, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    });

    return response;
  }

  async post(endpoint, data) {
    const response = await this._request(endpoint, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    });

    return response;
  }

  async put(endpoint) {
    const response = await this._request(endpoint, {
      method: 'PUT',
      headers: this._headers,
    });

    return response;
  }

  async delete(endpoint) {
    const response = await this._request(endpoint, {
      method: 'DELETE',
      headers: this._headers,
    });

    return response;
  }
}

const apiInstance = new Api({ baseUrl: BASE_URL, id: ID, authToken: AUTH_TOKEN });


class ApiService {
  getUser() {
    return apiInstance.get('users/me');
  }

  editProfile(data) {
    return apiInstance.patch('users/me', data);
  }

  getCards() {
    return apiInstance.get('cards');
  }

  addNewCard(data) {
    return apiInstance.post('cards', data);
  }

  deleteCard(cardId) {
    return apiInstance.delete(`cards/${cardId}`);
  }

  addLike(cardId) {
    return apiInstance.put(`cards/likes/${cardId}`);
  }

  deleteLike(cardId) {
    return apiInstance.delete(`cards/likes/${cardId}`);
  }

  updateAvatar(avatar) {
    return apiInstance.patch('users/me/avatar', { avatar });
  }
}

export const apiService = new ApiService();

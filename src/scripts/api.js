const BASE_URL = 'https://mesto.nomoreparties.co/v1';
const ID = 'cohort-mag-4';
const AUTH_TOKEN = '0e5cb93e-01e9-44b7-9c6b-a5311a25f48d';

class Api {
  constructor({ baseUrl, id, authToken }) {
    this.url = `${baseUrl}/${id}`;
    this.authToken = authToken;
  }

  async checkResponse (response) {
    if (!response.ok) {
      const error = await response.json()
      return Promise.reject(`Ошибка ${response.status} - ${error.message}`);
    }

    return response.json()
  }

  async get(url) {
    const response = await fetch(`${this.url}/${url}`, {
      headers: {
        authorization: this.authToken,
      }
    }).then(this.checkResponse);

    return response;
  }

  async patch(url, data) {
    const response = await fetch(`${this.url}/${url}`, {
      method: 'PATCH',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(this.checkResponse);

    return response;
  }

  async post(url, data) {
    const response = await fetch(`${this.url}/${url}`, {
      method: 'POST',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(this.checkResponse);

    return response;
  }

  async put(url) {
    const response = await fetch(`${this.url}/${url}`, {
      method: 'PUT',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json'
      },
    }).then(this.checkResponse);

    return response;
  }

  async delete(url) {
    const response = await fetch(`${this.url}/${url}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json'
      },
    }).then(this.checkResponse);

    return response;
  }
}

const apiInstance = new Api({ baseUrl: BASE_URL, id: ID, authToken: AUTH_TOKEN });


class ApiService {
  async getUser() {
    return apiInstance.get('users/me');
  }

  async editProfile(data) {
    return apiInstance.patch('users/me', data);
  }

  getCards() {
    return apiInstance.get('cards');
  }

  async addNewCard(data) {
    return apiInstance.post('cards', data);
  }

  async deleteCard(cardId) {
    return apiInstance.delete(`cards/${cardId}`);
  }

  async addLike(cardId) {
    return apiInstance.put(`cards/likes/${cardId}`);
  }

  async deleteLike(cardId) {
    return apiInstance.delete(`cards/likes/${cardId}`);
  }

  async updateAvatar(avatar) {
    return apiInstance.patch('users/me/avatar', { avatar });
  }
}

export const apiService = new ApiService();

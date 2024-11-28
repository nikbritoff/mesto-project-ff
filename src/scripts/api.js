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

    return Promise.resolve(response);
  }

  async get(url) {
    const response = await fetch(`${this.url}/${url}`, {
      headers: {
        authorization: this.authToken,
      }
    }).then(this.checkResponse).then((res) => res.json());

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
    }).then(this.checkResponse).then((res) => res.json());

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
    }).then(this.checkResponse).then((res) => res.json());

    return response;
  }

  async put(url) {
    const response = await fetch(`${this.url}/${url}`, {
      method: 'PUT',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json'
      },
    }).then(this.checkResponse).then((res) => res.json());

    return response;
  }

  async delete(url) {
    const response = await fetch(`${this.url}/${url}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json'
      },
    }).then(this.checkResponse).then((res) => res.json());

    return response;
  }
}

const apiInstance = new Api({ baseUrl: BASE_URL, id: ID, authToken: AUTH_TOKEN });


class ApiService {
  async getUser() {
    try {
      return await apiInstance.get('users/me');
    } catch (error) {
      console.log(`Ошибка получения данных о пользователе: ${error}`);
    }
  }

  async editProfile(data) {
    try {
      return await apiInstance.patch('users/me', data);
    } catch (error) {
      console.log(`Ошибка обновления данных о пользователе: ${error}`);
    }
  }

  async getCards() {
    try {
      return await apiInstance.get('cards');
    } catch (error) {
      console.log(`Ошибка получения данных о карточках: ${error}`);
    }
  }

  async addNewCard(data) {
    try {
      return await apiInstance.post('cards', data);
    } catch (error) {
      console.log(`Ошибка добавления новой карточки: ${error}`);
    }
  }

  async deleteCard(cardId) {
    try {
      return await apiInstance.delete(`cards/${cardId}`);
    } catch (error) {
      console.log(`Ошибка удаления карточки: ${error}`);
    }
  }

  async addLike(cardId) {
    try {
      return await apiInstance.put(`cards/likes/${cardId}`);
    } catch (error) {
      console.log(`Ошибка добавления лайка: ${error}`);
    }  
  }

  async deleteLike(cardId) {
    try {
      return await apiInstance.delete(`cards/likes/${cardId}`);
    } catch (error) {
      console.log(`Ошибка удаления лайка: ${error}`);
    }  
  }

  async updateAvatar(avatar) {
    try {
      return await apiInstance.patch('users/me/avatar', { avatar });
    } catch (error) {
      console.log(`Ошибка обновления аватара: ${error}`);
    }
  }
}

export const apiService = new ApiService();

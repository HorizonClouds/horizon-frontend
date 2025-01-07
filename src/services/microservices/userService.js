import backendApiClient from '../utils/apiClient.js';


export let idUser = null;

const userService = {
  login: async (credentials) => {
    try {
      const response = await backendApiClient.post('users/api/v1/users/login', {
        userName: credentials.username,
        password: credentials.password
      });

      if (response.data.data?.token) {
        localStorage.setItem('horizon-token', response.data.data.token);
        // Guardar el ID del usuario
        if (response.data.data.payload?.user?.id) {
          localStorage.setItem('user-id', response.data.data.payload.user.id);
          idUser = response.data.data.payload.user.id;
        }
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await backendApiClient.post('users/api/v1/users/register', {
        userName: userData.username,
        password: userData.password,
        name: userData.name,
        email: userData.email
      });
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  getUserProfile: async (userId) => {
    try {
      const response = await backendApiClient.get(`users/api/v1/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  getIdUser: () => {
    console.log('idUserLogin', loggedUser);
    return idUser;
  },

  logout: () => {
    localStorage.removeItem('horizon-token');
    localStorage.removeItem('user-id');
  }
};

export default userService;


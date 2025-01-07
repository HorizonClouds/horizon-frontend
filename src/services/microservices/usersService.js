import backendApiClient from '../utils/apiClient.js';

export let loggedUser = null;

const getLoggedUser = () => {
  console.log('getLoggedUser', loggedUser);
  return loggedUser;
}

export const postLogin = async (formData) => {
  const userId = formData.userId;
  console.log('postLogin; Data', formData);
  const response = await backendApiClient.post('/users/api/v1/login', formData);
  const data = response.data.data;
  console.log('postLogin: responsse', data.otherUsers);
  //TODO update to data.user when login is fixed
  loggedUser = data.otherUsers.filter(user => user.id === userId)[0];
  console.log('postLogin: loggedUser', loggedUser);
  // Store token in local storage
  if (data.token) {
    localStorage.setItem('horizon-token', data.token);
  }
  return response.data;
}

export default { getLoggedUser, postLogin };


import { saveToken, getToken, removeToken, decodeToken } from './auth';

const BASE_URL = '/api/users/';

async function signup(user) {
  const res = await fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  if (res.ok) return res.json();
  throw new Error('Email already taken!');
}

async function login(credentials) {
  const res = await fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (res.ok) {
    const data = await res.json();
    saveToken(data.token);
    return decodeToken(data.token);
  }
  throw new Error('Bad Credentials');
}

function getUser() {
  const token = getToken();
  return token ? decodeToken(token) : null;
}

function logout() {
  removeToken();
}

const userService = {
  signup,
  login,
  getUser,
  logout
};

export default userService;

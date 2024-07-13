export function saveToken(token) {
    localStorage.setItem('token', token);
  }
  
  export function getToken() {
    return localStorage.getItem('token');
  }
  
  export function removeToken() {
    localStorage.removeItem('token');
  }
  
  export function decodeToken(token) {
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
  
  export function getUserIdFromToken() {
    const token = getToken();
    const decoded = decodeToken(token);
    return decoded ? decoded.userId : null;
  }
  
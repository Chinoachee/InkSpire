import jwtDecode from 'jwt-decode';

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded; 
    } catch (e) {
      console.error('Invalid token:', e);
      localStorage.removeItem('token');
    }
  }
  return null;
};


export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};

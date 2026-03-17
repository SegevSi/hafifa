import { ACCESS_TOKEN_KEY } from "../conf";

const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.location.href = '/login';
}; 

export {logout};
import { ACCESS_TOKEN_KEY, Routes } from "../conf";

const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.location.href = Routes.LOGIN;
}; 

export {logout};
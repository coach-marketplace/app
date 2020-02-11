export const addTokenToLocalStorage = (token, expireIn) => {
  if (!localStorage) return;
  localStorage.setItem("token", token);
  if (!expireIn) return;
  const expirationDate = new Date(new Date().getTime() + expireIn * 1000);
  localStorage.setItem("token_expiration", expirationDate);
};

export const removeTokenFromLocalStorage = () => {
  if (!localStorage) return;
  localStorage.removeItem("token");
  localStorage.removeItem("token_expiration");
};

export const getTokenFromLocalStorage = () => {
  if (!localStorage) return;
  return localStorage.getItem("token");
};

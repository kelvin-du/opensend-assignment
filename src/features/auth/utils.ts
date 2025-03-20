const STORAGE_KEY = Object.freeze({
  ACCESS_TOKEN: "access-token",
  CLIENT_TOKEN: "client-token",
});

export const getAccessToken = () => {
  return localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
};

export const getClientToken = () => {
  return localStorage.getItem(STORAGE_KEY.CLIENT_TOKEN);
};

export const setTokens = (accessToken: string, clientToken?: string) => {
  localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
  if (clientToken) {
    localStorage.setItem(STORAGE_KEY.CLIENT_TOKEN, clientToken);
  }
};
export const checkTokensAvailability = () => {
  return !!getAccessToken() && !!getClientToken();
};

export const clearAllTokens = () => {
  localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEY.CLIENT_TOKEN);
};

export const forceLogout = () => {
  localStorage.clear();
};

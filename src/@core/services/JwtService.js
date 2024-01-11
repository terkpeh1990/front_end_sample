import jwt_decode from "jwt-decode";

const ID_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";

/**
 * @description get token form localStorage
 */
export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * @description get user form localStorage
 */
export const getUser = () => {
  const userToken = getToken();

  return userToken ? jwt_decode(userToken) : {};
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token, refresh) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
};

/**
 * @description save user into localStorage
 * @param userInfo: unknown
 */
export const saveUser = userInfo => {
  window.localStorage.setItem("user", JSON.stringify(userInfo));
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

/**
 * @description remove user form localStorage
 */
export const destroyUser = () => {
  window.localStorage.removeItem("user");
};

export default { getToken, saveToken, destroyToken, saveUser, getUser, destroyUser, getRefreshToken };

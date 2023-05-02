import { TOKEN } from "../utils/constants";
//Guardar el token que se captura al inicar session
//y guardarlo en el localstorage
//Asi mismo usar una constante para el nombre de TOKEN
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function removeToken() {
  localStorage.removeItem(TOKEN);
}

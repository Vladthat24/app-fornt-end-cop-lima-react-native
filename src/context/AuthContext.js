import React, { useState, createContext, useEffect } from "react";
import { getToken, removeToken, setToken } from "../api/token";
import { useUser } from "../hooks";

//estado de mi session
export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const { getMe } = useUser();

  useEffect(() => {
    //funcion anonima autoejecutable
    (async () => {
      //traer el token de la inision iniciada
      const token = getToken();
      //validamos si el token existe
      //entonces brindamos las credenciales que ya estamos
      //logeados
      //y si no, que borre el setAuth
      if (token) {
        const me = await getMe(token);
        setAuth({ token, me });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  //Funcion que va recibir peticiones http
  //asi mismo, recibir el token que llegar
  const login = async (token) => {
    //guardamos el token en el localStrorage
    setToken(token);
    const me = await getMe(token);

    //añadir los datos del inicio de session a "auth" con hooks
    setAuth({ token, me });
    console.log("Inyectamos datos:", me);
  };

  const logout = () => {
    //si auth tiene contenido
    if (auth) {
      removeToken();
      setAuth(null);
    }
  };

  const valueContext = {
    auth,
    login,
    logout,
  };
  //validamos si el auth existe
  if (auth === undefined) return null;

  //retornamos el contexto con la pagina hijo
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}

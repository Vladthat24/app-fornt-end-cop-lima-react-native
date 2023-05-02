import { useContext } from "react";
import { AuthContext } from "../context";

//Este hooks maneja los contextos
export const useAuth = () => useContext(AuthContext);

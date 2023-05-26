import { useState } from "react";
import { size } from "lodash";
import { getEstudiosByCopApi,getTipoEstudiosApi } from "../api/estudios";
import { useAuth } from "./";

export function useEstudios() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estudios, setEstudios] = useState(null);
  const [tipoEstudios,setTiposEstudios]=useState(null);

  const { auth } = useAuth();

  const getEstudiosByCop = async (ncop,ntipoestudio) => {
    try {
      setLoading(true);
      const response = await getEstudiosByCopApi(ncop,ntipoestudio);
      console.log("Response",response);
      setLoading(false);
      setEstudios(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getTipoEstudios = async () => {
    try {
      setLoading(true);
      const response = await getTipoEstudiosApi();
      setLoading(false);
      setTiposEstudios(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    estudios,
    getEstudiosByCop,
    tipoEstudios,
    getTipoEstudios,
  };
}

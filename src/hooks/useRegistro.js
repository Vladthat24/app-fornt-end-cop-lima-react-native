import { useState } from "react";
import { size } from "lodash";
import {
  getRegistroApi,
  getColegiadoByCopApi,
  updateImgQRApi,
  getTotalRegistrosApi,
  getRegistroSearchPaginationApi
} from "../api/registro";
import { useAuth } from "./";

export function useRegistro() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registros, setRegistros] = useState(null);
  const [colegiado, setColegiado] = useState(null);

  const { auth } = useAuth();

  const getRegistros = async (page, perPage) => {
    try {
      setLoading(true);
      const response = await getRegistroApi(auth.token, page, perPage);
      setLoading(false);
      setRegistros(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getRegistroSearchPagination = async (page, perPage, searchTerm) => {
    try {
      setLoading(true);
      const response = await getRegistroSearchPaginationApi(
        page,
        perPage,
        searchTerm
      );
      setLoading(false);
      setRegistros(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getTotalRegistros = async () => {
    try {
      setLoading(true);
      const response = await getTotalRegistrosApi();
      setLoading(false);
      setRegistros(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getColegiadoByCop = async (ncop) => {
    try {
      setLoading(true);
      const response = await getColegiadoByCopApi(ncop);
      setLoading(false);
      setColegiado(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateImgQR = async (id, imgenQR) => {
    try {
      setLoading(true);
      await updateImgQRApi(id, imgenQR, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    registros,
    getRegistros,
    colegiado,
    getColegiadoByCop,
    updateImgQR,
    getTotalRegistros,
    getRegistroSearchPagination,
  };
}

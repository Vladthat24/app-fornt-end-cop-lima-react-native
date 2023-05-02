import { useState } from "react";
import {
  getCategoriApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../api/category";
import { useAuth } from ".";

export function useCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(null);

  //instanciamos el objetvo auth
  const { auth } = useAuth();

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriApi();
      setLoading(false);
      setCategories(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addCategory = async (data) => {
    try {
      setLoading(true);
      await addCategoryApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateCategory = async (id, data) => {
    try {
      setLoading(true);
      await updateCategoryApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      await deleteCategoryApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    categories,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}

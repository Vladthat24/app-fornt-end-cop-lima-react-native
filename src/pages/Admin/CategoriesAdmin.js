import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  TableCategoryAdmin,
  AddEditCategoryForm,
} from "../../components/Admin";
import { useCategory } from "../../hooks";
import { ModalBasic } from "../../components/Common";

export function CategoriesAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, categories, getCategories, deleteCategory } = useCategory();

  useEffect(() => getCategories(), [refetch]); //con la funcion refetch actualizamos las categorias

  //funcion de abrir y cerrar el modal
  const openCloseModal = () => setShowModal((prev) => !prev);

  //funcion para actualizar la tabla
  const onRefetch = () => setRefetch((prev) => !prev);

  //Agregar nuevas categorias
  const addCategory = () => {
    setTitleModal("Nueva Categoria");

    //1.- Agregamos onClose para cerrar el modal una vez se agrege el Item
    //2.- Agregamos Refetch para actualizar la tabla una vez agregen el Item
    setContentModal(
      //Agregamos el componente formulario
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
    );

    openCloseModal();
  };

  //Esta funcion se debe llamar de la tabla - boton edit
  const updateCategory = (data) => {
    setTitleModal("Actualizar Categoria");
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    );
    openCloseModal();
  };

  const onDeleteCategory = async (data) => {
    const result = window.confirm(`¿Eliminar categoria ${data.title}?`);
    if (result) {
      await deleteCategory(data.id);
      onRefetch();
    }
  };

  return (
    <>
      <HeaderPage
        title="Categorias"
        btnTitle="Nueva Categoria"
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando
        </Loader>
      ) : (
        <TableCategoryAdmin
          categories={categories}
          updateCategory={updateCategory} /* funcion para editar */
          deleteCategory={onDeleteCategory}
        />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}

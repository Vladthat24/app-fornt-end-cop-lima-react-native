import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditProductForm,
  HeaderPage,
  TableProductAdmin,
} from "../../components/Admin";
import { useProduct } from "../../hooks";
import { ModalBasic } from "../../components/Common";

export function ProductAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false); //hooks para refrescar la tabla
  const { loading, products, getProducts, deleteProduct } = useProduct();

  useEffect(() => getProducts(), [refetch]);

  //funcion para abrir el modal y cerrar
  const openCloseModal = () => setShowModal((prev) => !prev);

  //funcion para refrescar la tabla una vez agregado el producto
  const onRefetch = () => setRefetch((prev) => !prev);

  //funcion que llama al modal para agregar producto
  const addProduct = () => {
    setTitleModal("Nuevo Producto");
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  //function que llama al modal para actualizar el producto
  const updateProduct = (data) => {
    setTitleModal("Actualizar Producto");
    setContentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={data}
      />
    );
    openCloseModal();
  };

  //funcion para eleiminar producto
  const onDeleteProduct = async (data) => {
    const result = window.confirm(`¿Eliminar producto ${data.title}?`);
    if (result) {
      await deleteProduct(data.id);
      onRefetch();
    }
  };

  return (
    <>
      <HeaderPage
        title="Productos"
        btnTitle="Nuevo Producto"
        btnClick={addProduct}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando. . .
        </Loader>
      ) : (
        <TableProductAdmin
          products={products}
          updateProduct={updateProduct}
          deleteProduct={onDeleteProduct}
        />
      )}
      <ModalBasic
        show={showModal} //abrir el modal
        onClose={openCloseModal} //cerrar el modal
        title={titleModal} //colocar el titlo del modal
        children={contentModal} //agregar el componente de contenido
      />
    </>
  );
}

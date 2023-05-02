import React, { useEffect, useState } from "react";
import { HeaderPage, TableUsers, AddEditUsers } from "../../components/Admin";
import { Loader } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import { ModalBasic } from "../../components/Common";
import { useUser } from "../../hooks";

export function UsersAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, users, getUsers, deleteUser } = useUser();

  useEffect(() => {
    getUsers();
  }, [refetch]);

  //setear los prevState del boton y devolver lo contrario para abrir el modal
  const openCloseModal = () => setShowModal((prev) => !prev);

  //funcion que refresca el estado de refetch
  const onRefetch = () => setRefetch((prev) => !prev);

  const addUser = () => {
    setTitleModal("Nuevo Usuario");
    setContentModal(
      <AddEditUsers onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    console.log(data);
    setTitleModal("Actualizar usuario");
    setContentModal(
      <AddEditUsers
        onClose={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );
    openCloseModal();
  };

  const onDeleteUser = async (data) => {
    const result = window.confirm(
      `¿Estas Seguro de Eliminar el Usuario ${data.email}?`
    );
    if (result) {
      try {
        await deleteUser(data.id);
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />;
        onRefetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo usuario"
        btnClick={addUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
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

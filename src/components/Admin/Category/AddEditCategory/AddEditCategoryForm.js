import React, { useCallback, useState } from "react";
import {
  Form,
  Image,
  Button,
  CommentGroup,
  FormField,
} from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./AddEditCategoryForm.scss";
import { useCategory } from "../../../../hooks";

//para validar los datos del formulario
import { useFormik } from "formik";
import * as Yup from "yup";

export function AddEditCategoryForm(props) {
  //enviamos desde CategoriesAdmin de Page el props = "openCloseModal"

  //1.- instanciamos el props enviado del AddEditCategoryForm
  const { onClose, onRefetch, category } = props;

  //creamos el estado de la visualizacion de la imagen
  const [previewImage, setPreviewImage] = useState(category?.image || null); //validamos si la imagen existe o no

  //instacioamos useCategory Hooks
  const { addCategory, updateCategory } = useCategory();

  console.log(category);

  //funcion para validar formulario
  const formik = useFormik({
    initialValues: initialValues(category), //variables iniciadas, como los datos para editar
    validationSchema: Yup.object(category ? updateSchema() : newSchema()), //variables enviadas
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) await updateCategory(category.id, formValue);
        //funcion para actualizar, pasamos el id de la categoria
        else await addCategory(formValue);
        onRefetch(); //para refrescar la tabla antes que se cierre el modal
        onClose(); //para que se cierre el modal una vez agregado el item
      } catch (error) {
        console.error(error);
      }
    },
  });

  //aceptar el fichero
  const onDrop = useCallback(async (aceptedFile) => {
    const file = aceptedFile[0]; //seleccionamos una sola imagen
    await formik.setFieldValue("image", file); //validamos la imagen
    setPreviewImage(URL.createObjectURL(file)); //convertir a la url
  }, []);

  //configuracion drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop, //la funcion para aceptar la imagen
  });

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre de la Categoria"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />

      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={
          formik.errors.image && "red"
        } /* si formik es true por el error, entonces se pone de color rojo */
      >
        {previewImage ? "Cambiar imagen" : "Subir imagen"}
      </Button>
      <input {...getInputProps()} />
      {/*  mostrar la vista de la imagen segun el State previ */}
      <Image src={previewImage} fluid />
      <Button
        type="submit"
        primary
        fluid
        content={category ? "Actualizar" : "Crear"}
      />
    </Form>
  );
}

function initialValues(data) {
  //objeto
  return {
    title: data?.title || "", //validamos si la variables existe para editarlo
    image: "",
  };
}

function newSchema() {
  //objeto
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}

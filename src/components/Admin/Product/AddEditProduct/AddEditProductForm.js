import React, { useEffect, useState, useCallback } from "react";
import {
  Form,
  Dropdown,
  Checkbox,
  Button,
  Image,
  Input,
} from "semantic-ui-react";
//importar categoria hooks
import { useCategory, useProduct } from "../../../../hooks";

import { useDropzone } from "react-dropzone";
import { map, update } from "lodash";
import "./AddEditProductForm.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

export function AddEditProductForm(props) {
  const { onClose, onRefetch, product } = props; //props enviado desde el componente padre ProductAdmin
  const [categoriesFormat, setCategoriesFormat] = useState([]); //darle formato a la categoria
  const [previewImage, setPreviewImage] = useState(
    product ? product?.image : null //si exite el producto, muestrame la imagen, sino null
  ); //para visualizar previamente la imagen subida
  const { categories, getCategories } = useCategory();

  const { addProduct, updateProduct } = useProduct(); //obtener la funcion addproduct de hooks

  useEffect(() => getCategories(), []);

  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories)); //llamamos a la funcion formateadora
  }, [categories]); //cada vez que categories se actualice, arranca este effect

  //Para el envio de datos
  const formik = useFormik({
    initialValues: initialValues(product), //se envia producto para inicializar los valores al momento llamar al modal para actualizar
    validationSchema: Yup.object(product ? updateSchema() : newSchema()), //si existe product al momento de enviar el formulario del modal, actualizara, sino agregara un nuevo registro
    validateOnChange: false, //que no valide mientras estamos escribiendo - false
    onSubmit: async (formValue) => {
      if (product)
        await updateProduct(product.id, formValue); //si existe actualizar
      else await addProduct(formValue); //sino funcion add producto

      onRefetch(); //ejecutar antes de cerrar el componente
      onClose(); //recuperado del envio del componente ProductAdmin para cerrar el modal
    },
  });

  const onDrop = useCallback(async (accepteFile) => {
    const file = accepteFile[0];
    await formik.setFieldValue("image", file); //para validar la carga de la imagen
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg,image/png",
    noKeyboard: true,
    multiple: false,
    onDrop, //agregando el hooks para aceptar el file
  });

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del Producto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        type="number"
        name="price"
        placeholder="Precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />

      <Dropdown
        placeholder="Categoria"
        fluid
        selection
        search
        options={categoriesFormat}
        value={formik.values.category}
        error={formik.errors.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
      />

      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />
        Producto activo
      </div>

      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        {previewImage ? "Cambiar Imagen" : "Subir imagen"}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} />
      <Button
        type="submit"
        primary
        fluid
        content={product ? "Actualizar" : " Crear"}
      />
    </Form>
  );
}

//funcion para darle fomrato a categoria
function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues(data) {
  return {
    title: data?.title || "",
    price: data?.price || "",
    category: data?.category || "",
    active: data?.active ? true : false,
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string(),
  };
}

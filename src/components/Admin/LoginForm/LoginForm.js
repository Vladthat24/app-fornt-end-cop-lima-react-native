import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useAuth } from "../../../hooks";
import "./LoginForm.scss";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { loginApi } from "../../../api/user";

export function LoginForm() {
  //instanciar la funcion Login de hooks
  const { login } = useAuth();
  console.log("LoginForms login: ",login);
  //hooks para que no se envia nada
  //sin agregar algun dato
  const formik = useFormik({
    initialValues: initialValues(),

    validationSchema: Yup.object(validationSchema()),

 
    onSubmit: async (formValue) => {
      try {

        const response = await loginApi(formValue);

        const { access } = response;
        login(access);
      } catch (error) {
        console.log("ERROR");
        toast.error(error.message);
      }
    },
  });

  return (
    <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo Electronico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Button type="submit" content="Iniciar sesión" primary fluid />
    </Form>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email("Colocar un correo con el formato @")
      .required(true),
    password: Yup.string().required(true),
  };
}

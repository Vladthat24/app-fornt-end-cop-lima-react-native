import React from "react";
import { Form, Button, Checkbox,Grid,Image } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

export function AddRegistroListAdmin(props) {
  const { onClose, onRefetch } = props;

  return (
    <Grid columns={2} divided>
      <Grid.Row>
      <Grid.Column>
      <Form className="add-edit-user-form">
          <Form.Input name="username" placeholder="Nombre de usuario" />
          <Form.Input name="email" placeholder="Correo electronico" />
          <Form.Input name="first_name" placeholder="Nombre" />
          <Form.Input name="last_name" placeholder="Apellidos" />
          <Form.Input
            name="password"
            type="password"
            placeholder="Contraseña"
          />

          <div className="add-edit-user-form__active">
            <Checkbox toggle />
            Usuario activo
          </div>

          <div className="add-edit-user-form__staff">
            <Checkbox toggle />
            Usuario administrador
          </div>

          <Button type="submit" primary fluid />
        </Form>
      </Grid.Column>
      <Grid.Column>
      <Form className="add-edit-user-form">
          <Form.Input name="username" placeholder="Nombre de usuario" />
          <Form.Input name="email" placeholder="Correo electronico" />
          <Form.Input name="first_name" placeholder="Nombre" />
          <Form.Input name="last_name" placeholder="Apellidos" />
          <Form.Input
            name="password"
            type="password"
            placeholder="Contraseña"
          />

          <div className="add-edit-user-form__active">
            <Checkbox toggle />
            Usuario activo
          </div>

          <div className="add-edit-user-form__staff">
            <Checkbox toggle />
            Usuario administrador
          </div>

          <Button type="submit" primary fluid />
        </Form>
      </Grid.Column>
      </Grid.Row>

    </Grid>
  );
}

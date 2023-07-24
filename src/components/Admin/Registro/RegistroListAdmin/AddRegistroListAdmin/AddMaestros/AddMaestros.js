import React from "react";
import {
  Form,
  Button,
  Checkbox,
  Grid,
  Image,
  Tab,
  Table,
  Label,
  Segment,
} from "semantic-ui-react";

export function AddMaestros(props) {
  const { onClose, onRefresh } = props;

  return (
    <Form className="add-edit-user-form">
      <Form.Input name="username" placeholder="Nombres" />
      <Form.Input name="ap_paterno" placeholder="Apellido Paterno" />
      <Form.Input name="ap_materno" placeholder="Appellido Materno" />
      <div className="add-edit-user-form__active">
        <Checkbox toggle />
        Habilitado
      </div>
      <Form.Input name="post_grado" placeholder="Post Grado" />
      <Image
        src="https://react.semantic-ui.com/images/wireframe/image.png"
        size="medium"
        disabled
        centered
      />
      <Button type="button" fluid color="yellow">
        Subir imagen
      </Button>
    </Form>
  );
}

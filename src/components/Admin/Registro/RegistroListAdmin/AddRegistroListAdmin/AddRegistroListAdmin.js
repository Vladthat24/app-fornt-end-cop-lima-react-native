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
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export function AddRegistroListAdmin() {
  const [refetch, setRefetch] = useState(false);
  const [showModalAddMaestro, setShowModalAddMaestro] = useState(false);
  const [contentModalAddMaestro, setContentModalAddMaestro] = useState(false);

  const openCloseModalAddRegistro = () =>
    setShowModalAddMaestro((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addMaestros = () => {
    console.log("Agregar Maestros");
  };
  const panes = [
    {
      menuItem: "Especialidad",
      render: () => (
        <Tab.Pane>
          {" "}
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Codigo de Estudio</Table.HeaderCell>
                <Table.HeaderCell>Nombre de Estudio</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Label style={{ textAlign: "center" }}> 001</Label>
                </Table.Cell>
                <Table.Cell>Asignacion de Cosas X</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Tab.Pane>
      ),
    },
    { menuItem: "Maestria", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: "Doctorado", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ];

  const Maestros = [
    {
      menuItem: "Estudio",
      render: () => (
        <Tab.Pane>
          {" "}
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>Nombre de Estudio</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Label style={{ textAlign: "center" }}> 001</Label>
                </Table.Cell>
                <Table.Cell>Especialidad</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Label style={{ textAlign: "center" }}> 002</Label>
                </Table.Cell>
                <Table.Cell>Maestria</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Label style={{ textAlign: "center" }}> 003</Label>
                </Table.Cell>
                <Table.Cell>Doctorado</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Regimen Laboral",
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
    {
      menuItem: "Resolucion",
      render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
    },
  ];
  const TabExampleBasic = () => <Tab panes={panes} />;
  return (
    <Grid columns={2} divided>
      <Button type="submit" primary fluid size="big">
        Guardar
      </Button>
      <Grid.Row stretched>
        <Grid.Column>
          <Segment>
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
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Button
              type="button"
              color="teal"
              icon="add"
              style={{ marginBottom: "10px" }}
            />

            <Label as="a" color="teal" tag floating>
              Grados Academicos
            </Label>
            <Tab panes={panes} />
          </Segment>
          <Segment>
            <Button
              type="button"
              color="olive"
              icon="add"
              style={{ marginBottom: "10px" }}
              onClick={addMaestros}
            />
            <Label as="a" color="teal" tag floating>
              Maestros [Tipos]
            </Label>
            <Tab panes={Maestros} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

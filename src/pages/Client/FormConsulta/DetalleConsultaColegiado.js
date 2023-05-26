import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import EspecialidadColegiado from "./EspecialidadColegiado";

function DetalleConsultaColegiado(props) {
  const [open, setOpen] = React.useState(false);
  const { fotoCop, datosColegiado } = props;
  console.log(datosColegiado);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          fluid
          icon="eye"
          style={{ marginTop: "20px" }}
          basic
          color="red"
        ></Button>
      }
    >
      <Modal.Header>Grados Academicos</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={fotoCop} wrapped />
        <Modal.Description>
          <Header>
            <p style={{ fontSize: "30px" }}>{datosColegiado.nombre}</p>
          </Header>
          <Header>
            <p style={{ fontSize: "20px" }}>
              {datosColegiado.apellido_paterno +
                " " +
                datosColegiado.apellido_materno}
            </p>
          </Header>
          <div class="extra content" style={{ marginTop: "20px",marginBottom:"20px" }}>
            <span >
              N° Colegiatura: <p class="ui red circular label">{datosColegiado.cop}</p>
            </span>
            <a class="ui red tag label floated" style={{ float: "right" }}>
              {datosColegiado.colegio_regional}
            </a>
          </div>
          <EspecialidadColegiado ncop={datosColegiado.cop}/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Cerrar"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default DetalleConsultaColegiado;

import React, { useEffect } from "react";
import { useRegistro } from "../../../hooks";
import { Grid, Image, Segment, Form, Card, Label } from "semantic-ui-react";
import Especilidad from "../Especialidad/Especialidad";
import fotoCop from "../../../img/doctorsilueta.jpg";

const BusquedaColegiado = (props) => {
  const { getColegiadoByCop, colegiado } = useRegistro();
  const { ncop } = props;

  useEffect(() => {
    getColegiadoByCop(ncop);
  }, []);
  if (colegiado === null) {
    return null;
  }

  return (
    <>
      {colegiado.results.map((resultado, index) => (
        <Segment
          style={{ padding: "3em 0em", margin: "-10% 10% 0% 10%",position:"relative", backgroundColor: 'white',}}
          vertical
          key={index}
          raised
          textAlign="center"
        >
          <Grid container stackable verticalAlign="middle">
            <Label
              as="a"
              color="orange"
              ribbon="right"
              style={{ fontSize: "2.0em" }}
            >
              Datos del Colegiado
            </Label>
            <Grid.Row>
              <Grid.Column floated="right" width={7}>
                <Image bordered rounded size="large" src={fotoCop} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Grid.Row>
                  <Card.Header>
                    <Form>
                      <Form.Field
                        style={{ fontSize: "30px", color: "#81172d" }}
                      >
                        <p>
                          {resultado.apellido_paterno +
                            " " +
                            resultado.apellido_materno}
                        </p>
                      </Form.Field>
                    </Form>
                  </Card.Header>
                  <Card.Meta
                    style={{
                      fontSize: "1.33em",
                      color: "#81172d",
                      marginTop: "5%",
                    }}
                  >
                    {resultado.nombre}
                  </Card.Meta>
                </Grid.Row>
                <Grid.Row>
                  <Label
                    as="a"
                    color="teal"
                    tag
                    floating
                  >
                    {resultado.colegio_regional}
                  </Label>
                </Grid.Row>
                <Grid.Row>
                  <Especilidad datosColegiado={colegiado} />
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      ))}
    </>
  );
};
export default BusquedaColegiado;

import React from "react";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Decanato" />
              <List link inverted>
                <List.Item as="a">Teléfono:</List.Item>
                <List.Item as="a">(511) 261-9242</List.Item>
                <List.Item as="a">Correo:</List.Item>
                <List.Item as="a">informes@colegiodeobstetras.pe</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="Tesorería" />
              <List link inverted>
                <List.Item as="a">Teléfono:</List.Item>
                <List.Item as="a">(511) 261-9242</List.Item>
                <List.Item as="a">Correo:</List.Item>
                <List.Item as="a">
                  tesoreria.nacional@colegiodeobstetras.pe
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h4" inverted>
                HORARIO DE ATENCIÓN
              </Header>
              <p>
                Lunes a viernes, de: <br /> 9:00 am – 1:00 pm <br />
                2:00 pm – 6:00 pm <br />
                Sábados, de: <br /> 9:00 am – 1:00 pm <br /> Dirección: Av.
                Parque José de San Martín 127, Pueblo Libre, Lima – Perú
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};
export default Footer;

import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component, useEffect } from "react";
import logo from "../../img/WEB-PORTADA.png";
import fotoCop from "../../img/doctorsilueta.jpg";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Form,
  Card,
  Label,
} from "semantic-ui-react";
import { BotonLogin } from "./SelectTable/BotonLogin";
import { useParams } from "react-router-dom";
import { useRegistro } from "../../hooks";
import { ConsultaColegiado } from "./FormConsulta";
import Especilidad from "./Especialidad/Especialidad";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});


const ObtenerDatos = () => {
  const { ncop } = useParams();
  const { getColegiadoByCop, colegiado, loading } = useRegistro();
  useEffect(() => {
    getColegiadoByCop(ncop);
  }, [ncop]);

  const cop = "COP-" + ncop.toString().padStart(5, "0");

  return (
    <>
      {colegiado &&
        colegiado.results.map((resultado, index) => (
          <Segment
            style={{ padding: "8em 0em", margin: "0% 20% 0% 20%" }}
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
                    <Card.Header >
                      <Form>
                        <Form.Field style={{ fontSize: "30px", color: "#81172d" }}>
                          <p>{resultado.apellido_paterno + " "+ resultado.apellido_materno}</p>                
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
                      /*style={{
                        float: "right",
                        marginBottom: "30px",
                        marginTop: "30px",
                      }} */
                    >
                      {resultado.colegio_regional}
                    </Label>
                  </Grid.Row>
                  <Grid.Row>
                      <Especilidad datosColegiado={colegiado}/>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        ))}
    </>
  );
};

const HomePageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content=""
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content=""
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />

    <Button
      href="https://colegiodeobstetras.pe/"
      primary
      size="huge"
      style={{
        backgroundColor: "#81172d",
        color: "white",
        marginTop: "40%",
      }}
    >
      Pagina Principal
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomePageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{
              /* minHeight: 700, padding: '1em 0em', */
              backgroundImage: `url(${logo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "75vh",
              width: "100%",
            }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <BotonLogin fixed />
            </Menu>
            <HomePageHeading />
          </Segment>
          {children}
        </Visibility>
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Inicio
            </Menu.Item>
            <Menu.Item as="a">Pagina Principal</Menu.Item>
            <Menu.Item as="a">Habilidad</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{
                /* minHeight: 700, padding: '1em 0em', */
                backgroundImage: `url(${logo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "80vh",
                width: "100%",
              }}
              /* style={{ minHeight: 350, padding: "1em 0em" }} */
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomePageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

function Footer() {
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
}
export function HomePageLayout() {
  const { ncop } = useParams();

  return (
    <ResponsiveContainer style={{ height: "100vh", backgroundColor: "red" }}>
      <Segment>{ncop ? <ObtenerDatos /> : <ConsultaColegiado />}</Segment>
      <Footer />
    </ResponsiveContainer>
  );
}

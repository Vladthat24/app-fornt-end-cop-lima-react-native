import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component} from "react";
import logo from "../../img/WEB-PORTADA.png";
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import { BotonLogin } from "./SelectTable/BotonLogin";
import { useParams } from "react-router-dom";
import { ConsultaColegiado } from "./FormConsulta";
import Footer from "./Footer/Footer";
import BusquedaColegiado from "./BusquedaColegiado/BusquedaColegiado";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

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
    
  </Container>
);

HomePageHeading.propTypes = {
  mobile: PropTypes.bool,
};

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
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

export function HomePageLayout() {
  const { ncop } = useParams();

  return (
    <ResponsiveContainer style={{ height: "100vh", backgroundColor: "red" }}>
      <Segment>
        {ncop ? <BusquedaColegiado ncop={ncop} /> : <ConsultaColegiado />}
      </Segment>
      <Footer />
    </ResponsiveContainer>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export function BotonLogin(props) {
  const { fixed } = props;
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate(`/admin`);
  };
  return (
    <Container>
      <Menu.Item as="a" active>
        Pagina Principal
      </Menu.Item>
      <Menu.Item position="right">
        <Button
          onClick={goToLogin}
          as="a"
          inverted={!fixed}
          style={{
            backgroundColor: "#81172d",
            color: "white",
          }}
        >
          Inicar Sesion
        </Button>
        <Button
          as="a"
          inverted={!fixed}
          primary={fixed}
          style={{ marginLeft: "0.5em" }}
        >
          Registrarse
        </Button>
      </Menu.Item>
    </Container>
  );
}

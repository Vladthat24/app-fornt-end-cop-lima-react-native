import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Pagination,
  Container,
  Image,
  Icon,
  List,
  Label,
  Table,
  Header,
} from "semantic-ui-react";
import fotoCop from "../../../img/doctorsilueta.jpg";
import "./ConsultaColegiado.scss";
import { BASE_API } from "../../../utils/constants";

export function ConsultaColegiado() {
  const [formValues, setFormValues] = useState({
    numCOP: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
  });
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fromValues", formValues);
      const { numCOP, nombre, apellidoPaterno, apellidoMaterno } = formValues;
      if (Object.values(formValues).some((value) => value)) {
        //Al menos un campo tiene valor
        console.log("Al menos un campo tiene valor");
        const query = `?cop=${numCOP}&nombre=${nombre}&apellido_paterno=${apellidoPaterno}&apellido_materno=${apellidoMaterno}&page=${activePage}&page_size=6`;
        try {
          const response = await fetch(
            `${BASE_API}/api/registro/${query}`
          );
          const result = await response.json();
          setData(result.results);
          setTotalPages(Math.ceil(result.count / 6));
        } catch (error) {
          console.error(error);
        }
      } else {
        //Todos los campos estan vacios
        console.log("Todos los campos estan vacios");
        setData("");
        setTotalPages(0 / 8);
      }
    };

    fetchData();
  }, [formValues, activePage]);

  const handleChange = (e, { name, value }) => {
    if (name == "numCOP" && value.length <= 7 && /^\d*$/.test(value)) {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    } else if (
      (["nombre", "apellidoPaterno", "apellidoMaterno"].includes(name) &&
        value.length <= 15 &&
        /^[a-zA-Z]+$/.test(value)) ||
      value === ""
    ) {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActivePage(1);
  };

  const handlePageChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ccc",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0px 0px 5px #ccc",
        }}
      >
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="N° COP"
            placeholder="N° COP"
            name="numCOP"
            value={formValues.numCOP}
            onChange={handleChange}
            style={{ fontSize: "110%" }}
          />
          <Form.Input
            fluid
            label="Nombre Completo"
            placeholder="Nombre"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
            style={{ fontSize: "110%" }}
          />
          <Form.Input
            fluid
            label="Apellido Paterno"
            placeholder="Ap. Paterno"
            name="apellidoPaterno"
            value={formValues.apellidoPaterno}
            onChange={handleChange}
            style={{ fontSize: "110%" }}
          />
          <Form.Input
            fluid
            label="Apellido Materno"
            placeholder="Ap. Materno"
            name="apellidoMaterno"
            value={formValues.apellidoMaterno}
            onChange={handleChange}
            style={{ fontSize: "110%" }}
          />
        </Form.Group>
      </Form>
      <div className="pagination-container">
        {totalPages > 1 && (
          <Pagination
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            defaultActivePage={activePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <Card.Group
        itemsPerRow={3}
        doubling
        stackable
        style={{ marginTop: window.innerWidth <= 768 ? "10%" : "0" }}
      >
        {data != ""
          ? data.map((item, index) => (
              <Card key={index}>
                <Image src={fotoCop} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{item.nombre}</Card.Header>
                  <Card.Description>
                    {item.apellido_paterno} {item.apellido_materno}
                  </Card.Description>
                  <div class="extra content" style={{ marginTop: "20px" }}>
                    {/* <span class="right floated ui">{item.colegio_regional}</span> */}
                    <a class="ui red tag label right floated">
                      {item.colegio_regional}
                    </a>
                    {/* <span class="ui red tag floated right">{item.colegio_regional}</span> */}
                    <span>
                      <i class="user icon"></i>
                      <a class="ui red circular label">{item.cop}</a>
                    </span>
                  </div>
                  <Table basic="very" celled collapsing>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Descripcion</Table.HeaderCell>
                        <Table.HeaderCell>Código</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4" image>
                            <Header.Content>
                              <Label color="red" horizontal>
                                Tipo:
                              </Label>{" "}
                              <Header.Subheader style={{ marginTop: "10px" }}>
                                <Label
                                  color="gray"
                                  horizontal
                                  style={{ marginLeft: "50%" }}
                                >
                                  RNA
                                </Label>{" "}
                              </Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell rowSpan="2" style={{fontSize:"25px"}}>443</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4" image>
                            <Header.Content>
                              <Label color="red" horizontal>
                                Registro:
                              </Label>{" "}
                              <Header.Subheader style={{ marginTop: "10px" }}>
                                <Label color="gray" horizontal>
                                  DIPLOMADO EN AUDITORIA MEDICA
                                </Label>{" "}
                              </Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Card.Content>
              </Card>
            ))
          : ""}
      </Card.Group>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Icon,
  Menu,
  Modal,
  Input,
  Segment,
  Label,
} from "semantic-ui-react";
import "./RegistroTablesAdmin.scss";
import { Pagination, Grid, Checkbox } from "semantic-ui-react";
import { ModalBasic, ModalAddRegistro } from "../../../Common";
import DownloadImagenQR from "./DownloadImagenQR";
import * as XLSX from "xlsx";

import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { useRegistro } from "../../../../hooks";
import { saveAs } from "file-saver";
import {
  getExportarExcelApi,
  getExportarExcelPersonalizadoAPi,
} from "../../../../api/registro";
import { HeaderPage } from "../../HeaderPage";
import { AddRegistroListAdmin } from "./AddRegistroListAdmin";

export function RegistroTablesAdmin(props) {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const [showModalAddRegistro, setShowModalAddRegistro] = useState(false);
  const [contentModalAddRegistro, setContentModalAddRegistro] = useState(null);

  const [titleModal, setTitleModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  const { updateImgQR, registros, getTotalRegistros, getExportarExcel } =
    useRegistro();

  useEffect(() => getTotalRegistros(), []);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const openCloseModalAddRegistro = () =>
    setShowModalAddRegistro((prev) => !prev);

  const [autoReload, setAutoReload] = useState(false);
  const {
    handleFirstPage,
    page,
    perPage,
    handlePaginationChange,
    totalPages,
    handleLastPage,
    data,
    searchTerm,
    handleSearchChange,
  } = props;

  //Obtener la url del dominio y el puerto
  const domain = window.location.hostname;
  const port = window.location.port;
  const path = `colegiado/`;
  const url = `https://${domain}/${path}`;
  //navigate(url);
  console.log(`Navegacion: ${url}`);

  const showQR = (ncop) => {
    setContentModal(
      <div style={{ textAlign: "center" }}>
        <DownloadImagenQR ncop={ncop} />
      </div>
    );
    openCloseModal();
  };

  const obtenerBase64Img = async (cop) => {
    console.log(cop);
    const canvas = document.getElementById(cop);
    const pngUrl = canvas.toDataURL("image/png");
    const base64Image = pngUrl.split(",")[1];
    console.log(base64Image);
    const idcop = cop.replace("qr", "");
    console.log(idcop);
    await updateImgQR(idcop, base64Image);
    return base64Image;
  };
  const ActualizarQR = async () => {
    for (const colegiados of data) {
      console.log(colegiados.cop);
      const canvas = document.getElementById("qr" + colegiados.cop);
      const pngUrl = canvas.toDataURL("image/png");
      const base64Image = pngUrl.split(",")[1];
      console.log(base64Image);
      console.log(colegiados.cop);
      await updateImgQR(colegiados.cop, base64Image);
    }
  };

  const onCheckAutoReload = (check) => {
    if (check) {
      setAutoReload(check);
    } else {
      setAutoReload(check);
    }
  };

  const ExportarExcelTotal = (autoReload) => {
    if (autoReload) {
      console.log("Es true");
      getExportarExcelApi();
    } else {
      getExportarExcelPersonalizadoAPi(page, perPage);
    }
  };

  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModalAddRegistro(
      <AddRegistroListAdmin
        onClose={openCloseModalAddRegistro}
        onRefetch={onRefetch}
      />
    );
    openCloseModalAddRegistro();
  };

  return (
    <>
      <HeaderPage
        title="Colegiados"
        btnTitle="Nuevo usuario"
        btnClick={addUser}
      />
      <Segment>
        <Grid>
          <Grid.Column mobile={8} computer={3}>
            <Input
              icon="search"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <Button
              color="green"
              icon
              onClick={() => ExportarExcelTotal(autoReload)}
              size="large"
              fluid
              style={{ marginTop: "10%" }}
            >
              Descargar Excel <Icon name="file excel outline" />
            </Button>
            <Button
              color="black"
              icon
              onClick={ActualizarQR}
              size="large"
              fluid
              style={{ marginTop: "10%" }}
            >
              Actualizar Qr <Icon name="qrcode" />
            </Button>
          </Grid.Column>
          <Grid.Column mobile={8} computer={13}>
            <div className="table-tables-admin__reaload-toggle">
              <span>
                {" "}
                <Label color="green" horizontal>
                  Descargar Reporte Completo
                </Label>
              </span>
              <Checkbox
                toggle
                checked={autoReload}
                onChange={(_, data) => onCheckAutoReload(data.checked)}
              />
            </div>
            <Table className="table-tables-admin">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>N° COP</Table.HeaderCell>
                  <Table.HeaderCell>Nombre</Table.HeaderCell>
                  <Table.HeaderCell>Ap. Paterno</Table.HeaderCell>
                  <Table.HeaderCell>Ap. Materno</Table.HeaderCell>
                  <Table.HeaderCell>Visualizar QR</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data.map((table, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{table.cop}</Table.Cell>
                    <Table.Cell>{table.nombre}</Table.Cell>
                    <Table.Cell>{table.apellido_paterno}</Table.Cell>
                    <Table.Cell>{table.apellido_materno}</Table.Cell>
                    <Table.Cell className={`center aligned`}>
                      <QrColegiado
                        showQR={(ncop) => showQR(ncop)}
                        ncop={table.cop}
                        imagenqr={table.imagenqr}
                      />

                      <QRCode
                        hidden
                        id={"qr" + table.cop}
                        value={
                          "https://consulta.colegiodeobstetras.pe/colegiado/" +
                          table.cop
                        }
                        size={100}
                        level={"H"}
                        includeMargin={true}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="5" style={{ textAlign: "center" }}>
                    <Actions
                      handleFirstPage={handleFirstPage}
                      page={page}
                      handlePaginationChange={handlePaginationChange}
                      totalPages={totalPages}
                      handleLastPage={handleLastPage}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>

            <ModalBasic
              show={showModal}
              onClose={openCloseModal}
              title="Codigo QR de Colegiado"
              size="mini"
              children={contentModal}
            />
            <ModalAddRegistro
              show={showModalAddRegistro}
              onClose={openCloseModalAddRegistro}
              title="Agregar Colegiado"
              size="large"
              children={contentModalAddRegistro}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
}

function QrColegiado(props) {
  const { showQR, ncop, imagenqr } = props;

  return (
    <Button
      icon
      onClick={() => showQR(ncop)}
      circular
      className={`${imagenqr ? "green" : "red"}`}
    >
      <Icon name="qrcode" />
    </Button>
  );
}
function Actions(props) {
  const {
    handleFirstPage,
    page,
    handlePaginationChange,
    totalPages,
    handleLastPage,
  } = props;

  return (
    <Pagination
      activePage={page}
      onPageChange={handlePaginationChange}
      totalPages={totalPages}
    />
  );
}

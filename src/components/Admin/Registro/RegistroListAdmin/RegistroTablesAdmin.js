import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Icon,
  Menu,
  Modal,
  Input,
  Segment,
} from "semantic-ui-react";
import "./RegistroTablesAdmin.scss";
import { Pagination, Grid } from "semantic-ui-react";
import { ModalBasic } from "../../../Common";
import DownloadImagenQR from "./DownloadImagenQR";
import * as XLSX from "xlsx";


import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { useRegistro } from "../../../../hooks";
import { saveAs } from 'file-saver';

export function RegistroTablesAdmin(props) {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [urlQr, setUrlQr] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const navigate = useNavigate();
  const { updateImgQR,registros,getTotalRegistros } = useRegistro();

  useEffect(()=>getTotalRegistros(),[]);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const {
    handleFirstPage,
    page,
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

/*   const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");
    XLSX.writeFile(workbook, "registros.xlsx");
  }; */

/*   const handleExportExcel = async () => {
  
    // Crear una nueva hoja de cálculo
    const workbook = XLSX.utils.book_new();
  
    // Convertir los datos en una matriz
    const records = data.map((item) => {
      
      const { imagenqr, ...rest } = item;
      return {
        ...rest,
        imagenqr: {
          base64: imagenqr,
          extension: 'png',
        },
      };
    });
    console.log(records);
    // Crear una hoja de cálculo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(records);
  
    console.log("word:",worksheet);
    for (let i = 2; i <= records.length + 1; i++) {
      const cell = worksheet[`L${i}`];
      console.log("Cell: ", cell.base64);
      const img = await XlsxPopulate.fromBase64Async(cell.base64, cell.extension);
      img.addTo(worksheet, { tl: { col: 1, row: i }, ext: { width: 100, height: 100 } });
    }
    
  
    // Agregar la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros');
  
    // Guardar el archivo Excel
    const excelData = await workbook.outputAsync();
    const excelBlob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, 'registros.xlsx');
  }; */

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
const ActualizarQR=async()=>{

  for(const colegiados of data){
    console.log(colegiados.cop);
    const canvas = document.getElementById("qr"+colegiados.cop);
    const pngUrl = canvas.toDataURL("image/png");
    const base64Image = pngUrl.split(",")[1];
    console.log(base64Image);
    console.log(colegiados.cop);
    await updateImgQR(colegiados.cop,base64Image)
  }

}
  return (
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
            onClick={ActualizarQR}
            size="large"
            fluid
            style={{ marginTop: "10%" }}
          >
            Descargar Excel <Icon name="file excel outline" />
          </Button>
        </Grid.Column>
        <Grid.Column mobile={8} computer={13}>
          <Table className="table-tables-admin">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>N° COP</Table.HeaderCell>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Ap. Paterno</Table.HeaderCell>
                <Table.HeaderCell>Ap. Materno</Table.HeaderCell>
                <Table.HeaderCell>Qr</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map((table, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{table.cop}</Table.Cell>
                  <Table.Cell>{table.nombre}</Table.Cell>
                  <Table.Cell>{table.apellido_paterno}</Table.Cell>
                  <Table.Cell>{table.apellido_materno}</Table.Cell>
                  <Table.Cell>
                    <QrColegiado
                      showQR={(ncop) => showQR(ncop)}
                      ncop={table.cop}
                    />
                    <QRCode
                      hidden
                      id={"qr" + table.cop}
                      value={"https://consulta.colegiodeobstetras.pe/colegiado/" + table.cop}
                      size={100}
                      level={"H"}
                      includeMargin={true}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Actions
              handleFirstPage={handleFirstPage}
              page={page}
              handlePaginationChange={handlePaginationChange}
              totalPages={totalPages}
              handleLastPage={handleLastPage}
            />
          </Table>

          <ModalBasic
            show={showModal}
            onClose={openCloseModal}
            title="Codigo QR de Colegiado"
            size="mini"
            children={contentModal}
          />
        </Grid.Column>
      </Grid>
      <Pagination
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        activePage={page}
        onPageChange={handlePaginationChange}
        totalPages={totalPages}
        className="mi-nueva-clase"
      />
        <Pagination
    defaultActivePage={page}
    firstItem={null}
    lastItem={null}
    onPageChange={handlePaginationChange}
    pointing
    secondary
    totalPages={totalPages}
  />
    </Segment>
  );
}

function QrColegiado(props) {
  const { showQR, ncop } = props;

  return (
    <Button icon onClick={() => showQR(ncop)}>
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
    <Table.Footer className="table-footer-registro">
      <Table.Row>
        <Table.HeaderCell colSpan="10">
          <Menu floated="right" pagination>
            {/*           <Button onClick={() => handleFirstPage()}>Antes</Button> */}
            <Pagination
              style={{ width: "450px" }}
              activePage={page}
              onPageChange={handlePaginationChange}
              totalPages={totalPages}
            />
            {/*           <Button onClick={() => handleLastPage()}>Despues</Button> */}
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
}

import React, { useRef, useState } from "react";
import copy from "copy-to-clipboard";
import QRCode from "qrcode.react";
import { Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import "./DownloadImagenQR.scss";
import { useNavigate } from "react-router-dom";


function DownloadImagenQR(props) {
  const [qrImage, setQrImage] = useState("");
  const [copyText, setCopyText] = useState("");
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const {ncop}=props;//Numero de Cop

  //Obtener la url del dominio y el puerto
  const domain = window.location.hostname;
  const port = window.location.port;
  const path = `colegiado/${ncop}`;
  const url = `http://${domain}:${port}/${path}`;
  navigate(url);
  console.log(`Navegacion: ${url}`);

  const valueQR = url;

  const downloadQRV2 = () => {
    const canvas = document.getElementById("QRColegiado");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const copyToClipboard = () => {
    copy(valueQR);
    /*     alert(`You have copied "${valueQR}"`); */
    toast.success(`Link Copiado "${valueQR}"`);
  };

  const QRColegiado = () => {
    return (
      <QRCode
        id="QRColegiado"
        value={valueQR}
        size={290}
        level={"H"}
        includeMargin={true}
      />
    );
  };
  return (
    <div className="QRDownload">
      <QRColegiado />
      <Button onClick={downloadQRV2} fluid>
        {" "}
        Download QR{" "}
      </Button>
      <Input
        action={{
          color: "teal",
          labelPosition: "right",
        }}
        readOnly
        onChange={handleCopyText}
        defaultValue={valueQR}
      />
      <Button
        icon="copy"
        color="teal"
        onClick={copyToClipboard}
        style={{ margintop: "20px" }}
      ></Button>
    </div>
  );
}

export default DownloadImagenQR;

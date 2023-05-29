import React, { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import { useEstudios } from "../../../hooks";
import { map } from "lodash";
import DetalleEspecialidad from "./DetalleEspecialidad";

const Especilidad = (props) => {
  const { tipoEstudios, getTipoEstudios } = useEstudios();
  const { datosColegiado } = props;

  useEffect(() => {
    getTipoEstudios();
  }, []);

  if (tipoEstudios === null) {
    return null;
  }

  const detalle = (TipoEstudios, datosColegiado) => {
    return map(TipoEstudios, (tipoEstudio, index) => ({
      key: tipoEstudio.idtipo_estudio,
      menuItem: tipoEstudio.name,
      render: () => (
        <DetalleEspecialidad
          key={index}
          ncop={datosColegiado.results[0].cop}
          tipoEstudio={tipoEstudio.idtipo_estudio}
        />
      ),
    }));
  };

  return (
    <Tab
      style={{ marginTop: "30px" }}
      menu={{ fluid: true, vertical: true, tabular: true }}
      panes={detalle(tipoEstudios, datosColegiado)}
    />
  );
};
export default Especilidad;

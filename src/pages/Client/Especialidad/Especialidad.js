import React, { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import { useEstudios } from "../../../hooks";
import { map } from "lodash";
import DetalleEspecialidad from "./DetalleEspecialidad";

const Especilidad = (props) => {
  const { tipoEstudios, getTipoEstudios } = useEstudios();
  const {datosColegiado} = props;
  useEffect(() => {
    getTipoEstudios();
  }, []);

  if (tipoEstudios === null) {
    return null;
  }
  const panes = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]
  
  const detalle = (hola) => {
    return map(hola, (tipoEstudio,index) => ({
      key: index,
      menuItem: tipoEstudio,
      render: () => <Tab.Pane>Hola</Tab.Pane>
    }));
  };
  console.log("asd",tipoEstudios);

  return (
    <Tab
      style={{ marginTop: "30px" }}
      menu={{ fluid: true, vertical: true, tabular: true }}
      panes={detalle(tipoEstudios)}
    />

  );
};
export default Especilidad;

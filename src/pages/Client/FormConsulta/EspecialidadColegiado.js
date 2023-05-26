import React, { useState, useEffect } from "react";
import { Accordion, Icon, Loader } from "semantic-ui-react";
import { useEstudios } from "../../../hooks";
import { map } from "lodash";
import { EspecialidadDetalle } from "./EspecialidadDetalle";

const EspecialidadColegiado = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { loading, estudios, getEstudiosByCop, tipoEstudios, getTipoEstudios } =
    useEstudios();
  const { ncop } = props;

  useEffect(() => {
    getTipoEstudios();
  }, []);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  if (tipoEstudios === null) {
    return null;
  }
  return (
    <>
      {map(tipoEstudios, (tipoEstudios, index) => (
        <Accordion styled>
          <Accordion.Title
            active={activeIndex === index}
            index={index}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
            {tipoEstudios.name}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === index}>
            <EspecialidadDetalle key={index} tipoEstudio={tipoEstudios.idtipo_estudio} ncop={ncop}/>
          </Accordion.Content>
        </Accordion>
      ))}
    </>
  );
};

export default EspecialidadColegiado;

import React, { useState, useEffect } from "react";
import { Table, Label } from "semantic-ui-react";
import { useEstudios } from "../../../hooks";
import { map } from "lodash";

export function EspecialidadDetalle(props) {
  const { tipoEstudio, ncop } = props;
  const { loading, estudios, getEstudiosByCop } = useEstudios();

  useEffect(() => {
    getEstudiosByCop(ncop, tipoEstudio);
  }, []);
  if (estudios === null) {
    return null;
  }
  console.log("estudios: ", estudios);
  console.log("tipoEstudio: ", tipoEstudio);
  console.log("--------------");
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Codigo de Estudio</Table.HeaderCell>
          <Table.HeaderCell>Nombre de Estudio</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(estudios, (estudio, index) => (
          <Table.Row key={index}>
            <Table.Cell
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Label style={{ textAlign: "center" }}>
                {estudio.cod_estudio}
              </Label>
            </Table.Cell>
            <Table.Cell>{estudio.name_estudio}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

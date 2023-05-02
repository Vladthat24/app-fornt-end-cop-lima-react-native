import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TablesListAdmin } from "../../components/Admin";
import { useTable } from "../../hooks";
import { size } from "lodash";

export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable();

  useEffect(
    () => //getTables(),

    []
  );

  return (
    <>
      <HeaderPage title="Restaurante" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablesListAdmin tables={tables} />
      )}
    </>
  );
}

/*   return (
    <>
      <HeaderPage title="Restaurante" />
      {loading==false ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablesListAdmin tables={tables} />
      )}
    </>
  ); */

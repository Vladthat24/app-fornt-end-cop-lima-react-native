import React, { useEffect } from 'react'
import { HeaderPage,TablePayments} from "../../components/Admin";
import { usePayment } from '../../hooks';
import {Loader} from "semantic-ui-react";

export function PaymentsHistory() {
  
  const{ loading,payments,getPayments}= usePayment();

  useEffect(()=>getPayments(),[]);

  return (
    <>
      <HeaderPage title="Historial de Pagos"/>
      {loading?(<Loader active inline="centered">Cargando...</Loader>):(
        <TablePayments payments={payments}/>
      )}
    </>
  )
}

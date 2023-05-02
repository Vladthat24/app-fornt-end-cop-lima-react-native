import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  AddOrderForm,
  PaymentDetail,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { ListOrderAdmin } from "../../components/Admin";
import { useOrder, useTable, usePayment } from "../../hooks";
import { forEach, size } from "lodash";

export function TableDetailsAdmin() {
  //hooks para actualizar MOSTRAR ENTREGADO
  const [reloadOrders, setReloadOrders] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { id } = useParams(); //obtener el id de params{id}
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();

  const [showModal, setShowModal] = useState(false);

  /*Esto se actualiza cada vez que apretemos el boton de MARCAR ENTREGADO*/
  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrders]);

  useEffect(() => getTable(id), [id]); //obtener el titulo

  //FUNCION PARA VISUALIZAR SI LA CUENTA FUE GENERADA
  useEffect(() => {
    //funcion autoejecutable
    (async () => {
      const response = await getPaymentByTable(id);
      if (size(response) > 0) setPaymentData(response[0]);
    })();
  }, [reloadOrders]);

  /*  Funcion interruptor que captura el estado previo y lo devuelve lo contrario */
  const onReloadOrders = () =>
    setReloadOrders((prev) => !prev); /* Enviamos la funcion a Order */

  const openCloseModal = () => setShowModal((prev) => !prev);

  //Generar cuenta de la mesa:
  const onCreatePayment = async () => {
    const result = window.confirm(
      "¿Estas seguro de generar la cuenta de la mesa?"
    );

    if (result) {
      let totalPayment = 0;

      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price);
      });

      const resultTypePayment = window.confirm(
        "¿Paga con tarjeta pulsa ACEPTAR, con efectivo pulsa CANCELAR?"
      );

      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType: resultTypePayment ? "CARD" : "CASH",
        statusPayment: "PENDING",
      };

      const payment = await createPayment(paymentData);
      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }
      onReloadOrders();
    }
  };
  return (
    <>
      <HeaderPage
        title={`Mesa ${table?.number || ""}`}
        btnTitle={paymentData ? "Ver Cuenta" : "Añadir Pedido"}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData ? "Generar Cuenta" : null}
        btnClickTwo={onCreatePayment}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Generar pedido"
      >
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </ModalBasic>
    </>
  );
}

import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { useOrder } from "../../../../hooks/useOrder";
import { usePayment } from "../../../../hooks/usePayment";
import "./PaymentDetail.scss";

export function PaymentDetail(props) {
  const { payment, orders, openCloseModal, onReloadOrders } = props;
  const { closePayment } = usePayment();
  const { closeOrder } = useOrder();

  const getIconPayment = (key) => {
    if (key == "CARD") return "credit card outline";
    if (key == "CASH") return "money bill alternate outline";
    return null;
  };
  //funcion para cerrar mesa
  const onCloseTable = async () => {
    const result = window.confirm("¿Cerrar mes para nuevos clientes?");
    if (result) {
      await closePayment(payment.id);

      //cerrar ordenes
      for await (const order of orders) {
        await closeOrder(order.id);
        console.log(order);
      }

      onReloadOrders();
      openCloseModal();
    }
  };

  return (
    <div className="payment-detail">
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Mesa:</Table.Cell>
            <Table.Cell>{payment.table_data.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Total:</Table.Cell>
            <Table.Cell>S/. {payment.totalPayment}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Forma de pago:</Table.Cell>
            <Table.Cell>
              <Icon name={getIconPayment(payment.paymentType)} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button primary fluid onClick={onCloseTable}>
        Marcar como pagado y cerrar mesa
      </Button>
    </div>
  );
}

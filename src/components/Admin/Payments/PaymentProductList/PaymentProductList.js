import React,{useState,useEffect} from 'react'
import {Image} from "semantic-ui-react";
import {map} from "lodash";
import { useOrder } from '../../../../hooks';
import "./PaymentProductList.scss";


export function PaymentProductList(props) {
    const {payment}=props;
    console.log("payment:",payment);
    const[orders,setOrders]=useState([]);
    const {getOrderByPayment}=useOrder();

    useEffect(()=>{
        (async()=>{
            const response= await getOrderByPayment(payment.id);
            setOrders(response);
        })();
    },[])

  return (
    <div className='payment-product-list'>
      {map(orders,(order)=>(
        <di className="payment-product-list__product" key={order.id}>
          <div>
            <Image src={order.product_data.image} avatar size="tiny"/>
            <span>{order.product_data.title}</span>
          </div>
          <span>{order.product_data.price}</span>
        </di>
      ))}
    </div>
  )
}

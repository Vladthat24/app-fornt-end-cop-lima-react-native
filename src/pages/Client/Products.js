import React,{useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import {useProduct} from "../../hooks";

export function Products() {
  const { tableNumber, idCategory } = useParams();
  const{loading,products,getProductsByCategory}=useProduct();

  //realizamos la cosulta a nuestra api
  useEffect(()=>getProductsByCategory(idCategory),[idCategory]);

  console.log(products);

  return (
    <div>
      <Link to={`/client/${tableNumber}`}>Volver a categorias</Link>

      {loading?<p>Cargando....</p>: <p>Lista de Productos</p>}
    </div>
  );
}

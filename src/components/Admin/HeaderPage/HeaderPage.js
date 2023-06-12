import React from "react";
import { Button } from "semantic-ui-react";
import "./HeaderPage.scss";

export function HeaderPage(props) {
  
  //Cabezera de la tabla donde se agregara los botones y titulos
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props;
  return (
    <div className="header-page-admin">
      <h2>{title}</h2>
      <div>
        {btnTitle && (
          <Button positive onClick={btnClick}  inverted color='red'>
            {btnTitle}
          </Button>
        )}
        {btnTitleTwo && (
          <Button negative onClick={btnClickTwo}>
            {btnTitleTwo}
          </Button>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { TopMenu } from "../../components/Admin";
import SideMenu from "../../components/Admin/SideMenu/SideMenu";
import { useAuth } from "../../hooks";
import { LoginAdmin } from "../../pages/Admin";
import "./AdminLayout.scss";

export function AdminLayout(props) {
  const { children } = props;
  //obtener el auth para validar el ingreso del usuario
  const { auth } = useAuth();

  if (!auth) return <LoginAdmin />;

  return (
    <div className="admin-layout">
      <div className="admin-layout__menu">
        <TopMenu />
      </div>
      <div className="admin-layout__main-content">
        <SideMenu>{children}</SideMenu>
      </div>
    </div>
  );
}

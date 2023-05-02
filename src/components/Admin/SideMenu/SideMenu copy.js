import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
/* import { useAuth } from "../../../../hooks"; */
import "./SideMenu.scss";
export default function SideMenu(props) {
  const { children } = props;
  const { pathname } = useLocation();

  return (
    <div className="side-menu-admin-nar">
      <MenuLeft pathname={pathname} />
      <div className="content">{children}</div>
    </div>
  );
}

function MenuLeft(props) {
  const { pathname } = props;
  /*  
  const { auth } = useAuth();
   console.log(auth);
  {auth.me?.is_staff("aqui colocamos el menu o pagina")} 
  */
  return (
    <Menu fixed="left" borderless className="side" vertical>
{/*       <Menu.Item as={Link} to={"/admin"} active={pathname === "/admin"}>
        <Icon name="home" />
        Pedidos
      </Menu.Item> */}
      <Menu.Item
        as={Link}
        to={"/admin/registros"}
        active={pathname === "/admin/registros"}
      >
        <Icon name="registered" />
        Registros
      </Menu.Item> 
{/*       <Menu.Item
        as={Link}
        to={"/admin/tables"}
        active={pathname === "/admin/tables"}
      >
        <Icon name="table" />
        Mesas
      </Menu.Item> */}

      <Menu.Item
        as={Link}
        to={"/admin/users"}
        active={pathname === "/admin/users"}
      >
        <Icon name="users" />
        Usuarios
      </Menu.Item>
    </Menu>
  );
}

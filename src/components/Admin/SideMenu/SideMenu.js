import React, { useState } from "react";
import { Icon, Menu, Button } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import "./SideMenu.scss";

export default function SideMenu(props) {
  const { children } = props;
  const { pathname } = useLocation();
  const [menuVisible, setMenuVisible] = useState(true);

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  return (
    <div className="side-menu-admin-nar">
      <div className="toggle-menu">
        <Button icon onClick={toggleMenu}>
          <Icon name={menuVisible ? "close" : "bars"} />
        </Button>
      </div>
      <MenuLeft pathname={pathname} visible={menuVisible} />
      <div className="content">{children}</div>
    </div>
  );
}

function MenuLeft(props) {
  const { pathname, visible } = props;
  return (
    <Menu
      fixed="left"
      borderless
      className={`side ${visible ? "visible" : "hidden"}`}
      vertical
    >
      <Menu.Item
        as={Link}
        to={"/admin/registros"}
        active={pathname === "/admin/registros"}
      >
        <Icon name="registered" />
        Registros
      </Menu.Item>

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

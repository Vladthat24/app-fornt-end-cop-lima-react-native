import React from "react";
import "./LoginAdmin.scss";
import { LoginForm } from "../../../components/Admin";

export function LoginAdmin() {
  return (
    <div className="login-admin">
      <div className="login-admin__content">
        <h1>Inicar Sesión</h1>
        <LoginForm />
      </div> 
    </div>
  );
}

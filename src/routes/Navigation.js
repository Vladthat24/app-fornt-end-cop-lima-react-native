import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { map } from "lodash";
import routes from "./routes";
import { Error404 } from "../pages";

console.log(routes);
export function Navigation() {
  return (
    <Router>
      <Routes>
        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          />
        ))}
      </Routes>
      
    </Router>
  );
}

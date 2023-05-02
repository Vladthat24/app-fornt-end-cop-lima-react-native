import { AdminLayout } from "../layouts";
import {
  OrdersAdmin,
  UsersAdmin,
  CategoriesAdmin,
  ProductAdmin,
  TableAdmin,
  TableDetailsAdmin,
  PaymentsHistory,
  RegistrosAdmin,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: UsersAdmin,
    exact: true,
  },
  {
    path: "/admin/registros",
    layout: AdminLayout,
    component: RegistrosAdmin,
    exact: true,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UsersAdmin,
    exact: true,
  },
];

export default routesAdmin;

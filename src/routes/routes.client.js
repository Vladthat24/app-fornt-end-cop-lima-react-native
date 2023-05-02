import { ClienteLayout,BasicLayout} from "../layouts";
import { Error404 } from "../pages";
import {Categories,Products,HomePageLayout} from "../pages/Client";


const routeClient = [
  {
    path: "/",
    layout: 'HomePageLayout',
    component: HomePageLayout,
    exact: true,
  },
  {
    path:"/colegiado/:ncop",
    layout: 'HomePageLayout',
    component: HomePageLayout,
    exact: true,
  },
  {
    path:"/client/:tableNumber",
    layout:ClienteLayout,
    component:Categories,
    exact:true,
  },
  {
    path:"/client/:tableNumber/:idCategory",
    layout:ClienteLayout,
    component:Products,
    exact:true,
  },
  {
    path: "/consulta",
    layout: 'HomePageLayout',
    component: HomePageLayout,
    exact: true,
  },
];

export default routeClient;

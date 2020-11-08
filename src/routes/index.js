import Home from "../containers/Home";
import Login from '../containers/Login';
import Sales from '../containers/Sales';
import Settings from "../containers/Settings";

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    title: "Home",
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    title: "Acceso",
  },
  {
    path: '/sales',
    component: Sales,
    exact: true,
    title: "Ventas",
  },
  {
    path: '/settings',
    component: Settings,
    exact: true,
    title: "Ajustes",
  },
];

export default routes;
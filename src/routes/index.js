import Home from "../containers/Home";
import Login from '../containers/Login';
import Sales from '../containers/Sales';

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
];

export default routes;
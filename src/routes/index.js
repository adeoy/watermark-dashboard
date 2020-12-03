import Home from "../containers/Home";
import Login from '../containers/Login';
import Sales from '../containers/Sales';
import Settings from "../containers/Settings";
import Products from '../containers/Products';
import Expenses from '../containers/Expenses';

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
    path: '/expenses',
    component: Expenses,
    exact: true,
    title: "Gastos",
  },
  {
    path: '/products',
    component: Products,
    exact: true,
    title: "Productos",
  },
  {
    path: '/settings',
    component: Settings,
    exact: true,
    title: "Ajustes",
  },
];

export default routes;
import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
//import Profile from "views/admin/profile";
import Balance from "views/admin/balance";
import Estado from "views/admin/estado";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdMonetizationOn,
  MdLock,
  MdCalculate,
} from "react-icons/md";
import { MdMoneyOff } from "react-icons/md";

const routes = [
  {
    name: "Calculadora Financiera",
    layout: "/admin",
    path: "default",
    icon: <MdCalculate className="w-6 h-6" />,
    component: <MainDashboard />,
  },

  {
    name: "Balance General",
    layout: "/admin",
    path: "balance",
    icon: <MdMonetizationOn className="w-6 h-6" />,
    component: <Balance />,
  },
  {
    name: "Estado Resultado",
    layout: "/admin",
    path: "Estado resultado",
    icon: <MdMonetizationOn className="w-6 h-6" />,
    component: <Estado />,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="w-6 h-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
];
export default routes;

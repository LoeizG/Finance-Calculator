import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
//import Profile from "views/admin/profile";
import Balance from "views/admin/balance";
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
  MdCalculate
} from "react-icons/md";
import { MdMoneyOff } from "react-icons/md";

const routes = [
  {
    name: "Calculadora Financiera",
    layout: "/admin",
    path: "default",
    icon: <MdCalculate className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Balance General",
    layout: "/admin",
    path: "balance",
    icon: <MdMonetizationOn className="h-6 w-6" />,
    component: <Balance />,
  },
  
];
export default routes;

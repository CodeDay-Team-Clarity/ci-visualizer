import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";

export const SideNavData = [
  {
    title: "Graph",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "home",
    icon: <HomeIcon />,
    link: "/home",
  }
];
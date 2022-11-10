import React, { FC } from "react";
import { Outlet } from "react-router";
import { Navbar } from "../../Components/Navbar/Navbar";
import "./main.scss";

interface Props {}

export const Main: FC<Props> = ({}) => {
  return (
    <>
    <div className="appWrapper">
      <Navbar />
      <Outlet />
      </div>
    </>
  );
};

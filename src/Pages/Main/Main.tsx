import React, { FC } from "react";
import { Outlet } from "react-router";
import { Footer } from "../../Components/Footer/Footer";
import { Navbar } from "../../Components/Navbar/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import "./main.scss";
import ErrorFallback from "../ErrorFallback/ErrorFallback";
import { Modal } from "react-bootstrap";
import classNames from "classnames";
import bg from "../../assets/images/desk/bg.png";
import bgMob from "../../assets/images/mob/mobg.png";

interface Props {}

export const Main: FC<Props> = ({}) => {
    return (
        <div className="appWrapper">
            {/* <img src={bg} className={classNames("bg", "deskOnly")} alt="bg" />
            <img src={bgMob} className={classNames("bg", "mobOnly")} alt="bg" /> */}
            <Navbar />
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                    // reset the state of your app so the error doesn't happen again
                }}
            >
                <Outlet />
            </ErrorBoundary>
            <Footer />
        </div>
    );
};

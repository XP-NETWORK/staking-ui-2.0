import React, { FC } from "react";
import { Outlet } from "react-router";
import { Footer } from "../../Components/Footer/Footer";
import { Navbar } from "../../Components/Navbar/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import "./main.scss";
import ErrorFallback from "../ErrorFallback/ErrorFallback";

interface Props {}

export const Main: FC<Props> = ({}) => {
    return (
        <div className="appWrapper">
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

import React from "react";
import image from "./../../assets/images/404.png";

interface errProps {
    error: any;
    resetErrorBoundary: any;
}

export default function ErrorFallback({ error, resetErrorBoundary }: errProps) {
    return (
        <div className="page-not-found__container">
            <div className="page-not-found-image">
                <img src={image} alt="" />
            </div>
            <div className="page-not-found-content">
                <div className="page-not-found-header">Oops!</div>
                <div>Something went wrong.</div>
                <div>The page you are looking for is not available.</div>
            </div>
            <div
                onClick={() => window.location.reload()}
                className="page-not-found-btn"
            >
                Back to Homepage
            </div>
        </div>
    );
}

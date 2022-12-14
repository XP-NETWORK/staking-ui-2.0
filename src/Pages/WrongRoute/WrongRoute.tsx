import React from "react";
import { useNavigate } from "react-router";
import image from "./../../assets/images/404.png";
import "./wrongRoute.scss";

export default function WrongRoute() {
    const navigate = useNavigate();

    return (
        <div className="page-not-found__container">
            <div className="page-not-found-image">
                <img src={image} alt="" />
            </div>
            <div className="page-not-found-content">
                <div className="page-not-found-header">Oops!</div>
                <div>It’s just a 404 error.</div>
                <div>The page you are looking for is not available.</div>
            </div>
            <div onClick={() => navigate("/")} className="page-not-found-btn">
                Back to Homepage
            </div>
        </div>
    );
}

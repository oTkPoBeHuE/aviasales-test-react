import React from "react";
import '../App.css'

export const Loading = function() {
    return (
        <div className="loading-wrapper">
            <div>
                {/*<img src="../assets/logo.svg" alt="logo"/>*/}
                <div className="lds-ripple">
                    <div />
                    <div />
                </div>
            </div>
        </div>
    )
};
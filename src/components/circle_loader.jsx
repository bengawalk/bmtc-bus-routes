import React from "react";

const CircleLoader = ({ text }) => {
    return (
        <div className="circle-loader-wrapper">
            <div className="circle-loader"></div>{ text || "Loading..." }
        </div>
    );
};

export const CircleLoaderBlock = ({ text }) => {
    return (
        <div className="circle-loader-block">
            <CircleLoader
                text={text}
            />
        </div>
    );
}

export default CircleLoader;

"use strict";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../animations/comingSoon.json";

const ComingSoon = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Lottie options={defaultOptions} height={400} width={400} />
      <h1 className="text-4xl font-bold my-4">Coming Soon</h1>
      <p className="text-lg text-gray-700">
        We are working hard to bring you something amazing. Stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;

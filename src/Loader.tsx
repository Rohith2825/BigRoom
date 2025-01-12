import { useRef } from "react";
import React from "react";
import "./styles/loading-animation.css";

interface LoadProps {
  progress: number; // Progress as a percentage
}

const Load: React.FC<LoadProps> = ({ progress }) => {

  // Using useRef to store the previous progress value
  const prevProgressRef = useRef(0);

  // Ensure progress only increments
  const displayProgress = Math.max(progress, prevProgressRef.current);

  // Update the reference for the next render
  prevProgressRef.current = displayProgress;


  return (
    <div
      className="loader-background"
    >
      <div className="loader-container-container">
        <div className="loader-container" id="loaderContainer">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="loading-text-container">
            <div className="loading-text typewriter">Delta XR</div>
            <div className="loading-text">{Math.round(displayProgress)}%</div>
          </div>
          <img
            id="powered-by-loader"
            src="logo.avif"
            alt="Powered By Strategy Fox"
            className="powered-by-loader"
          />
        </div>
        <div className="loading-line"></div>
      </div>
    </div>
  );
};

export default Load;

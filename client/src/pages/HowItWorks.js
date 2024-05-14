import React from "react";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <div className="top-container-how-it-works">
        <h2>Watch how to navigate through the application</h2>
        <video className="video-player" controls>
          <source src="/assets/Full_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </div>
  );
}

export default HowItWorks;

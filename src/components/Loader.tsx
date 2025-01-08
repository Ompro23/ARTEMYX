import React, { useState, useEffect } from "react";
import styles from "./Loader.module.css";

const Loader = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  useEffect(() => {
    // Set timer for loader animation
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade-out animation
      setTimeout(onFinish, 1000); // Call onFinish after animation
    }, 4000); // 4-second loader duration

    // Play custom voice from /logo/voice.mp3
    const audio = new Audio("/logo/finale.mp4");
    if (!isVoicePlaying) {
      audio.play();
      setIsVoicePlaying(true);
    }

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [onFinish, isVoicePlaying]);

  return (
    <div className={`${styles.loaderWrapper} ${fadeOut ? styles.fadeOut : ""}`}>
      <div className={styles.content}>
      {/* Animated Text */}
      <center>
        <img
        src="/logo/logo-beige.png"
        alt="Artemyx GIF"
        className={`${styles.gif} ${styles.fadeIn}`}
        style={{ width: "100%", maxWidth: "300px" }} // Make image responsive
        />
      </center>
      <p className={styles.animatedText} style={{ color : "#e4dcc7" }}>
        <span>Welcome</span>
        <span>to</span>
        <span>the</span>
        <span>world</span>
        <span>of</span>
        <span>Artemyx</span>
      </p>
      </div>
    </div>
  );
};

export default Loader;
import React, { useState, useEffect } from "react";

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [emoji, setEmoji] = useState("😐");

  const updateCountdown = () => {
    const now = new Date();

    // ICT time conversion (UTC+7)
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60000;
    const ictOffsetMs = 7 * 60 * 60000;
    const ictNow = new Date(utcNow + ictOffsetMs);

    // Today's 8 PM ICT
    const target = new Date(ictNow);
    target.setHours(20, 0, 0, 0);

    // If already past 8 PM ICT, target is tomorrow
    if (ictNow >= target) {
      target.setDate(target.getDate() + 1);
    }

    const diff = target - ictNow;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const milliseconds = diff % 1000;

    // Emoji logic (same as before)
    const ictHour = ictNow.getHours();
    if (ictHour >= 20 && ictHour < 24) {
      setEmoji("😭");
    } else if (ictHour < 9) {
      setEmoji("😴");
    } else {
      if (hours >= 1) setEmoji("😊");
      if (hours === 0 && minutes <= 30) setEmoji("😕");
      if (hours === 0 && minutes <= 10) setEmoji("😰");
    }

    setTimeLeft({ hours, minutes, seconds, milliseconds });
  };

  useEffect(() => {
    const timer = setInterval(updateCountdown, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "'Arial', monospace", // ensures all digits line up evenly
      }}
    >
      {/* Title */}
      <h1 style={{ fontSize: "3rem", marginBottom: "30px" }}>
        ICECREAM CLOSING COUNTDOWN
      </h1>

      {/* Countdown Numbers + Labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "60px",
          fontFamily: "monospace", // Monospace fallback for stability
        }}
      >
        {/* Hours */}
        <div style={{ textAlign: "center", minWidth: "120px" }}>
          <div style={{ fontSize: "5rem", minWidth: "120px" }}>
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div style={{ fontSize: "1.5rem" }}>Hours</div>
        </div>

        {/* Minutes */}
        <div style={{ textAlign: "center", minWidth: "120px" }}>
          <div style={{ fontSize: "5rem", minWidth: "120px" }}>
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div style={{ fontSize: "1.5rem" }}>Minutes</div>
        </div>

        {/* Seconds */}
        <div style={{ textAlign: "center", minWidth: "180px" }}>
          <div style={{ fontSize: "5rem", minWidth: "180px" }}>
            {(timeLeft.seconds + timeLeft.milliseconds / 1000)
              .toFixed(3)
              .padStart(6, "0")}
          </div>
          <div style={{ fontSize: "1.5rem" }}>Seconds</div>
        </div>
      </div>

      {/* Emoji */}
      <p style={{ fontSize: "10rem", marginTop: "50px" }}>{emoji}</p>
    </div>
  );
}

export default App;

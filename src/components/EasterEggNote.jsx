import React, { useState, useEffect } from "react";
import { FaMusic } from "react-icons/fa";
import { Howl } from "howler";
import { LICK_SOUNDS } from "../constants/assets.js";

function getRandomPosition() {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0,
  );
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
  );
  const left = Math.random() * (vw - 60);
  const top = Math.random() * (vh - 60);
  return { left, top };
}

function EasterEggNote() {
  const [anim, setAnim] = useState(false);
  const [pos, setPos] = useState({ left: 20, top: 20 });

  const handleClick = () => {
    setAnim(true);
    const src = LICK_SOUNDS[Math.floor(Math.random() * LICK_SOUNDS.length)];
    const sound = new Howl({ src: [src], volume: 0.33 });
    sound.play();
    setTimeout(() => setAnim(false), 700);
    setPos(getRandomPosition());
  };

  useEffect(() => {
    setPos(getRandomPosition());
    const onResize = () => setPos(getRandomPosition());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <button
      aria-label="Secret Music Note"
      className="fixed text-blue-300 opacity-20"
      style={{
        fontSize: 22,
        background: "none",
        border: "none",
        cursor: "pointer",
        zIndex: 100,
        left: pos.left,
        top: pos.top,
        transition: "left 0.5s, top 0.5s",
      }}
      onClick={handleClick}
      tabIndex={0}
    >
      <FaMusic
        style={{
          transform: anim
            ? "scale(1.7) rotate(-18deg)"
            : "scale(1) rotate(0deg)",
          transition: "all .45s cubic-bezier(.77,0,.18,1)",
          filter: anim
            ? "drop-shadow(0 0 8px #eebbc3)"
            : "drop-shadow(0 0 0 #fff)",
        }}
      />
      <span className="sr-only">Secret Note</span>
    </button>
  );
}

export default EasterEggNote;
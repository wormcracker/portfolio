import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFileDownload,
  FaYoutube,
} from "react-icons/fa";
import { SOCIALS } from "../constants/data.js";
import cv from "../assets/cv.pdf";

const ICON_MAP = {
  FaGithub: <FaGithub />,
  FaLinkedin: <FaLinkedin />,
  FaEnvelope: <FaEnvelope />,
  FaYoutube: <FaYoutube />,
};

function SocialLinks({ colors }) {
  return (
    <div className="flex gap-5 mt-5 items-center">
      {SOCIALS.map((s, i) => (
        <a
          key={s.label}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-transform hover:scale-110 ${colors.icon} text-xl sm:text-2xl`}
          aria-label={s.label}
          style={{ transform: i === 1 ? "rotate(-8deg)" : undefined }}
        >
          {ICON_MAP[s.icon]}
        </a>
      ))}
      <a
        href={cv}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        aria-label="Download CV"
      >
        <span
          className={`inline-flex items-center justify-center rounded-full border-3 border-[#eebbc3]  ${colors.icon} ${colors.card} shadow-md`}
          style={{
            width: 38,
            height: 38,
            boxShadow: "0 0 0 0 #eebbc3",
            animation: "cv-pulse 0.8s infinite",
            fontSize: 20,
            borderColor: "#eebbc3",
          }}
        >
          <FaFileDownload />
        </span>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-[#eebbc3] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
          CV
        </span>
        <style>
          {`
            @keyframes cv-pulse {
              0% { box-shadow: 0 0 0 0 #eebbc366; }
              70% { box-shadow: 0 0 0 8px #eebbc300; }
              100% { box-shadow: 0 0 0 0 #eebbc300; }
            }
          `}
        </style>
      </a>
    </div>
  );
}

export default SocialLinks;

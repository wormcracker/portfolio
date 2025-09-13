import React, { useState, useEffect } from "react";
import {
  FaSun,
  FaMoon,
  FaEraser,
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaYoutube,
} from "react-icons/fa";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/dancing-script";
import AnimatedSketchyUnderline from "./components/AnimatedSketchyUnderline.jsx";
import SectionDivider from "./components/SectionDivider.jsx";
import SkillTag from "./components/SkillTag.jsx";
import SketchyCard from "./components/SketchyCard.jsx";
import EasterEggNote from "./components/EasterEggNote.jsx";
import SocialLinks from "./components/SocialLinks.jsx";
import { usePencilCursor } from "./hooks/usePencilCursor.js";
import { COLORS } from "./constants/colors.js";
import { PENCIL_SVG, ERASER_SVG } from "./constants/assets.js";
import {
  SOCIALS,
  SKILLS,
  PROJECTS,
  APPROACH_STEPS,
  User,
} from "./constants/data.js";
import ProfileImage from "./components/ProfileImage.jsx";

export default function App() {
  const [theme, setTheme] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );
  const [dividerWidth, setDividerWidth] = useState(320);
  const [eraserActive, setEraserActive] = useState(false);
  const [skills, setSkills] = useState(SKILLS);

  usePencilCursor(eraserActive);

  useEffect(() => {
    function handleResize() {
      setDividerWidth(Math.min(window.innerWidth - 32, 320));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!eraserActive) return;
    function handleEraserClick(e) {
      if (e.target.closest("a")) return;
      if (e.target.closest("h1")) return;
      if (e.target === document.querySelector("#root > div")) return;
      if (e.target.classList && e.target.classList.contains("main-section"))
        return;
      if (e.target.closest("button[aria-label='Secret Music Note']")) return;
      if (e.target.closest("button[aria-label='Eraser tool']")) return;
      if (e.target.closest("button[aria-label='Toggle theme']")) return;
      if (e.target && e.target.parentNode) {
        e.preventDefault();
        e.stopPropagation();
        e.target.parentNode.removeChild(e.target);
      }
    }
    document.addEventListener("click", handleEraserClick, true);
    return () => document.removeEventListener("click", handleEraserClick, true);
  }, [eraserActive]);

  const colors = COLORS[theme];

  return (
    <div
      className={`bg-texture ${colors.bg} min-h-screen transition-colors duration-500 font-interVariable relative overflow-x-hidden`}
      style={{
        fontFamily: "InterVariable, system-ui, sans-serif",
      }}
    >
      <style>
        {`
        .pencil-cursor, .pencil-cursor * {
          cursor: url("data:image/svg+xml;utf8,${PENCIL_SVG}") 8 28, auto !important;
        }
        input, textarea, button, a, select {
          cursor: pointer !important;
        }
        ::-webkit-scrollbar {
          width: 10px;
          background: ${colors.scrollbarTrack};
        }
        ::-webkit-scrollbar-thumb {
          background: ${colors.scrollbar};
          border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme === "dark" ? "#eebbc3" : "#5f6caf"};
        }
        html {
          scrollbar-color: ${colors.scrollbar} ${colors.scrollbarTrack};
          scrollbar-width: thin;
        }
        .bg-texture {
          position: relative;
        }
        .bg-texture::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.06;
          background-image: url("data:image/svg+xml;utf8,<svg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23noiseFilter)'/></svg>");
          background-repeat: repeat;
          background-size: 240px 240px;
        }
        `}
        {eraserActive &&
          `
          body, body * {
            cursor: url("data:image/svg+xml;utf8,${ERASER_SVG}") 8 28, auto !important;
          }
          input, textarea, button, a, select {
            cursor: pointer !important;
          }
        `}
      </style>

      <div className="fixed top-5 right-5 z-50 flex gap-3">
        <button
          aria-label="Toggle theme"
          className={`rounded-full p-2 shadow-lg transition-colors duration-300 ${colors.card} border ${colors.border}`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <FaMoon className={`${colors.icon} text-xl`} />
          ) : (
            <FaSun className={`${colors.icon} text-xl`} />
          )}
        </button>
      </div>

      <EasterEggNote />

      <header className="flex flex-col items-center justify-center pt-12 pb-10 relative z-10">
        <div className="relative" style={{ width: 144, height: 144 }}>
          <ProfileImage />
          <FaEraser
            className={`absolute sm:-bottom-5 bottom-8 -right-5 text-md text-[#eebbc3] opacity-30 rotate-[18deg]`}
            onClick={() => setEraserActive((v) => !v)}
            aria-label="Eraser tool"
          />
        </div>
        <h1
          className={`sm:mt-10 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${colors.text} font-dancing-script`}
          style={{
            fontFamily: "'Dancing Script', cursive",
            letterSpacing: "0.04em",
            userSelect: "none",
            cursor: "pointer",
          }}
        >
          {User.name}
        </h1>
        <div className="relative flex justify-center items-center w-full">
          <AnimatedSketchyUnderline
            color="#eebbc3"
            width={100}
            className="mx-auto"
          />
        </div>
        <p
          className={`mt-3 text-base sm:text-lg max-w-xl text-center ${colors.text} font-jetbrainsMonoVariable`}
          style={{
            fontFamily: "JetBrainsMonoVariable, monospace",
          }}
        >
          {User.desc}
          <br />
          <span className="opacity-70 text-xs sm:text-sm">
            {User.extraDesc}
          </span>
        </p>
        <SocialLinks colors={colors} />
      </header>

      <div className="flex justify-center">
        <SectionDivider
          color={colors.note.replace("text-", "#")}
          width={dividerWidth}
        />
      </div>

      <section className="main-section flex flex-col items-center relative z-10">
        <SketchyCard
          className={`w-full max-w-2xl shadow-xl p-4 sm:p-6 mb-8 ${colors.card} ${colors.border}`}
          rotate={-3}
          perspective
        >
          <h2
            className={`text-lg sm:text-xl font-semibold mb-3 ${colors.accent} font-interVariable relative flex items-center gap-2`}
          >
            My Toolbox
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.map((skill, i) => (
              <SkillTag
                key={skill}
                className={`px-2 sm:px-3 py-1 rounded-full hover:scale-[1.03] text-xs sm:text-sm font-medium shadow-sm border ${colors.border} ${colors.text} bg-opacity-60`}
                style={{
                  background:
                    theme === "light"
                      ? "rgba(191, 219, 254, 0.25)"
                      : "rgba(94, 129, 172, 0.18)",
                  transform: i % 2 === 0 ? "rotate(-2deg)" : "rotate(2deg)",
                  marginBottom: 2,
                }}
                erasable={eraserActive}
                onErase={() => {
                  if (eraserActive)
                    setSkills(skills.filter((s) => s !== skill));
                }}
              >
                {skill}
              </SkillTag>
            ))}
          </div>
        </SketchyCard>
      </section>

      <div className="flex justify-center">
        <SectionDivider
          color={colors.note.replace("text-", "#")}
          width={dividerWidth}
        />
      </div>

      <section className="main-section flex flex-col items-center relative z-10">
        <div className="w-full max-w-3xl mb-8">
          <SketchyCard
            className={`shadow-xl p-4 sm:p-5 ${colors.card} ${colors.border}`}
            rotate={2}
            perspective
          >
            <h2
              className={`text-lg sm:text-xl font-semibold mb-3 ${colors.accent} font-interVariable relative flex items-center gap-2`}
            >
              How I Approach Projects
            </h2>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-0">
              {APPROACH_STEPS.map((step, idx) => (
                <div
                  key={step.title}
                  className={`flex-1 flex flex-col items-center md:px-2`}
                  style={{
                    transform: idx % 2 === 0 ? "rotate(-2deg)" : "rotate(2deg)",
                  }}
                >
                  <div
                    className={`font-bold text-xs sm:text-sm ${colors.text}`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`text-xs text-center ${colors.text} opacity-80`}
                  >
                    {step.desc}
                  </div>
                  {idx < APPROACH_STEPS.length - 1 && (
                    <div
                      className={`hidden md:block h-1 w-full bg-gradient-to-r from-[#b8c1ec] to-[#eebbc3] opacity-30 my-2`}
                    ></div>
                  )}
                  {idx < APPROACH_STEPS.length - 1 && (
                    <div
                      className={`md:hidden w-1 h-4 bg-gradient-to-b from-[#b8c1ec] to-[#eebbc3] opacity-30 my-1`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </SketchyCard>
        </div>
      </section>

      <div className="flex justify-center">
        <SectionDivider
          color={colors.note.replace("text-", "#")}
          width={dividerWidth}
        />
      </div>

      <section className="main-section flex flex-col items-center relative z-10">
        <div className="w-full max-w-3xl">
          <SketchyCard
            className={`shadow-xl p-4 sm:p-6 ${colors.card} ${colors.border}`}
            rotate={-4}
            perspective
            tilt
          >
            <h2
              className={`text-lg sm:text-xl font-semibold mb-3 ${colors.accent} font-interVariable relative flex items-center gap-2`}
            >
              Projects
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {PROJECTS.map((proj, i) => (
                <div
                  key={proj.title}
                  className={`rounded-xl p-3 sm:p-4 border ${colors.border} shadow-md transition-transform hover:scale-[1.03]`}
                  style={{
                    transform: i % 2 === 0 ? "rotate(-2deg)" : "rotate(2deg)",
                  }}
                  tabIndex={0}
                >
                  <h3
                    className={`font-bold text-sm sm:text-base mb-1 ${colors.text}`}
                  >
                    {proj.title}
                  </h3>
                  <p className={`text-xs mb-2 ${colors.text}`}>{proj.desc}</p>
                  <a
                    href={proj.url}
                    className={`inline-block mt-1 text-xs font-semibold underline ${colors.accent} hover:opacity-80`}
                    target="_blank"
                  >
                    View Project
                  </a>
                  <p
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm border ${colors.border} ${colors.text} absolute top-2 right-2`}
                  >
                    {proj.status}
                  </p>
                </div>
              ))}
            </div>
          </SketchyCard>
        </div>
      </section>

      <div className="flex justify-center">
        <SectionDivider
          color={colors.note.replace("text-", "#")}
          width={dividerWidth}
        />
      </div>

      <section className="main-section flex flex-col items-center relative z-10">
        <SketchyCard
          className={`w-full max-w-xl shadow-xl p-4 sm:p-6 mt-8 flex flex-col items-center ${colors.card} ${colors.border}`}
          rotate={3}
          perspective
        >
          <h2
            className={`text-lg sm:text-xl font-semibold mb-2 ${colors.accent} font-interVariable relative flex items-center gap-2`}
          >
            Contact
          </h2>
          <p className={`mb-3 text-center ${colors.text} text-xs sm:text-sm`}>
            Let's connect! Reach out via email or any of my socials below.
          </p>
          <a
            href={User.mail}
            className={`mb-2 text-base font-semibold ${colors.accent} hover:opacity-80`}
          >
            {User.mail.slice(7)}
          </a>
          <div className="flex gap-5 mt-2">
            {SOCIALS.map((s, i) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-transform hover:scale-110 ${colors.icon} text-xl sm:text-2xl`}
                aria-label={s.label}
                style={{ transform: i === 2 ? "rotate(-8deg)" : undefined }}
              >
                {s.icon &&
                  {
                    FaGithub: <FaGithub />,
                    FaLinkedin: <FaLinkedinIn />,
                    FaEnvelope: <FaEnvelope />,
                    FaYoutube: <FaYoutube />,
                  }[s.icon]}
              </a>
            ))}
          </div>
        </SketchyCard>
      </section>

      <footer className="mt-4 mb-4 flex flex-col items-center opacity-40 relative z-10">
        <div className={` text-xs ${colors.text}`}>
          &copy; {new Date().getFullYear()} sushant
        </div>
      </footer>
    </div>
  );
}


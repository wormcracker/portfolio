const AnimatedSketchyUnderline = ({
  color = "#eebbc3",
  width = 120,
  duration = 1.2,
  className = "",
}) => (
  <svg
    width={width}
    height="12"
    viewBox={`0 0 ${width} 12`}
    fill="none"
    className={className}
  >
    <path
      d={`M2 8 Q${width / 4} 2, ${width / 2} 8 T${width - 2} 8`}
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{
        strokeDasharray: 300,
        strokeDashoffset: 300,
        animation: `draw-underline ${duration}s cubic-bezier(.77,0,.18,1) forwards`,
      }}
    />
    <style>
      {`
        @keyframes draw-underline {
          to { stroke-dashoffset: 0; }
        }
      `}
    </style>
  </svg>
);

export default AnimatedSketchyUnderline;

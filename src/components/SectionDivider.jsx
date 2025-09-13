const SectionDivider = ({ color = "#b8c1ec", width = 320, className = "" }) => (
  <svg
    width={width}
    height="18"
    viewBox={`0 0 ${width} 18`}
    fill="none"
    className={className}
  >
    <path
      d={`M4 10 Q${width / 4} 2, ${width / 2} 12 T${width - 4} 10`}
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{
        strokeDasharray: 400,
        strokeDashoffset: 400,
        animation: `draw-divider 1.5s cubic-bezier(.77,0,.18,1) forwards`,
      }}
    />
    <style>
      {`
        @keyframes draw-divider {
          to { stroke-dashoffset: 0; }
        }
      `}
    </style>
  </svg>
);

export default SectionDivider;

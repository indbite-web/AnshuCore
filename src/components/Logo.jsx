import React, { useId } from 'react';

/**
 * Official AnshuCore SVG Logo Component
 * Renders the complete 'A' symbol with Left Leg, Right Leg, Center Blend, and Sparkle.
 */
export function Logo({
  size = 40,
  showText = true,
  className = '',
  animated = false,
  textClassName = 'text-xl font-bold tracking-tight text-white'
}) {
  const instanceId = useId().replace(/:/g, '');
  const leftLegGradId = `leftLegGrad_${instanceId}`;
  const rightLegGradId = `rightLegGrad_${instanceId}`;
  const centerGlowGradId = `centerGlowGrad_${instanceId}`;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="AnshuCore Official Logo"
          role="img"
          className={`transition-transform duration-300 ${animated ? 'logo-glow-pulse' : ''}`}
        >
          <defs>
            {/* Left Leg Gradient: Deep Purple to Blue */}
            <linearGradient
              id={leftLegGradId}
              x1="220"
              y1="540"
              x2="420"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#581C87" />
              <stop offset="30%" stopColor="#7C3AED" />
              <stop offset="70%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>

            {/* Right Leg Gradient: Royal Blue to Electric Cyan */}
            <linearGradient
              id={rightLegGradId}
              x1="380"
              y1="200"
              x2="560"
              y2="540"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#1D4ED8" />
              <stop offset="40%" stopColor="#2563EB" />
              <stop offset="80%" stopColor="#0080FF" />
              <stop offset="100%" stopColor="#00A3FF" />
            </linearGradient>

            {/* Center Overlap Glow Gradient */}
            <linearGradient
              id={centerGlowGradId}
              x1="340"
              y1="340"
              x2="460"
              y2="440"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
          </defs>

          {/* Main 'A' Logo Symbol */}
          <g id="logo-mark">
            {/* Left Leg (Purple -> Blue) */}
            <path
              d="M 270 515 L 400 245"
              stroke={`url(#${leftLegGradId})`}
              strokeWidth="116"
              strokeLinecap="round"
              className={animated ? 'animate-stroke-draw' : ''}
            />

            {/* Right Leg (Blue -> Cyan) */}
            <path
              d="M 400 245 L 530 515"
              stroke={`url(#${rightLegGradId})`}
              strokeWidth="116"
              strokeLinecap="round"
              className={animated ? 'animate-stroke-draw' : ''}
            />

            {/* Center Inner Translucent Blend */}
            <path
              d="M 335 435 Q 400 325 465 435 Q 400 395 335 435 Z"
              fill={`url(#${centerGlowGradId})`}
              opacity="0.8"
              className={animated ? 'animate-fade-scale' : ''}
            />

            {/* Sparkle Star Icon */}
            <path
              d="M 585 215 Q 585 250 620 250 Q 585 250 585 285 Q 585 250 550 250 Q 585 250 585 215 Z"
              fill="#1D4ED8"
              className={animated ? 'animate-sparkle-pulse' : ''}
            />
          </g>
        </svg>
      </div>

      {showText && (
        <span className={textClassName}>
          Anshu<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Core</span>
        </span>
      )}
    </div>
  );
}

export default Logo;

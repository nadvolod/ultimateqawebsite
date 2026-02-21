'use client'

import { useReducedMotion } from 'framer-motion'

export function OrbitalBackground() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Orbit ring gradients */}
          <linearGradient id="ring-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2ea3f2" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#2ea3f2" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2ea3f2" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="ring-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#003c96" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#003c96" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#003c96" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="ring-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8c3cf9" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#8c3cf9" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8c3cf9" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Orbit ring 1 — innermost */}
        <ellipse
          cx="400" cy="300"
          rx="120" ry="48"
          stroke="url(#ring-gradient-1)"
          strokeWidth="1"
          fill="none"
        />
        {/* Orbit ring 2 */}
        <ellipse
          cx="400" cy="300"
          rx="200" ry="80"
          stroke="url(#ring-gradient-2)"
          strokeWidth="1"
          fill="none"
        />
        {/* Orbit ring 3 — outermost */}
        <ellipse
          cx="400" cy="300"
          rx="290" ry="116"
          stroke="url(#ring-gradient-3)"
          strokeWidth="1"
          fill="none"
        />

        {/* Central glow */}
        <circle cx="400" cy="300" r="3" fill="#2ea3f2" fillOpacity="0.5" />
        <circle cx="400" cy="300" r="12" fill="#2ea3f2" fillOpacity="0.05" />

        {/* Orbiting node 1 — inner ring, slow */}
        <g style={{ transformOrigin: '400px 300px' }} className="animate-orbit-slow">
          <circle cx="520" cy="300" r="3" fill="#2ea3f2" fillOpacity="0.8" />
        </g>

        {/* Orbiting node 2 — inner ring, offset */}
        <g style={{ transformOrigin: '400px 300px', animationDelay: '-10s' }} className="animate-orbit-slow">
          <circle cx="280" cy="300" r="2" fill="#2ea3f2" fillOpacity="0.5" />
        </g>

        {/* Orbiting node 3 — middle ring */}
        <g style={{ transformOrigin: '400px 300px' }} className="animate-orbit-medium">
          <circle cx="600" cy="300" r="3.5" fill="#2ea3f2" fillOpacity="0.7" />
        </g>

        {/* Orbiting node 4 — middle ring, offset */}
        <g style={{ transformOrigin: '400px 300px', animationDelay: '-7s' }} className="animate-orbit-medium">
          <circle cx="200" cy="300" r="2.5" fill="#003c96" fillOpacity="0.6" />
        </g>

        {/* Orbiting node 5 — outer ring */}
        <g style={{ transformOrigin: '400px 300px' }} className="animate-orbit-fast">
          <circle cx="690" cy="300" r="4" fill="#2ea3f2" fillOpacity="0.6" />
        </g>

        {/* Orbiting node 6 — outer ring, offset */}
        <g style={{ transformOrigin: '400px 300px', animationDelay: '-4.5s' }} className="animate-orbit-fast">
          <circle cx="110" cy="300" r="2" fill="#8c3cf9" fillOpacity="0.5" />
        </g>
      </svg>
    </div>
  )
}

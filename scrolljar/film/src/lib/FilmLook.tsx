import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {hash} from './anim';

// The projected-print look laid over every shot: gate weave, lamp flicker, grain, dust, scratches, vignette.
// The flicker stays under 6% brightness, so it never counts as a flash (WCAG 2.3.1).
export const FilmLook: React.FC<{children: React.ReactNode; seed?: number}> = ({children, seed = 0}) => {
  const f = useCurrentFrame() + seed * 1000;
  // gate weave: a slow drift plus a small jolt now and then
  const wx = Math.sin(f / 9.3) * 0.9 + (hash(f, 1) - 0.5) * 1.2;
  const wy = Math.sin(f / 6.1 + 1) * 1.1 + (hash(f, 2) - 0.5) * 1.6 + (hash(Math.floor(f / 30), 9) > 0.8 ? 1.5 : 0);
  const flicker = 0.02 + hash(f, 3) * 0.04;
  const g = Math.floor(hash(f, 4) * 8);
  const gx = -Math.floor(hash(f, 5) * 60);
  const gy = -Math.floor(hash(f, 6) * 40);

  // dust: a speck or two on some frames, each for a single frame
  const specks = [0, 1, 2]
    .filter((i) => hash(f, 10 + i) > 0.72)
    .map((i) => ({
      x: hash(f, 20 + i) * 1920,
      y: hash(f, 30 + i) * 1080,
      r: 1.5 + hash(f, 40 + i) * 3.5,
      dark: hash(f, 50 + i) > 0.35,
      rx: 0.6 + hash(f, 60 + i) * 0.8,
    }));
  // a hair caught in the gate, for a few frames at a time
  const hairOn = hash(Math.floor(f / 5), 70) > 0.88;
  const hx = hash(Math.floor(f / 5), 71) * 1700 + 100;
  const hy = hash(Math.floor(f / 5), 72) * 800 + 100;
  // a vertical scratch that runs for a stretch, drifting a little
  const run = Math.floor(f / 40);
  const scratchOn = hash(run, 80) > 0.55;
  const sx = hash(run, 81) * 1500 + 200 + Math.sin(f / 3) * 3;

  return (
    <AbsoluteFill style={{backgroundColor: '#0c0b0a', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `translate(${wx}px, ${wy}px) scale(1.012)`, filter: 'blur(0.55px) contrast(1.04)'}}>
        {children}
      </AbsoluteFill>
      <Img
        src={staticFile(`grain/g${g}.png`)}
        style={{
          position: 'absolute',
          left: gx,
          top: gy,
          width: 1990,
          height: 1120,
          mixBlendMode: 'overlay',
          opacity: 0.32,
          imageRendering: 'auto',
        }}
      />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {specks.map((s, i) => (
          <ellipse key={i} cx={s.x} cy={s.y} rx={s.r * s.rx} ry={s.r} fill={s.dark ? '#0d0c0b' : '#f6f3ea'} opacity={0.75} />
        ))}
        {hairOn && (
          <path
            d={`M${hx} ${hy} q30 -18 52 6 t40 20 q18 4 30 -12`}
            stroke="#0d0c0b"
            strokeWidth={1.6}
            fill="none"
            opacity={0.6}
          />
        )}
        {scratchOn && <path d={`M${sx} 0 L${sx + 6} 1080`} stroke="#f2efe6" strokeWidth={1.4} opacity={0.32} />}
        <defs>
          <radialGradient id="vig" cx="50%" cy="46%" r="75%">
            <stop offset="0.55" stopColor="#000" stopOpacity={0} />
            <stop offset="0.85" stopColor="#000" stopOpacity={0.32} />
            <stop offset="1" stopColor="#000" stopOpacity={0.62} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="url(#vig)" />
        <rect width={1920} height={1080} fill="#000" opacity={flicker} />
      </svg>
    </AbsoluteFill>
  );
};

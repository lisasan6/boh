import React, {useId} from 'react';
import {INK, WHITE, OL, Pt} from './toon';

// The hand-drawn look: lines wobble a little and shift from drawing to drawing (they "boil", on twos),
// and every grey picks up a charcoal-on-paper grain. Keep mint light outside this wrapper so it stays clean.
export const Sketch: React.FC<{t: number; wobble?: number; children: React.ReactNode}> = ({t, wobble = 2.6, children}) => {
  const id = useId().replace(/:/g, '');
  const seed = Math.floor(t / 2) % 5;
  return (
    <g>
      <defs>
        <filter id={`sk${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.026" numOctaves={2} seed={seed} result="wob" />
          <feDisplacementMap in="SourceGraphic" in2="wob" scale={wobble * 2} xChannelSelector="R" yChannelSelector="G" result="drawn" />
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} seed={11} result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0.55 0.55 0 0 0.3  0.55 0.55 0 0 0.3  0.55 0.55 0 0 0.3  0 0 0 0 1"
            result="grainG"
          />
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.32" numOctaves={2} seed={7} result="streak" />
          <feColorMatrix
            in="streak"
            type="matrix"
            values="0.35 0.35 0 0 0.62  0.35 0.35 0 0 0.62  0.35 0.35 0 0 0.62  0 0 0 0 1"
            result="streakG"
          />
          <feBlend in="drawn" in2="grainG" mode="multiply" result="g1" />
          <feBlend in="g1" in2="streakG" mode="multiply" result="g2" />
          <feComposite in="g2" in2="drawn" operator="in" />
        </filter>
      </defs>
      <g filter={`url(#sk${id})`}>{children}</g>
    </g>
  );
};

// A natural almond eye: iris and pupil, a heavy upper lid line, a crease, a few lashes.
export const RealEye: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  look?: Pt; // -1..1
  lid?: number; // 0 open .. 1 shut
  lidFill: string;
  side: 'l' | 'r';
  lashes?: boolean;
  iris?: string;
}> = ({x, y, w, h, look = [0, 0], lid = 0.15, lidFill, side, lashes = true, iris = '#5a5651'}) => {
  const id = useId().replace(/:/g, '');
  const hw = w / 2;
  const sx = side === 'r' ? 1 : -1;
  // inner corner a little lower than the outer one
  const inner: Pt = [x - sx * hw, y + h * 0.12];
  const outer: Pt = [x + sx * hw, y - h * 0.08];
  const L = side === 'r' ? inner : outer;
  const R = side === 'r' ? outer : inner;
  const almond = `M${L[0]} ${L[1]} Q${x} ${y - h * 1.15} ${R[0]} ${R[1]} Q${x} ${y + h * 0.95} ${L[0]} ${L[1]} Z`;
  const ir = h * 0.62;
  const ix = x + look[0] * hw * 0.42;
  const iy = y + look[1] * h * 0.3;
  const lidY = y - h * 0.62 + h * 1.4 * Math.min(Math.max(lid, 0), 0.95);
  const lidLine = `M${L[0]} ${L[1]} Q${x} ${Math.min(lidY + h * 0.05, y + h * 0.5) - h * 0.5 * (1 - lid)} ${R[0]} ${R[1]}`;
  return (
    <g>
      <defs>
        <clipPath id={`re${id}`}>
          <path d={almond} />
        </clipPath>
      </defs>
      <path d={almond} fill={WHITE} />
      <g clipPath={`url(#re${id})`}>
        <circle cx={ix} cy={iy} r={ir} fill={iris} stroke={INK} strokeWidth={2} />
        <circle cx={ix} cy={iy} r={ir * 0.5} fill={INK} />
        <circle cx={ix - ir * 0.32} cy={iy - ir * 0.32} r={ir * 0.22} fill={WHITE} />
        <rect x={x - hw - 4} y={y - h * 1.5} width={w + 8} height={lidY - (y - h * 1.5)} fill={lidFill} />
      </g>
      {/* upper lid: a heavy ink line, thicker toward the outer corner */}
      <path d={lidLine} stroke={INK} strokeWidth={OL * 1.5} fill="none" strokeLinecap="round" />
      <path d={`M${L[0]} ${L[1]} Q${x} ${y + h * 0.95} ${R[0]} ${R[1]}`} stroke={INK} strokeWidth={OL * 0.55} fill="none" strokeLinecap="round" />
      {/* the crease above the lid */}
      <path
        d={`M${x - hw * 0.7} ${Math.min(lidY, y) - h * 0.55} Q${x} ${Math.min(lidY, y) - h * 0.95} ${x + hw * 0.75} ${Math.min(lidY, y) - h * 0.6}`}
        stroke={INK}
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
        opacity={0.8}
      />
      {lashes && (
        <g stroke={INK} strokeWidth={2.6} strokeLinecap="round" fill="none">
          {[0.55, 0.78, 1].map((f, i) => {
            const bx = x + sx * hw * f * 0.95;
            const by = (side === 'r' ? outer : outer)[1] + (1 - f) * -h * 0.25 + (lid > 0.4 ? h * lid * 0.5 : 0);
            return <path key={i} d={`M${bx} ${by} q${sx * 8} -${4 + i * 2} ${sx * (12 + i * 3)} -${2 + i * 4}`} />;
          })}
        </g>
      )}
    </g>
  );
};

import React, {useId} from 'react';

// ---------- palette: black, white and painted greys; the phone screen is the only colour ----------
export const INK = '#161514';
export const WHITE = '#F4F2EC';
export const G1 = '#E3E0D9';
export const G2 = '#CBC7BF';
export const G3 = '#ADA89F';
export const G4 = '#8E8981';
export const G5 = '#706B65';
export const G6 = '#524F4A';
export const G7 = '#383633';
export const G8 = '#242321';
export const MINT = '#3CF0CB';
export const MINT_DEEP = '#1FB89A';
export const MINT_PALE = '#B4FFEE';

// skin, as greys
export const SKIN_LIGHT = '#E8E3D9';
export const SKIN_FAIR = '#D9D2C6';
export const SKIN_MED = '#BDB4A6';
export const SKIN_TAN = '#A69D90';
export const SKIN_DEEP = '#857D72';

export const OL = 4; // the ink line: thin and even everywhere

export type Pt = [number, number];

// ---------- inked shapes: every outline merges into one silhouette ----------
export type Shape =
  | {k: 'c'; cx: number; cy: number; r: number}
  | {k: 'e'; cx: number; cy: number; rx: number; ry: number; rot?: number}
  | {k: 'p'; d: string}
  | {k: 't'; d: string; w: number} // a tube: a stroked path
  | {k: 'r'; x: number; y: number; w: number; h: number; rx?: number};

const renderShape = (s: Shape, i: number, fill: string, outline: boolean) => {
  const sw = outline ? OL * 2 : 0;
  const common = outline
    ? {fill: INK, stroke: INK, strokeWidth: sw, strokeLinejoin: 'round' as const}
    : {fill};
  switch (s.k) {
    case 'c':
      return <circle key={i} cx={s.cx} cy={s.cy} r={s.r} {...common} />;
    case 'e':
      return (
        <ellipse
          key={i}
          cx={s.cx}
          cy={s.cy}
          rx={s.rx}
          ry={s.ry}
          transform={s.rot ? `rotate(${s.rot} ${s.cx} ${s.cy})` : undefined}
          {...common}
        />
      );
    case 'p':
      return <path key={i} d={s.d} {...common} />;
    case 'r':
      return <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx ?? 0} {...common} />;
    case 't':
      return (
        <path
          key={i}
          d={s.d}
          fill="none"
          stroke={outline ? INK : fill}
          strokeWidth={s.w + sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
  }
};

export const Inked: React.FC<{shapes: Shape[]; fill: string; noOutline?: boolean}> = ({
  shapes,
  fill,
  noOutline,
}) => (
  <g>
    {!noOutline && shapes.map((s, i) => renderShape(s, i, fill, true))}
    {shapes.map((s, i) => renderShape(s, i, fill, false))}
  </g>
);

// ---------- rubber-hose limbs ----------
export const hosePath = (a: Pt, b: Pt, bend = 0) => {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M${a[0]} ${a[1]} Q${cx} ${cy} ${b[0]} ${b[1]}`;
};

export const Hose: React.FC<{a: Pt; b: Pt; bend?: number; w: number; fill: string}> = ({
  a,
  b,
  bend = 0,
  w,
  fill,
}) => <Inked fill={fill} shapes={[{k: 't', d: hosePath(a, b, bend), w}]} />;

// ---------- hands: four fingers (three and a thumb), bare ----------
export type HandPose = 'open' | 'fist' | 'point' | 'grip' | 'flat';
export const Hand: React.FC<{
  x: number;
  y: number;
  rot?: number; // degrees; 0 = fingers point to +x
  s?: number;
  fill: string;
  pose?: HandPose;
  flip?: boolean; // mirror for the other hand
}> = ({x, y, rot = 0, s = 1, fill, pose = 'open', flip}) => {
  const fingers: Shape[] = [];
  const palm: Shape = {k: 'e', cx: 13, cy: 0, rx: 15, ry: 13};
  if (pose === 'open' || pose === 'flat') {
    const spread = pose === 'open' ? 1 : 0.35;
    [-28, 0, 28].forEach((a) => {
      const r = (a * spread * Math.PI) / 180;
      const x1 = 20 + Math.cos(r) * 6;
      const y1 = Math.sin(r) * 6;
      fingers.push({k: 't', d: `M${x1} ${y1} L${x1 + Math.cos(r) * 17} ${y1 + Math.sin(r) * 17}`, w: 9});
    });
    fingers.push({k: 't', d: `M10 -8 L${pose === 'open' ? 6 : 12} -24`, w: 9});
  } else if (pose === 'point') {
    fingers.push({k: 't', d: 'M22 -6 L44 -9', w: 9});
    fingers.push({k: 't', d: 'M12 -9 L20 -19', w: 9});
  } else if (pose === 'grip') {
    fingers.push({k: 't', d: 'M8 -9 L18 -22', w: 9}); // the thumb, over the front
  }
  const lines =
    pose === 'fist' || pose === 'point' || pose === 'grip' ? (
      <g stroke={INK} strokeWidth={OL * 0.7} strokeLinecap="round" fill="none">
        <path d="M24 -2 Q28 0 27 4" />
        <path d="M22 5 Q26 7 24 10" />
      </g>
    ) : null;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s} ${flip ? -s : s})`}>
      <Inked fill={fill} shapes={[palm, ...fingers]} />
      {lines}
    </g>
  );
};

// ---------- eyes: big whites, black pie-cut pupils ----------
export const Eye: React.FC<{
  x: number;
  y: number;
  rx: number;
  ry: number;
  look?: Pt; // -1..1
  lid?: number; // 0 open .. 1 shut
  lidFill: string;
  pupil?: number; // size, 1 = normal
  lashes?: 'l' | 'r';
  lower?: number; // a lower lid, for a tired eye: 0..0.5
}> = ({x, y, rx, ry, look = [0, 0], lid = 0, lidFill, pupil = 1, lashes, lower = 0}) => {
  const id = useId().replace(/:/g, '');
  const prx = rx * 0.5 * pupil;
  const pry = ry * 0.58 * pupil;
  const px = x + look[0] * (rx - prx * 0.9);
  const py = y + look[1] * (ry - pry * 0.9);
  const ly = y - ry + 2 * ry * lid;
  const lowY = y + ry - 2 * ry * lower;
  // the pie cut: a wedge out of the upper right of the pupil
  const wa = (-70 * Math.PI) / 180;
  const wb = (-22 * Math.PI) / 180;
  const cx = px + prx * 0.12;
  const cy = py - pry * 0.1;
  return (
    <g>
      <defs>
        <clipPath id={`e${id}`}>
          <ellipse cx={x} cy={y} rx={rx} ry={ry} />
        </clipPath>
      </defs>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={WHITE} />
      <g clipPath={`url(#e${id})`}>
        <ellipse cx={px} cy={py} rx={prx} ry={pry} fill={INK} />
        <path
          d={`M${cx} ${cy} L${cx + Math.cos(wa) * prx * 1.6} ${cy + Math.sin(wa) * pry * 1.6} L${
            cx + Math.cos(wb) * prx * 1.6
          } ${cy + Math.sin(wb) * pry * 1.6} Z`}
          fill={WHITE}
        />
        {lid > 0.01 && (
          <>
            <rect x={x - rx - 4} y={y - ry - 4} width={rx * 2 + 8} height={ly - (y - ry) + 4} fill={lidFill} />
            <path
              d={`M${x - rx - 2} ${ly + 2} Q${x} ${ly + ry * 0.22} ${x + rx + 2} ${ly + 2}`}
              stroke={INK}
              strokeWidth={OL}
              fill="none"
            />
          </>
        )}
        {lower > 0.01 && (
          <>
            <rect x={x - rx - 4} y={lowY} width={rx * 2 + 8} height={ry * 2} fill={lidFill} />
            <path
              d={`M${x - rx - 2} ${lowY} Q${x} ${lowY - ry * 0.15} ${x + rx + 2} ${lowY}`}
              stroke={INK}
              strokeWidth={OL * 0.8}
              fill="none"
            />
          </>
        )}
      </g>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={INK} strokeWidth={OL} />
      {lashes && (
        <g stroke={INK} strokeWidth={OL} strokeLinecap="round">
          {(() => {
            const sx = lashes === 'r' ? 1 : -1;
            const bx = x + sx * rx * 0.72;
            const by = Math.max(ly, y - ry) + ry * 0.12;
            return (
              <>
                <path d={`M${bx} ${by} l${sx * 13} -9`} />
                <path d={`M${bx - sx * 7} ${by - 6} l${sx * 9} -11`} />
              </>
            );
          })()}
        </g>
      )}
    </g>
  );
};

export const Brow: React.FC<{x: number; y: number; w: number; tilt?: number; arch?: number; thick?: number}> = ({
  x,
  y,
  w,
  tilt = 0,
  arch = 6,
  thick = OL * 1.6,
}) => (
  <path
    d={`M${x - w / 2} ${y + tilt} Q${x} ${y - arch} ${x + w / 2} ${y - tilt}`}
    stroke={INK}
    strokeWidth={thick}
    strokeLinecap="round"
    fill="none"
  />
);

// smile: >0 curves up (a grin), <0 a frown. open: 0 shut .. 1 wide open
export const Mouth: React.FC<{x: number; y: number; w: number; smile?: number; open?: number; rot?: number}> = ({
  x,
  y,
  w,
  smile = 0.3,
  open = 0,
  rot = 0,
}) => {
  const h = w / 2;
  const top = `M${x - h} ${y} Q${x} ${y + smile * w * 0.6} ${x + h} ${y}`;
  const t = rot ? `rotate(${rot} ${x} ${y})` : undefined;
  if (open < 0.05) {
    return (
      <g transform={t}>
        <path d={top} stroke={INK} strokeWidth={OL} strokeLinecap="round" fill="none" />
        <path d={`M${x - h - 3} ${y - 4 + smile * 6} q4 3 6 0`} stroke={INK} strokeWidth={OL * 0.7} fill="none" strokeLinecap="round" opacity={smile > 0.2 ? 1 : 0} />
        <path d={`M${x + h + 3} ${y - 4 + smile * 6} q-4 3 -6 0`} stroke={INK} strokeWidth={OL * 0.7} fill="none" strokeLinecap="round" opacity={smile > 0.2 ? 1 : 0} />
      </g>
    );
  }
  const depth = open * w * 0.9 + Math.max(0, smile) * w * 0.3;
  const shape = `M${x - h} ${y} Q${x} ${y + smile * w * 0.35} ${x + h} ${y} Q${x + h * 0.7} ${y + depth} ${x} ${
    y + depth
  } Q${x - h * 0.7} ${y + depth} ${x - h} ${y} Z`;
  return (
    <g transform={t}>
      <path d={shape} fill={G8} stroke={INK} strokeWidth={OL} strokeLinejoin="round" />
      <ellipse cx={x} cy={y + depth * 0.78} rx={h * 0.45} ry={depth * 0.22} fill={G5} />
    </g>
  );
};

// ---------- the phone, and the mint light it throws ----------
export const Phone: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  rot?: number;
  scroll?: number; // frames, moves the feed
  skew?: number; // for a phone seen at an angle
  back?: boolean; // seen from behind: a dark slab with only a mint rim
}> = ({x, y, w = 44, h = 80, rot = 0, scroll = 0, skew = 0, back}) => {
  const id = useId().replace(/:/g, '');
  const sx = -w / 2 + 4;
  const sy = -h / 2 + 7;
  const sw = w - 8;
  const sh = h - 14;
  const off = (scroll * 1.6) % 26;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) skewX(${skew})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={7} fill={G8} stroke={INK} strokeWidth={OL} />
      {back ? (
        <rect x={-w / 2 + 3} y={-h / 2 + 3} width={w - 6} height={h - 6} rx={5} fill="none" stroke={MINT} strokeOpacity={0.35} strokeWidth={2} />
      ) : (
        <>
          <defs>
            <clipPath id={`p${id}`}>
              <rect x={sx} y={sy} width={sw} height={sh} rx={2} />
            </clipPath>
          </defs>
          <rect x={sx} y={sy} width={sw} height={sh} rx={2} fill={MINT} />
          <g clipPath={`url(#p${id})`} fill={MINT_DEEP} opacity={0.55}>
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(0 ${sy + i * 26 - off})`}>
                <rect x={sx + 4} y={4} width={sw - 8} height={12} rx={2} />
                <rect x={sx + 4} y={19} width={(sw - 8) * 0.6} height={3} rx={1.5} />
              </g>
            ))}
          </g>
          <rect x={sx} y={sy} width={sw} height={sh} rx={2} fill="url(#none)" stroke={MINT_PALE} strokeOpacity={0.5} strokeWidth={1.5} />
        </>
      )}
    </g>
  );
};

// a soft pool of mint light, laid over whatever it falls on
export const MintLight: React.FC<{cx: number; cy: number; rx: number; ry?: number; o?: number}> = ({
  cx,
  cy,
  rx,
  ry,
  o = 0.5,
}) => {
  const id = useId().replace(/:/g, '');
  return (
    <g style={{mixBlendMode: 'screen'}} opacity={o}>
      <defs>
        <radialGradient id={`m${id}`}>
          <stop offset="0" stopColor={MINT} stopOpacity={0.9} />
          <stop offset="0.45" stopColor={MINT} stopOpacity={0.35} />
          <stop offset="1" stopColor={MINT} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry ?? rx} fill={`url(#m${id})`} />
    </g>
  );
};

// ---------- airbrush helpers ----------
export const Blur: React.FC<{r: number; children: React.ReactNode; o?: number}> = ({r, children, o = 1}) => {
  const id = useId().replace(/:/g, '');
  return (
    <g opacity={o}>
      <defs>
        <filter id={`b${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={r} />
        </filter>
      </defs>
      <g filter={`url(#b${id})`}>{children}</g>
    </g>
  );
};

export const Shadow: React.FC<{cx: number; cy: number; rx: number; ry: number; o?: number}> = ({
  cx,
  cy,
  rx,
  ry,
  o = 0.35,
}) => (
  <Blur r={Math.max(4, ry * 0.4)} o={o}>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={INK} />
  </Blur>
);

// a painted wall or sky: a vertical wash with a soft light patch from the upper left
export const Wash: React.FC<{
  x?: number;
  y?: number;
  w: number;
  h: number;
  top: string;
  bottom: string;
  light?: Pt; // centre of the light patch
  lightR?: number;
  lightO?: number;
}> = ({x = 0, y = 0, w, h, top, bottom, light, lightR = 700, lightO = 0.35}) => {
  const id = useId().replace(/:/g, '');
  return (
    <g>
      <defs>
        <linearGradient id={`w${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <radialGradient id={`l${id}`}>
          <stop offset="0" stopColor={WHITE} stopOpacity={lightO} />
          <stop offset="1" stopColor={WHITE} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#w${id})`} />
      {light && <ellipse cx={light[0]} cy={light[1]} rx={lightR} ry={lightR * 0.75} fill={`url(#l${id})`} />}
    </g>
  );
};

// wooden floorboards seen in perspective, from a horizon line down to the bottom of the frame
export const Floor: React.FC<{y: number; tone?: string; dark?: string; seed?: number; w?: number}> = ({
  y,
  tone = G4,
  dark = G6,
  seed = 1,
  w = 1920,
}) => {
  const id = useId().replace(/:/g, '');
  const lines: React.ReactNode[] = [];
  for (let i = 0; i < 9; i++) {
    const t = i / 8;
    const yy = y + (1080 - y) * t * t * 0.9 + 12 * t;
    lines.push(<path key={`h${i}`} d={`M0 ${yy} H${w}`} stroke={G7} strokeOpacity={0.35} strokeWidth={2} />);
  }
  for (let i = 0; i < 26; i++) {
    const x0 = ((i * 397 + seed * 131) % 1900) + 10;
    const row = (i * 7 + seed) % 7;
    const t0 = row / 8;
    const t1 = (row + 1) / 8;
    const y0 = y + (1080 - y) * t0 * t0 * 0.9 + 12 * t0;
    const y1 = y + (1080 - y) * t1 * t1 * 0.9 + 12 * t1;
    lines.push(<path key={`v${i}`} d={`M${x0} ${y0} L${x0 + (x0 - 960) * 0.05} ${y1}`} stroke={G7} strokeOpacity={0.3} strokeWidth={2} />);
  }
  return (
    <g>
      <defs>
        <linearGradient id={`f${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
      </defs>
      <rect x={0} y={y} width={w} height={1080 - y} fill={`url(#f${id})`} />
      {lines}
    </g>
  );
};

// wood grain streaks inside a rect, for furniture
export const Grain: React.FC<{x: number; y: number; w: number; h: number; n?: number; seed?: number; o?: number; vertical?: boolean}> = ({
  x,
  y,
  w,
  h,
  n = 6,
  seed = 3,
  o = 0.3,
  vertical,
}) => (
  <g stroke={INK} strokeOpacity={o} strokeWidth={1.6} fill="none" strokeLinecap="round">
    {Array.from({length: n}, (_, i) => {
      const f = (i + 0.5) / n;
      const wob = ((i * 53 + seed * 17) % 11) - 5;
      return vertical ? (
        <path key={i} d={`M${x + w * f} ${y + 6} q${wob} ${h * 0.3} 0 ${h * 0.55} t0 ${h * 0.35}`} />
      ) : (
        <path key={i} d={`M${x + 6} ${y + h * f} q${w * 0.3} ${wob} ${w * 0.55} 0 t${w * 0.35} 0`} />
      );
    })}
  </g>
);

// speed or motion lines
export const Lines: React.FC<{x: number; y: number; n: number; len: number; gap: number; angle?: number; o?: number; w?: number}> = ({
  x,
  y,
  n,
  len,
  gap,
  angle = 0,
  o = 1,
  w = OL,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`} stroke={INK} strokeWidth={w} strokeLinecap="round" opacity={o}>
    {Array.from({length: n}, (_, i) => (
      <path key={i} d={`M0 ${i * gap - ((n - 1) * gap) / 2} h${len * (i % 2 ? 0.7 : 1)}`} />
    ))}
  </g>
);

// little curved strokes around something that is shaking or ringing
export const Shakes: React.FC<{x: number; y: number; r: number; t: number; o?: number}> = ({x, y, r, t, o = 1}) => {
  const k = Math.floor(t / 2) % 2;
  return (
    <g stroke={INK} strokeWidth={OL} fill="none" strokeLinecap="round" opacity={o}>
      {[-1, 1].map((s) => (
        <g key={s}>
          <path d={`M${x + s * (r + 8 + k * 4)} ${y - r * 0.5} q${s * 10} ${r * 0.5} 0 ${r}`} />
          <path d={`M${x + s * (r + 22 + k * 4)} ${y - r * 0.7} q${s * 14} ${r * 0.7} 0 ${r * 1.4}`} />
        </g>
      ))}
    </g>
  );
};

// curls of steam; strength 0 = gone
export const Steam: React.FC<{x: number; y: number; t: number; strength?: number; h?: number}> = ({x, y, t, strength = 1, h = 90}) => {
  if (strength <= 0.02) return null;
  return (
    <g fill="none" stroke={WHITE} strokeLinecap="round" opacity={0.85 * strength}>
      {[-14, 4, 20].map((dx, i) => {
        const ph = (t / 30 + i * 0.33) % 1;
        const yy = y - ph * 22;
        const sway = Math.sin((t / 14 + i) * 1.3) * 7;
        return (
          <path
            key={i}
            d={`M${x + dx} ${yy} q${10 + sway} ${-h * 0.25} 0 ${-h * 0.5} t0 ${-h * 0.5 * strength}`}
            strokeWidth={5 - i}
            opacity={1 - ph * 0.5}
          />
        );
      })}
    </g>
  );
};

// a clock face with tick marks and no numbers (the film carries no text)
export const ClockFace: React.FC<{x: number; y: number; r: number; hour: number; minute: number; rim?: string; face?: string; blur?: boolean}> = ({
  x,
  y,
  r,
  hour,
  minute,
  rim = G6,
  face = WHITE,
  blur,
}) => {
  const ha = ((hour % 12) + minute / 60) * 30 - 90;
  const ma = minute * 6 - 90;
  const hand = (a: number, len: number, w: number) => (
    <path
      d={`M${x} ${y} L${x + Math.cos((a * Math.PI) / 180) * len} ${y + Math.sin((a * Math.PI) / 180) * len}`}
      stroke={INK}
      strokeWidth={w}
      strokeLinecap="round"
    />
  );
  return (
    <g>
      <circle cx={x} cy={y} r={r + 9} fill={rim} stroke={INK} strokeWidth={OL} />
      <circle cx={x} cy={y} r={r} fill={face} stroke={INK} strokeWidth={OL * 0.8} />
      {Array.from({length: 12}, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const r0 = i % 3 === 0 ? r * 0.74 : r * 0.84;
        return (
          <path
            key={i}
            d={`M${x + Math.cos(a) * r0} ${y + Math.sin(a) * r0} L${x + Math.cos(a) * r * 0.93} ${y + Math.sin(a) * r * 0.93}`}
            stroke={INK}
            strokeWidth={i % 3 === 0 ? 4 : 2.5}
            strokeLinecap="round"
          />
        );
      })}
      {blur ? (
        <g opacity={0.5}>
          {[0, 10, 20, 30].map((d) => (
            <g key={d} opacity={1 - d / 40}>
              {hand(ma - d, r * 0.8, 3)}
            </g>
          ))}
        </g>
      ) : null}
      {hand(ha, r * 0.5, 6)}
      {hand(ma, r * 0.78, 4)}
      <circle cx={x} cy={y} r={5} fill={INK} />
    </g>
  );
};

// squash and stretch about a base point
export const Squash: React.FC<{x: number; y: number; sx: number; sy: number; rot?: number; children: React.ReactNode}> = ({
  x,
  y,
  sx,
  sy,
  rot = 0,
  children,
}) => <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${sx} ${sy}) translate(${-x} ${-y})`}>{children}</g>;

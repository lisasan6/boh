import React from 'react';
import {useTwos, ramp, lerp, sin, hop, squash, mulberry32} from '../lib/anim';
import {Sketch, RealEye} from '../lib/sketch';
import {
  INK, WHITE, G1, G2, G3, G4, G5, G6, G7, G8, SKIN_DEEP, OL,
  Inked, Hose, Hand, BigEye, Brow, Mouth, Phone, MintLight, Blur, Shadow, Wash, Floor, Grain, Shakes, Squash,
} from '../lib/toon';

// 1. Morning: in bed under a polka-dot duvet, phone held above her face, while the alarm clock hops and rings.
// curl marks scattered through her hair (fixed, so the drawing stays the same)
const curlMarks: [number, number, number, number][] = (() => {
  const r = mulberry32(7);
  const out: [number, number, number, number][] = [];
  while (out.length < 70) {
    const x = -160 + r() * 250;
    const y = -140 + r() * 240;
    const inside = ((x + 35) / 125) ** 2 + ((y + 15) / 115) ** 2 < 1;
    const onFace = ((x - 2) / 62) ** 2 + ((y + 4) / 92) ** 2 < 1.05;
    if (inside && !onFace) out.push([x, y, 6 + r() * 7, r() > 0.6 ? 1 : 0]);
  }
  return out;
})();

export const Shot1Bed: React.FC = () => {
  const t = useTwos();

  // eyelids: dreamy and heavy, drooping, then a flick open, then heavy again
  let lid = 0.52 + 0.04 * sin(t, 40);
  if (t >= 24 && t < 44) lid = lerp(0.52, 0.86, ramp(t, 24, 42));
  else if (t >= 44 && t < 60) lid = 0.14;
  else if (t >= 60) lid = lerp(0.14, 0.5, ramp(t, 60, 78));
  const browLift = t >= 44 && t < 62 ? 10 : 0;

  // the phone comes a little closer as she settles in
  const near = ramp(t, 6, 70);
  const bob = sin(t, 32) * 3;
  const hand: [number, number] = [lerp(640, 622, near), lerp(398, 424, near) + bob];

  // the alarm clock hops
  const P = 12;
  const h = hop(t, P);
  const sq = squash(t, P, 0, 0.2);
  const cy = 600 - h * 52;
  const tilt = sin(t, P * 2) * 9;
  const ring = Math.floor(t / 2) % 2 ? 1 : -1;
  const breathe = sin(t, 24);

  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <g transform="translate(760 330) scale(1.2) translate(-760 -330)">
      <Sketch t={t}>
      {/* the wall, lit from the upper left */}
      <Wash w={1920} h={850} top={G2} bottom={G3} light={[420, 160]} lightR={900} lightO={0.45} />
      {/* the window and its blinds */}
      <g>
        <rect x={650} y={90} width={420} height={300} fill={G1} />
        {Array.from({length: 12}, (_, i) => (
          <rect key={i} x={650} y={96 + i * 24} width={420} height={13} fill={G2} stroke={INK} strokeOpacity={0.5} strokeWidth={1.5} />
        ))}
        <rect x={650} y={90} width={420} height={300} fill="none" stroke={INK} strokeWidth={OL} />
        <rect x={634} y={74} width={452} height={332} rx={4} fill="none" stroke={G6} strokeWidth={18} />
        <rect x={625} y={65} width={470} height={350} rx={6} fill="none" stroke={INK} strokeWidth={OL} />
        <rect x={643} y={83} width={434} height={314} fill="none" stroke={INK} strokeWidth={OL * 0.8} />
        <path d="M860 90 V390" stroke={G6} strokeWidth={10} />
        <path d="M1050 100 V330" stroke={INK} strokeWidth={2} />
        <circle cx={1050} cy={336} r={6} fill={G5} stroke={INK} strokeWidth={2} />
        <rect x={612} y={404} width={496} height={22} rx={4} fill={G5} stroke={INK} strokeWidth={OL} />
      </g>
      {/* morning stripes of light through the blinds, shimmering */}
      <g style={{mixBlendMode: 'screen'}}>
        <Blur r={6}>
          {Array.from({length: 7}, (_, i) => (
            <path
              key={i}
              d={`M${1120 + i * 6} ${160 + i * 46} l420 120 l0 26 l-420 -120 Z`}
              fill={WHITE}
              opacity={0.16 + 0.07 * sin(t, 20, i * 0.21)}
            />
          ))}
        </Blur>
      </g>
      {/* a framed picture */}
      <g>
        <rect x={1560} y={210} width={190} height={150} rx={4} fill={G5} stroke={INK} strokeWidth={OL} />
        <rect x={1578} y={228} width={154} height={114} fill={G1} stroke={INK} strokeWidth={OL * 0.7} />
        <path d="M1580 340 L1630 280 L1660 310 L1700 262 L1730 300 L1730 340 Z" fill={G3} stroke={INK} strokeWidth={2.5} />
        <circle cx={1608} cy={258} r={11} fill={WHITE} stroke={INK} strokeWidth={2} />
      </g>
      {/* skirting board and floor */}
      <rect x={0} y={826} width={1920} height={26} fill={G5} stroke={INK} strokeWidth={OL} />
      <Floor y={852} tone={G4} dark={G6} seed={2} />

      {/* the bed: headboard, mattress, rail */}
      <Shadow cx={830} cy={895} rx={640} ry={22} o={0.5} />
      <g>
        <path d="M168 900 V420 Q168 360 222 360 Q276 360 276 420 V900 Z" fill={G5} stroke={INK} strokeWidth={OL} />
        <Grain x={176} y={380} w={92} h={510} vertical n={4} />
        <circle cx={222} cy={350} r={22} fill={G5} stroke={INK} strokeWidth={OL} />
        <rect x={250} y={690} width={1170} height={110} rx={18} fill={G1} stroke={INK} strokeWidth={OL} />
        <rect x={240} y={790} width={1200} height={58} rx={8} fill={G5} stroke={INK} strokeWidth={OL} />
        <Grain x={248} y={796} w={1184} h={46} n={3} seed={5} />
        <rect x={262} y={846} width={34} height={44} rx={6} fill={G6} stroke={INK} strokeWidth={OL} />
        <rect x={1386} y={846} width={34} height={44} rx={6} fill={G6} stroke={INK} strokeWidth={OL} />
        <path d="M1396 860 V560 Q1396 520 1436 520 Q1476 520 1476 560 V860 Z" fill={G5} stroke={INK} strokeWidth={OL} />
        <circle cx={1436} cy={512} r={18} fill={G5} stroke={INK} strokeWidth={OL} />
      </g>

      {/* pillow */}
      <Inked fill={WHITE} shapes={[{k: 'p', d: 'M262 600 Q250 520 330 505 Q440 488 560 512 Q610 530 600 600 Q590 660 470 668 Q330 676 280 650 Q262 632 262 600 Z'}]} />
      <path d="M300 560 q30 -10 60 4 M520 640 q30 -2 52 -22" stroke={INK} strokeWidth={2.5} fill="none" strokeLinecap="round" />

      {/* a light pyjama top and her neck */}
      <Inked fill={G1} shapes={[{k: 'p', d: 'M430 704 Q438 636 494 622 Q556 610 600 636 L618 706 Z'}]} />
      <path d="M470 640 q26 18 54 0" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
      <Hose a={[490, 590]} b={[496, 634]} w={30} fill={SKIN_DEEP} />

      {/* her head, natural proportions, turned up toward the phone */}
      <g transform={`translate(470 520) rotate(-10) translate(0 ${breathe * 2})`}>
        {/* a full head of curls, spilling onto the pillow */}
        <path d="M-150 30 Q-170 -60 -110 -110 Q-50 -150 20 -130 Q80 -118 86 -60 Q90 -20 70 10 L-20 60 Q-90 110 -140 90 Q-160 70 -150 30 Z" fill={G8} stroke={INK} strokeWidth={OL} />
        {curlMarks.map(([x, y, r, k], i) => (
          <path key={i} d={`M${x - r} ${y} a${r} ${r * 0.9} 0 1 1 ${r * 1.6} ${r * 0.5}`} stroke={k ? G5 : INK} strokeWidth={k ? 2.2 : 3.2} fill="none" strokeLinecap="round" />
        ))}
        <Inked
          fill={SKIN_DEEP}
          shapes={[
            {k: 'p', d: 'M-58 -30 C-60 -92 58 -98 62 -30 C66 12 54 52 28 74 C14 84 -4 86 -20 80 C-46 66 -60 30 -58 -30 Z'},
            {k: 'e', cx: -56, cy: 8, rx: 10, ry: 15},
          ]}
        />
        {/* shading on the side away from the light */}
        <Blur r={10} o={0.28}>
          <path d="M40 -40 C66 0 52 56 22 76 C40 40 44 0 40 -40 Z" fill={INK} />
          <ellipse cx={0} cy={86} rx={40} ry={10} fill={INK} />
        </Blur>
        {/* curls falling over the forehead */}
        {([[-50, -58, 16], [-28, -80, 18], [0, -86, 17], [28, -80, 16], [50, -62, 14], [-60, -30, 12]] as const).map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r + 2} fill={G8} stroke={INK} strokeWidth={2.5} />
            <path d={`M${x - r * 0.6} ${y + r * 0.2} a${r * 0.6} ${r * 0.55} 0 1 1 ${r} ${r * 0.3}`} stroke={G5} strokeWidth={2} fill="none" strokeLinecap="round" />
          </g>
        ))}
        <circle cx={-58} cy={30} r={9} fill="none" stroke={INK} strokeWidth={4} />
        <circle cx={-58} cy={30} r={9} fill="none" stroke={G2} strokeWidth={2} />
        <Brow x={-24} y={-34 - browLift} w={34} arch={7} thick={3.5} tilt={2} />
        <Brow x={28} y={-35 - browLift} w={32} arch={7} thick={3.5} tilt={-2} />
        <RealEye x={-23} y={-8} w={36} h={15} look={[0.5, -0.7]} lid={lid} lidFill={SKIN_DEEP} side="l" />
        <RealEye x={27} y={-9} w={33} h={14} look={[0.5, -0.7]} lid={lid} lidFill={SKIN_DEEP} side="r" />
        {/* nose */}
        <path d="M8 -2 q-6 18 1 27" stroke={INK} strokeWidth={2.6} fill="none" strokeLinecap="round" opacity={0.85} />
        <path d="M-4 30 q4 5 9 2 q5 4 10 -1" stroke={INK} strokeWidth={2.8} fill="none" strokeLinecap="round" />
        {/* a sleepy smile */}
        <path d="M-17 48 Q-8 42 0 46 Q9 42 19 47 Q2 52 -17 48 Z" fill={G7} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
        <path d="M-15 49 Q2 62 18 48 Q2 53 -15 49 Z" fill={G6} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
        <path d="M-21 44 q2 4 6 5 M20 44 q-1 4 -4 5" stroke={INK} strokeWidth={2.4} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={54} rx={6} ry={2} fill={WHITE} opacity={0.35} />
      </g>

      {/* the polka-dot duvet */}
      {(() => {
        const d =
          'M455 668 C500 610 590 600 660 612 C760 626 840 654 930 640 C1030 622 1070 566 1150 568 C1230 572 1262 612 1330 622 C1372 628 1404 654 1408 704 L1414 802 Q1380 816 1340 804 Q1290 820 1240 806 Q1180 822 1120 806 Q1060 820 1000 806 Q940 822 880 806 Q820 820 760 806 Q700 822 640 806 Q580 820 520 806 Q470 816 446 792 Z';
        return (
          <g>
            <defs>
              <clipPath id="duvet1">
                <path d={d} />
              </clipPath>
            </defs>
            <Inked fill={WHITE} shapes={[{k: 'p', d}]} />
            <g clipPath="url(#duvet1)">
              {Array.from({length: 90}, (_, i) => {
                const col = i % 15;
                const row = Math.floor(i / 15);
                return <circle key={i} cx={470 + col * 66 + (row % 2) * 33} cy={590 + row * 42} r={11} fill={G4} />;
              })}
              <Blur r={18} o={0.35}>
                <path d="M450 760 H1420 V830 H450 Z" fill={INK} />
                <path d="M1240 600 Q1300 640 1300 700" stroke={INK} strokeWidth={50} fill="none" />
              </Blur>
            </g>
            <path d="M1120 610 q60 30 50 90 M760 640 q40 40 20 120 M1360 660 q10 60 -10 120" stroke={INK} strokeWidth={2.5} fill="none" strokeLinecap="round" />
          </g>
        );
      })()}

      {/* the raised arm and the phone */}
      <Hose a={[560, 650]} b={[hand[0] + 4, hand[1] + 18]} bend={30} w={24} fill={G1} />
      </Sketch>
      <Phone x={hand[0] - 2} y={hand[1] - 34} w={46} h={80} rot={-30} scroll={t} />
      <Sketch t={t}>
        <Hand x={hand[0] + 6} y={hand[1] + 6} rot={-100} s={1} fill={SKIN_DEEP} pose="grip" />
      </Sketch>

      {/* the mint light: a soft cone from the screen down onto her face */}
      <g style={{mixBlendMode: 'screen'}}>
        <Blur r={26} o={0.16}>
          <path d={`M${hand[0] - 30} ${hand[1] - 20} L${hand[0] + 20} ${hand[1] - 4} L540 590 L420 560 Z`} fill="#3CF0CB" />
        </Blur>
      </g>
      <MintLight cx={486} cy={520} rx={100} ry={95} o={0.34} />
      <MintLight cx={hand[0] - 2} cy={hand[1] - 34} rx={70} o={0.42} />

      <Sketch t={t}>
      {/* the nightstand */}
      <Shadow cx={1590} cy={885} rx={170} ry={16} o={0.45} />
      <g>
        <rect x={1470} y={622} width={240} height={176} fill={G5} stroke={INK} strokeWidth={OL} />
        <Grain x={1478} y={630} w={224} h={160} n={5} seed={8} />
        <rect x={1492} y={650} width={196} height={60} rx={4} fill={G4} stroke={INK} strokeWidth={OL} />
        <circle cx={1590} cy={680} r={9} fill={G6} stroke={INK} strokeWidth={3} />
        <rect x={1450} y={600} width={280} height={26} rx={6} fill={G4} stroke={INK} strokeWidth={OL} />
        <path d="M1486 798 l-10 66 h26 l4 -66 M1694 798 l10 66 h-26 l-4 -66" fill={G6} stroke={INK} strokeWidth={OL} strokeLinejoin="round" />
      </g>

      {/* the twin-bell alarm clock, hopping and ringing */}
      <Shadow cx={1590} cy={604} rx={70 - h * 26} ry={8} o={0.5 - h * 0.25} />
      <Squash x={1590} y={600} sx={sq.sx} sy={sq.sy}>
        <g transform={`translate(0 ${cy - 600}) rotate(${tilt} 1590 520)`}>
          {/* rubber-hose legs and big round shoes */}
          <Hose a={[1566, 566]} b={[1546 - h * 6, 590]} bend={-8} w={8} fill={INK} />
          <Hose a={[1614, 566]} b={[1634 + h * 6, 590]} bend={8} w={8} fill={INK} />
          <Inked fill={INK} shapes={[{k: 'e', cx: 1536 - h * 6, cy: 594, rx: 20, ry: 11}, {k: 'e', cx: 1644 + h * 6, cy: 594, rx: 20, ry: 11}]} />
          <path d={`M${1524 - h * 6} 590 q6 -5 12 -4 M${1632 + h * 6} 590 q6 -5 12 -4`} stroke={WHITE} strokeWidth={3} fill="none" strokeLinecap="round" />
          {/* bells and the hammer between them */}
          <g transform={`rotate(${ring * 5} 1590 470)`}>
            <Inked fill={INK} shapes={[{k: 'p', d: 'M1510 472 Q1508 420 1552 414 Q1574 428 1568 472 Z'}, {k: 'p', d: 'M1612 472 Q1606 428 1628 414 Q1672 420 1670 472 Z'}]} />
            <path d="M1524 446 q10 -16 26 -18 M1626 428 q16 4 24 18" stroke={WHITE} strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
          <path d={`M1590 470 L${1590 + ring * 18} 430`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
          <circle cx={1590 + ring * 18} cy={428} r={9} fill={INK} />
          {/* the face: a dial with pie eyes and a mouth hollering */}
          <circle cx={1590} cy={520} r={64} fill={INK} />
          <circle cx={1590} cy={520} r={54} fill={WHITE} stroke={INK} strokeWidth={OL * 0.8} />
          {Array.from({length: 12}, (_, i) => {
            const an = (i * 30 * Math.PI) / 180;
            return <path key={i} d={`M${1590 + Math.cos(an) * 46} ${520 + Math.sin(an) * 46} L${1590 + Math.cos(an) * 51} ${520 + Math.sin(an) * 51}`} stroke={INK} strokeWidth={3} strokeLinecap="round" />;
          })}
          <BigEye x={1572} y={500} rx={12} ry={17} look={[0, -0.2]} lidFill={WHITE} pie />
          <BigEye x={1608} y={500} rx={12} ry={17} look={[0, -0.2]} lidFill={WHITE} pie />
          <Mouth x={1590} y={532} w={34} smile={0.2} open={0.55 + (ring > 0 ? 0.15 : 0)} />
          <path d="M1548 488 q12 -16 30 -20" stroke={INK} strokeOpacity={0.15} strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
      </Squash>
      <Shakes x={1590} y={cy - 100} r={50} t={t} />
      </Sketch>
      </g>
    </svg>
  );
};

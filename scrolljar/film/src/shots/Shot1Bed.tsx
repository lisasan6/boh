import React from 'react';
import {useTwos, ramp, lerp, sin, hop, squash} from '../lib/anim';
import {
  INK, WHITE, G1, G2, G3, G4, G5, G6, SKIN_DEEP, OL,
  Inked, Hose, Hand, BigEye, Brow, Mouth, Phone, MintLight, Blur, Shadow, Wash, Floor, Grain, Shakes, Squash,
} from '../lib/toon';

// 1. Morning: in bed under a polka-dot duvet, phone held above her face, while the alarm clock hops and rings.
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

      {/* her curls, flowing out across the pillow behind her head */}
      {(() => {
        const curls: [number, number, number][] = [
          [300, 560, 26], [322, 518, 28], [352, 482, 28], [394, 456, 26], [440, 440, 24], [488, 436, 22], [530, 448, 20],
          [292, 604, 24], [318, 642, 22], [356, 666, 20], [336, 600, 22],
        ];
        return (
          <g>
            <path d="M560 470 Q500 420 420 432 Q330 446 300 520 Q280 600 330 660 Q380 690 440 640 Z" fill={INK} />
            {curls.map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r + OL} fill={INK} />
            ))}
            {curls.map(([x, y, r], i) => (
              <path key={i} d={`M${x - r * 0.55} ${y - r * 0.05} q${r * 0.45} ${-r * 0.65} ${r * 0.95} ${-r * 0.15}`} stroke={WHITE} strokeWidth={3.5} fill="none" strokeLinecap="round" opacity={0.75} />
            ))}
          </g>
        );
      })()}

      {/* black satin pyjamas with white piping, and a short neck */}
      <Inked fill={INK} shapes={[{k: 'p', d: 'M420 700 Q430 625 495 606 Q560 594 606 624 L626 704 Z'}]} />
      <path d="M452 640 q30 22 64 -2 M560 610 q20 10 30 34" stroke={WHITE} strokeWidth={4} fill="none" strokeLinecap="round" />
      <Hose a={[484, 600]} b={[490, 626]} w={26} fill={SKIN_DEEP} />

      {/* her head: a big round baby face turned up toward the phone */}
      <g transform={`translate(480 518) rotate(-12) translate(0 ${breathe * 3})`}>
        <Inked
          fill={SKIN_DEEP}
          shapes={[
            {k: 'p', d: 'M-76 -22 C-80 -96 80 -100 80 -22 C80 26 52 72 8 98 C-34 80 -76 28 -76 -22 Z'},
            {k: 'c', cx: -74, cy: 8, r: 15},
          ]}
        />
        <path d="M-78 2 q8 -8 10 8" stroke={INK} strokeWidth={3} fill="none" />
        {/* a hoop earring */}
        <circle cx={-76} cy={34} r={12} fill="none" stroke={INK} strokeWidth={OL + 2} />
        <circle cx={-76} cy={34} r={12} fill="none" stroke={G2} strokeWidth={2.5} />
        {/* spit curls along the hairline */}
        {[[-64, -58, 20], [-36, -80, 20], [-4, -88, 19], [28, -86, 18], [56, -72, 17], [74, -50, 13]].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={INK} />
            <path d={`M${x - r * 0.4} ${y + r * 0.1} q${r * 0.4} ${-r * 0.6} ${r * 0.8} ${-r * 0.1}`} stroke={WHITE} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.7} />
          </g>
        ))}
        <Brow x={-27} y={-34 - browLift} w={26} arch={9} thick={4} />
        <Brow x={29} y={-33 - browLift} w={26} arch={9} thick={4} />
        <BigEye x={-27} y={2} rx={22} ry={30} look={[0.45, -0.6]} lid={lid} lidFill={SKIN_DEEP} lashes="l" />
        <BigEye x={27} y={4} rx={22} ry={30} look={[0.45, -0.6]} lid={lid} lidFill={SKIN_DEEP} lashes="r" />
        <Inked fill={SKIN_DEEP} shapes={[{k: 'e', cx: 3, cy: 44, rx: 8, ry: 7}]} />
        <ellipse cx={0} cy={41} rx={3} ry={2.5} fill={WHITE} opacity={0.6} />
        <Mouth x={5} y={64} w={38} smile={0.8} open={0} />
        <ellipse cx={-46} cy={40} rx={11} ry={7} fill={WHITE} opacity={0.12} />
        <ellipse cx={50} cy={42} rx={11} ry={7} fill={WHITE} opacity={0.12} />
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
      <Hose a={[556, 642]} b={[hand[0] + 4, hand[1] + 18]} bend={34} w={30} fill={INK} />
      <path d={`M${hand[0] - 12} ${hand[1] + 22} q16 8 32 -2`} stroke={WHITE} strokeWidth={5} fill="none" strokeLinecap="round" />
      <Phone x={hand[0] - 2} y={hand[1] - 34} w={46} h={80} rot={-30} scroll={t} />
      <Hand x={hand[0] + 6} y={hand[1] + 6} rot={-100} s={1.05} fill={SKIN_DEEP} pose="grip" />

      {/* the mint light: a soft cone from the screen down onto her face */}
      <g style={{mixBlendMode: 'screen'}}>
        <Blur r={26} o={0.16}>
          <path d={`M${hand[0] - 30} ${hand[1] - 20} L${hand[0] + 20} ${hand[1] - 4} L540 590 L420 560 Z`} fill="#3CF0CB" />
        </Blur>
      </g>
      <MintLight cx={486} cy={520} rx={110} ry={100} o={0.26} />
      <MintLight cx={hand[0] - 2} cy={hand[1] - 34} rx={70} o={0.42} />

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
      </g>
    </svg>
  );
};

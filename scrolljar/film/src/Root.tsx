import React from 'react';
import {AbsoluteFill, Composition, Series} from 'remotion';
import {FilmLook} from './lib/FilmLook';
import {FPS, SHOT} from './lib/anim';
import {SHOTS} from './shots';

// An ordinary day: nine shots of four seconds, joined by hard cuts.
const Film: React.FC = () => (
  <FilmLook>
    <Series>
      {SHOTS.map((S, i) => (
        <Series.Sequence key={i} durationInFrames={SHOT}>
          <AbsoluteFill>
            <S />
          </AbsoluteFill>
        </Series.Sequence>
      ))}
    </Series>
  </FilmLook>
);

const One: React.FC<{i: number; look: boolean}> = ({i, look}) => {
  const S = SHOTS[i];
  return look ? (
    <FilmLook seed={i}>
      <S />
    </FilmLook>
  ) : (
    <AbsoluteFill style={{background: '#fff'}}>
      <S />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="OrdinaryDay" component={Film} durationInFrames={SHOT * SHOTS.length} fps={FPS} width={1920} height={1080} />
    {SHOTS.map((_, i) => (
      <Composition
        key={i}
        id={`Shot${i + 1}`}
        component={One}
        defaultProps={{i, look: true}}
        durationInFrames={SHOT}
        fps={FPS}
        width={1920}
        height={1080}
      />
    ))}
  </>
);

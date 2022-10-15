import {
	AbsoluteFill, interpolate, Sequence, useCurrentFrame
} from 'remotion';
import ArtistSequence from './ArtistSequence';
import { FONT_FAMILY } from './Intro/constants';
import { ArtistType } from './Video';

const CharacterSequence: React.FC<{
	name: string;
	species: string;
  artists: ArtistType[];
  from: number;
  durationInFrames: number;
}> = ({ name: characterName, species, artists, from, durationInFrames }) => {
  const frame = useCurrentFrame();

  if (artists.length === 0) {
    return (null);
  }

  const opacity = interpolate(
    frame,
    [artists[0].from - 20, artists[0].from],
    [1, 0]
  )

  return (
    <Sequence
      name={characterName}
      from={from}
      durationInFrames={durationInFrames}
    >
      <Sequence
        name={`${characterName} intro`}
        from={0}
        durationInFrames={artists[0].from}
      >
        <AbsoluteFill
          style={{
            backgroundColor: 'black',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: 100,
              marginLeft: "auto",
              marginRight: "auto",
              fontFamily: FONT_FAMILY,
              textTransform: 'capitalize',
              textAlign: 'center'
            }}
          >
            {characterName}<br />
            <span
              style={{
                fontSize: '0.5em'
              }}
            >
              ({species})
            </span>
          </p>
        </AbsoluteFill>
      </Sequence>
      {
        artists.map(({ name, network, artworks, from, durationInFrames }) => (
          <ArtistSequence
            name={name}
            network={network}
            characterName={characterName}
            from={from}
            durationInFrames={durationInFrames}
            artworks={artworks}
          />
        ))
      }
    </Sequence>
	);
};

export default CharacterSequence;

import {
	AbsoluteFill, Sequence
} from 'remotion';
import ArtistSequence from './ArtistSequence';
import { ArtistType } from './Video';

const CharacterSequence: React.FC<{
	name: string;
  artists: ArtistType[];
  from: number;
  durationInFrames: number;
}> = ({ name, artists, from, durationInFrames }) => {
	return (
    <Sequence
      name={name}
      from={from}
      durationInFrames={durationInFrames}
    >
      <AbsoluteFill style={{ backgroundColor: 'black' }}>
        <p
          style={{
            color: "white",
            fontSize: 100,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {name}
        </p>
      </AbsoluteFill>
      {
        artists.map(({ name, artworks, from, durationInFrames }) => (
          <ArtistSequence
            name={name}
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

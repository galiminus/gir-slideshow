import {
	Sequence
} from 'remotion';
import ArtistSequence from './ArtistSequence';
import { ArtistType } from './Video';

const CharacterSequence: React.FC<{
	name: string;
	species: string;
  artists: ArtistType[];
  from: number;
  durationInFrames: number;
}> = ({ name: characterName, species, artists, from, durationInFrames }) => {
  if (artists.length === 0) {
    return (null);
  }

  console.log(species)

  return (
    <Sequence
      name={characterName}
      from={from}
      durationInFrames={durationInFrames}
    >
      {
        artists.map(({ name, network, artworks, from, durationInFrames }) => (
          <ArtistSequence
            name={name}
            network={network}
            characterName={characterName}
            species={species}
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

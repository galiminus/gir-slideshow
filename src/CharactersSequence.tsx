import {
	Sequence,
} from 'remotion';
import CharacterSequence from './CharacterSequence';
import { CharacterType } from './Video';

const CharactersSequence: React.FC<{
  characters: CharacterType[],
  from: number;
}> = ({ characters, from }) => {

	return (
    <Sequence
      from={from}
    >
      {
        characters.map(({ name, artists, from, durationInFrames }) => (
          <CharacterSequence
            name={name}
            artists={artists}
            from={from}
            durationInFrames={durationInFrames}
          />
        ))
      }
    </Sequence>
	);
};

export default CharactersSequence;

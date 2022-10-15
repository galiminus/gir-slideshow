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
        characters.map((character) => (
          <CharacterSequence
            {...character}
          />
        ))
      }
    </Sequence>
	);
};

export default CharactersSequence;

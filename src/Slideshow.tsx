import {
	AbsoluteFill,
} from 'remotion';

import { SlideshowType } from './Video';

import CharactersSequence from './CharactersSequence';
import IntroSequence from './IntroSequence';

export const Slideshow: React.FC<{
	titleText: string;
	titleColor: string;
  slideshow: SlideshowType;
}> = ({
  titleText,
  titleColor,
  slideshow
}) => {
	return (
		<AbsoluteFill style={{ backgroundColor: 'white' }}>
      <IntroSequence
        titleText={titleText}
        titleColor={titleColor}
        durationInFrames={slideshow.introDurationInFrames}
      />
      <CharactersSequence
        characters={slideshow.characters}
        from={slideshow.introDurationInFrames}
      />
		</AbsoluteFill>
	);
};

import { SlideshowType } from './Video';

import IntroSequence from './IntroSequence';
import { Sequence } from 'remotion';
import Artwork from './Artwork';

const TRANSITION_DURATION = 20;

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
    <>
      <IntroSequence
        titleText={titleText}
        titleColor={titleColor}
        durationInFrames={slideshow.introDurationInFrames}
      />
      <Sequence
        name={"slideshow"}
        from={slideshow.introDurationInFrames}
        durationInFrames={slideshow.durationInFrame}
      >
        {
          slideshow.artworks.map((artwork, index) => (
            <Sequence
              key={index}
              name={artwork.url}
              from={artwork.from - TRANSITION_DURATION}
              durationInFrames={artwork.durationInFrames + TRANSITION_DURATION * 2}
            >
              <Artwork {...artwork} transitionDuration={TRANSITION_DURATION} />
            </Sequence>
          ))
        }
      </Sequence>
    </>
	);
};

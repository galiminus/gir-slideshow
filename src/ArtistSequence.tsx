import {
	Img, interpolate, Sequence, staticFile, useCurrentFrame,
} from 'remotion';
import { FONT_FAMILY } from './Intro/constants';
import { ArtworkType } from './Video';

const ArtistSequence: React.FC<{
	name: string;
  artworks: ArtworkType[];
  from: number;
  durationInFrames: number;
}> = ({ name, artworks, from, durationInFrames }) => {
  const frame = useCurrentFrame();
  const infoHeight = interpolate(frame - from, [0, 10], [0, 100], {
    extrapolateRight: "clamp"
  });

	return (
    <Sequence
      name={name}
      from={from}
      durationInFrames={durationInFrames}
    >
      {
        artworks.map(({ url, from, durationInFrames }) => (
          <Sequence
            name={url}
            from={from}
            durationInFrames={durationInFrames}
          >
            <Img
              src={staticFile(url)}
              style={{
                objectFit: 'cover',
                height: '100%',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            />
          </Sequence>
        ))
      }
      <div
        style={{
          position: "absolute",
          height: infoHeight,
          backgroundColor: 'rgba(219, 39, 119)',
          bottom: 0,
          right: 0,
          color: 'white',
          textAlign: 'right',
          padding: "20px 80px",
          fontSize: '3em',
          borderTopLeftRadius: 32,
          fontFamily: FONT_FAMILY
        }}
      >
        {name}
      </div>
    </Sequence>
	);
};

export default ArtistSequence;

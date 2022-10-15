import {
  AbsoluteFill,
	Img, interpolate, Sequence, staticFile, useCurrentFrame,
} from 'remotion';
import { FONT_FAMILY } from './Intro/constants';
import { ArtworkType } from './Video';

const INFO_HEIGHT = 130;

const ArtistSequence: React.FC<{
	name: string;
	network: string;
  characterName: string;
  artworks: ArtworkType[];
  from: number;
  durationInFrames: number;
}> = ({
  name: artistName,
  network,
  characterName,
  artworks,
  from,
  durationInFrames
}) => {
  const frame = useCurrentFrame();
  const infoBottom = interpolate(frame - from, [0, 10, 15], [-INFO_HEIGHT, -INFO_HEIGHT, 0], {
    extrapolateRight: "clamp"
  });

	return (
    <Sequence
      name={artistName}
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
            <AbsoluteFill
              style={{
                backgroundImage: `url(${staticFile(url)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <AbsoluteFill
                style={{
                  backdropFilter: 'blur(64px)',
                }}
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
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        ))
      }
      <div
        style={{
          position: "absolute",
          height: INFO_HEIGHT,
          backgroundColor: 'rgba(219, 39, 119)',
          bottom: infoBottom,
          right: 0,
          color: 'white',
          textAlign: 'right',
          padding: "20px 80px",
          fontSize: '3em',
          borderTopLeftRadius: 0,
          fontFamily: FONT_FAMILY,
          textTransform: 'capitalize'
        }}
      >
        {characterName} par {artistName}<br />
        <span
          style={{ fontSize: '1em', color: 'white', }}
        >
          {network}
        </span>
      </div>
    </Sequence>
	);
};

export default ArtistSequence;

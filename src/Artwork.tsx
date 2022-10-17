import { ArtworkType } from './Video';

import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { FONT_FAMILY } from './Intro/constants';

const INFO_HEIGHT = 118;

type ArtworkProps = ArtworkType | {
  transitionDuration: number
}

const Artwork: React.FC<ArtworkProps> = ({
  transitionDuration,
	characterName,
	species,
	artistName,
	network,
	url,
	durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
		frame,
		[0, transitionDuration, durationInFrames, durationInFrames + transitionDuration],
		[0, 1, 1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
      <AbsoluteFill
        style={{
          backgroundImage: `url(${staticFile(url)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity
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
              height: `calc(100% - ${INFO_HEIGHT}px)`,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          />

          <div
            style={{
              height: INFO_HEIGHT,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              bottom: 0,
              right: 0,
              color: 'white',
              padding: "16px 80px",
              fontSize: '3em',
              borderTopLeftRadius: 0,
              fontFamily: FONT_FAMILY,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              lineHeight: '1em'
            }}
          >
            <div
              style={{
                flexDirection: 'column',
              }}
            >
              <div>
                {characterName}
              </div>
              <div
                style={{
                  fontSize: "0.5em"
                }}
              >
                ({species})
              </div>
            </div>
            <div
              style={{
                textAlign: 'right',
                flexDirection: 'column',
              }}
            >
              <div>
                Par <span style={{ textDecoration: 'underline' }}>{artistName}</span>
              </div>
              <div
                style={{
                  fontSize: "0.5em"
                }}
              >
                {network}
              </div>
            </div>
          </div>

        </AbsoluteFill>
      </AbsoluteFill>
	);
};

export default Artwork;

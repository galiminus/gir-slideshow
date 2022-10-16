import {
  AbsoluteFill,
	Img, Sequence, staticFile,
} from 'remotion';
import { FONT_FAMILY } from './Intro/constants';
import { ArtworkType } from './Video';

const INFO_HEIGHT = 130;

const ArtistSequence: React.FC<{
	name: string;
	network: string;
	species: string;
  characterName: string;
  artworks: ArtworkType[];
  from: number;
  durationInFrames: number;
}> = ({
  name: artistName,
  network,
  species,
  characterName,
  artworks,
  from,
  durationInFrames
}) => {
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
                justifyContent: 'center',
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
                    justifyContent: 'space-between'
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
                      Par {artistName}
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
          </Sequence>
        ))
      }
    </Sequence>
	);
};

export default ArtistSequence;

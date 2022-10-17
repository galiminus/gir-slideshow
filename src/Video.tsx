import { Composition } from 'remotion';

import { Slideshow } from './Slideshow';

export type ArtworkType = {
	characterName: string;
	species: string;
	artistName: string;
	network: string;
	url: string;
	durationInFrames: number;
	from: number;
}

export type SlideshowType = {
	durationInFrame: number;
	introDurationInFrames: number;
	from: number;
	artworks: ArtworkType[];
}

import slideshow from './slideshow.json';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Slideshow"
				component={Slideshow}
				durationInFrames={slideshow.durationInFrames}
				fps={slideshow.fps}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Bulles de Poils TV',
					titleColor: 'rgb(219 39 119)',
					slideshow
				}}
			/>
		</>
	);
};

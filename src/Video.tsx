import { Composition } from 'remotion';

import { Slideshow } from './Slideshow';

export type ArtworkType = {
	url: string;
	durationInFrames: number;
	from: number;
}

export type ArtistType = {
	name: string;
	network: string;
	artworks: ArtworkType[];
	durationInFrames: number;
	from: number;
}

export type CharacterType = {
	name: string;
	species: string;
	artists: ArtistType[];
	durationInFrames: number;
	from: number;
}

export type SlideshowType = {
	durationInFrame: number;
	introDurationInFrames: number;
	from: number;
	characters: CharacterType[];
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

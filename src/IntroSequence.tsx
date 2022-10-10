import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
} from 'remotion';
import { Logo } from './Intro/Logo';
import { Subtitle } from './Intro/Subtitle';
import { Title } from './Intro/Title';

const IntroSequence: React.FC<{
	titleText: string;
	titleColor: string;
	durationInFrames: number;
}> = ({ durationInFrames, titleText, titleColor }) => {
	const frame = useCurrentFrame();

	// Fade out the animation at the end
	const opacity = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<AbsoluteFill style={{ opacity }}>
			<Sequence from={0} durationInFrames={durationInFrames}>
				<Sequence from={0}>
					<Logo />
				</Sequence>
				<Sequence from={Math.floor(durationInFrames / 4)}>
					<Title titleText={titleText} titleColor={titleColor} />
				</Sequence>
				<Sequence from={Math.floor(durationInFrames / 3)}>
					<Subtitle />
				</Sequence>
			</Sequence>
		</AbsoluteFill>
	);
};

export default IntroSequence;
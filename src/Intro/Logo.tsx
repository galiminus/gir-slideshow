import {
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
	staticFile
} from 'remotion';

export const Logo: React.FC = () => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const scale = spring({
		frame,
		config: {
			mass: 0.1,
		},
		fps: videoConfig.fps,
	});

	return (
		<Img
			src={staticFile('logo.png')}
			style={{
				transform: `scale(${scale})`,
				width: "30vw",
				height: "30vw",
				marginTop: '8vw',
				marginLeft: "auto",
				marginRight: "auto",
				borderRadius: "100%"
			}}
		/>
	);
};

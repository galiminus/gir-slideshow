import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT_FAMILY} from './constants';

const title: React.CSSProperties = {
	fontFamily: FONT_FAMILY,
	fontWeight: 'bold',
	fontSize: 80,
	textAlign: 'center',
	position: 'absolute',
	bottom: 160,
	width: '100%',
};

const word: React.CSSProperties = {
	marginLeft: 0,
	marginRight: 0,
	display: 'inline-block',
};

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const words = titleText.split('');

	return (
		<h1 style={title}>
			{words.map((t, i) => {
				const delay = i * 0.5;

				const scale = spring({
					fps: videoConfig.fps,
					frame: frame - delay,
					config: {
						damping: 200,
					},
				});

				return (
					<span
						key={t}
						style={{
							...word,
							color: titleColor,
							transform: `scale(${scale})`,
							whiteSpace: "pre"
						}}
					>
						{t}
					</span>
				);
			})}
		</h1>
	);
};

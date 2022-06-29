import React, {useEffect, useRef, useMemo} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {confettiCannon} from './confetti';
import type {IConfettiOptions} from './interfaces';

export type ConfettiConfig = Omit<IConfettiOptions, 'width' | 'height'>;

export const Confetti = (confettiConfig: ConfettiConfig) => {
	const frame = useCurrentFrame();
	const video = useVideoConfig();

	const ref = useRef<HTMLCanvasElement>(null);

	const stringifiedConfig = useMemo(
		() => JSON.stringify(confettiConfig),
		[confettiConfig]
	);

	const confettiInstance = useMemo(() => {
		const config = JSON.parse(stringifiedConfig) as IConfettiOptions;
		const conf = confettiCannon(ref.current as HTMLCanvasElement);
		conf.fire({
			...config,
			width: video.width,
			height: video.height,
		});

		return conf;
	}, [stringifiedConfig, video.height, video.width]);

	useEffect(() => {
		confettiInstance.frame(frame);
	}, [confettiInstance, frame]);

	const style: React.CSSProperties = useMemo(() => {
		return {
			width: video.width,
			height: video.height,
			position: 'absolute',
		};
	}, [video.height, video.width]);

	return (
		<canvas ref={ref} width={video.width} height={video.height} style={style} />
	);
};

export default Confetti;

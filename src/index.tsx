import React, {useEffect, useRef, useMemo, useState} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {confettiCannon} from './confetti';
import type {IConfettiOptions} from './interfaces';

export type ConfettiConfig = Omit<IConfettiOptions, 'width' | 'height'>;

export const Confetti = (confettiConfig: ConfettiConfig) => {
	const frame = useCurrentFrame();
	const video = useVideoConfig();

	const [instantiated, setInstantiated] = useState(false);

	const ref = useRef<HTMLCanvasElement>(null);

	const stringifiedConfig = useMemo(
		() => JSON.stringify(confettiConfig),
		[confettiConfig]
	);

	const confettiInstance = useMemo(() => {
		if (!instantiated) {
			return null;
		}

		const config = JSON.parse(stringifiedConfig) as IConfettiOptions;
		const conf = confettiCannon(ref.current as HTMLCanvasElement);
		conf.fire({
			...config,
			width: video.width,
			height: video.height,
		});

		return conf;
	}, [instantiated, stringifiedConfig, video.height, video.width]);

	useEffect(() => {
		if (confettiInstance) {
			confettiInstance.frame(frame);
		}
	}, [confettiInstance, frame]);

	useEffect(() => {
		setInstantiated(true);
	}, []);

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

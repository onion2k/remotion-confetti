import React, {useEffect, useRef, useMemo} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {confettiCannon} from './confetti';
import {IConfettiOptions} from './interfaces';

export const Confetti = (
	confettiConfig: Omit<IConfettiOptions, 'width' | 'height'>
) => {
	const frame = useCurrentFrame();
	const video = useVideoConfig();

	const ref = useRef<HTMLCanvasElement>(null);

	const confettiInstance = useMemo(() => {
		const conf = confettiCannon(ref.current as HTMLCanvasElement);
		conf.fire({
			...confettiConfig,
			width: video.width,
			height: video.height,
		});

		return conf;
	}, [confettiConfig, video.height, video.width]);

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
export {IConfettiOptions};

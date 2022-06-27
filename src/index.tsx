import { useState, useEffect, useRef } from 'react'
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { confettiCannon } from './confetti'
import { iConfettiOptions } from './interfaces'

export const Confetti = (confettiConfig: Omit<iConfettiOptions, 'width' | 'height'>) => {

  const frame = useCurrentFrame();
  const video = useVideoConfig();

  const ref = useRef<HTMLCanvasElement | null>(null);
  const [confettiInstance, setConfettiInstance] = useState<{ fire: (options: iConfettiOptions) => void, frame: (frame: number) => void } | null>(null);

  useEffect(() => {
    if (ref.current !== null && !confettiInstance) {
      ref.current.width = video.width;
      ref.current.height = video.height;
      const confetti = confettiCannon(ref.current);
      confetti.fire({
        ...confettiConfig,
        width: video.width,
        height: video.height
      });
      setConfettiInstance(confetti);
    }
  }, [confettiConfig, confettiInstance, video])

  useEffect(() => {
    if (confettiInstance) {
      confettiInstance.frame(frame);
    }
  }, [confettiInstance, frame]);

  return <canvas ref={ref} style={{
    width: `${video.width}px`, height: `${video.height}px`, position: 'absolute'
  }} />;
};

export default Confetti;
import React, { useEffect, useRef, useMemo, useState } from 'react'
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { confettiCannon } from './confetti'
import type { IConfettiOptions } from './interfaces'

export type ConfettiConfig = Omit<IConfettiOptions, 'width' | 'height'>

export const Confetti = ({
  style,
  fireAtFrame=0,
  ...confettiConfig
}: ConfettiConfig & {
  style?: React.CSSProperties,
  fireAtFrame?: number
}) => {
  const frame = useCurrentFrame()
  const video = useVideoConfig()

  const [handle] = useState(() => delayRender('Initializing confetti'))
  const [instantiated, setInstantiated] = useState(false)

  const ref = useRef<HTMLCanvasElement>(null)

  const stringifiedConfig = useMemo(
    () => JSON.stringify(confettiConfig),
    [confettiConfig]
  )

  const confettiInstance = useMemo(() => {
    if (!instantiated) {
      return null
    }

    const config = JSON.parse(stringifiedConfig) as IConfettiOptions
    const conf = confettiCannon(ref.current as HTMLCanvasElement)
    conf.fire({
      ...config,
      width: video.width,
      height: video.height,
    })

    return conf
  }, [instantiated, stringifiedConfig, video.height, video.width])

  useEffect(() => {
    if (confettiInstance) {
      const relativeCurrentFrame = Math.max(0,frame - fireAtFrame)
      confettiInstance.frame(Math.max(0, relativeCurrentFrame))
    }
  }, [confettiInstance, frame, fireAtFrame])

  useEffect(() => {
    setInstantiated(true)
    continueRender(handle)
  }, [handle])

  const cssStyle: React.CSSProperties = useMemo(() => {
    return {
      width: video.width,
      height: video.height,
      position: 'absolute',
      ...(style ?? {}),
    }
  }, [video.height, video.width, style])

  return (
    <canvas
      ref={ref}
      width={video.width}
      height={video.height}
      style={cssStyle}
    />
  )
}

export default Confetti

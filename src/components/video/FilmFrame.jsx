import { useEffect, useState } from 'react'
import { useNearView } from '../../hooks/useNearView'
import { queueThumb } from '../../utils/videoTraffic'

/**
 * The film's own opening frame, shown as its thumbnail (no tint, no logo).
 * Only the first bit of the file is loaded ("#t=0.5" + preload metadata),
 * once the thumbnail is near the screen, and one thumbnail at a time.
 */
export default function FilmFrame({ src }) {
  const [ref, near] = useNearView()
  const [go, setGo] = useState(null) // the release callback while this thumbnail loads
  useEffect(() => {
    if (!near) return
    return queueThumb((release) => setGo(() => release))
  }, [near])
  return (
    <video
      ref={ref}
      className="video__thumb-frame"
      src={go ? `${src}#t=0.5` : undefined}
      preload="metadata"
      muted
      playsInline
      tabIndex={-1}
      aria-hidden="true"
      onLoadedData={() => go?.()}
      onError={() => go?.()}
    />
  )
}

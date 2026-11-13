import { useNearView } from '../../hooks/useNearView'

/**
 * The film's own opening frame, shown as its thumbnail (no tint, no logo).
 * Only the first bit of the file is loaded ("#t=0.5" + preload metadata),
 * and only once the thumbnail is near the screen.
 */
export default function FilmFrame({ src }) {
  const [ref, near] = useNearView()
  return <video ref={ref} className="video__thumb-frame" src={near ? `${src}#t=0.5` : undefined} preload="metadata" muted playsInline tabIndex={-1} aria-hidden="true" />
}

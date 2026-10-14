/**
 * The film's own opening frame, shown as its thumbnail (no tint, no logo).
 * Only the first bit of the file is loaded ("#t=0.5" + preload metadata).
 */
export default function FilmFrame({ src }) {
  return <video className="video__thumb-frame" src={`${src}#t=0.5`} preload="metadata" muted playsInline tabIndex={-1} aria-hidden="true" />
}

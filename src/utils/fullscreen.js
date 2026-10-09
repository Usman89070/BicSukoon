/**
 * Shows a <video> fullscreen: the element itself where supported, the
 * iPhone/iPad native player otherwise. Must run from a click (or soon after).
 */
export function enterFullscreen(video) {
  if (!video) return
  try {
    if (video.requestFullscreen) video.requestFullscreen().catch(() => {})
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen()
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen()
  } catch {
    // not allowed here (e.g. not started by a click): keep playing inline
  }
}

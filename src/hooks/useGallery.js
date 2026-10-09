import { useEffect, useState } from 'react'
import { galleryItems } from '../data/gallery'
import { videoUrl } from '../data/videos'
import { imageFor } from '../utils/images'
import { API } from './useAdminList'

/**
 * Gallery photos and videos from the admin panel (Gallery tab), or the
 * built-in photos until the panel has been used / when the API is not
 * available (e.g. in development).
 */
export function useGallery() {
  const [items, setItems] = useState(galleryItems)
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${API}/gallery.php`, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!Array.isArray(data?.gallery)) return
        setItems(
          data.gallery
            .map((g) => ({
              id: g.id,
              project: g.project === 'sukoon' ? 'sukoon' : 'bic',
              kind: g.kind === 'video' ? 'video' : 'photo',
              title: g.title,
              // cover: uploaded picture, built-in render, else YouTube's own thumbnail
              src: g.photo ? `${API}/${g.photo}` : g.builtin ? imageFor(g.builtin) : g.youtube ? `https://i.ytimg.com/vi/${g.youtube}/hqdefault.jpg` : null,
              video: g.video ? videoUrl(`${g.project}/${g.video}`) : null,
              youtube: g.youtube || null,
            }))
            .filter((g) => (g.kind === 'video' ? g.video || g.youtube : g.src)),
        )
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])
  return items
}

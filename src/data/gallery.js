import { imageFor } from '../utils/images'
import { galleryBuiltIn, captionFromSlug } from './galleryList'

/**
 * Galleries on both websites (/gallery, /gallery/bic, /gallery/sukoon).
 *
 * Photos and videos are managed in the admin panel (Gallery tab). Until
 * the panel is first used, the built-in photos below are shown: the renders
 * in data/galleryList.js, plus any file in src/assets/images/ named
 *   gallery-bic-<anything>.jpg / gallery-sukoon-<anything>.jpg
 * (caption from the rest of the file name).
 */
export const galleries = {
  bic: { id: 'bic', title: 'BIC Gallery', name: 'Brisbane Islamic Centre', path: '/gallery/bic' },
  sukoon: { id: 'sukoon', title: 'Sukoon Gallery', name: 'Sukoon Village', path: '/gallery/sukoon' },
}

const dropped = import.meta.glob('../assets/images/gallery-{bic,sukoon}-*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

/** Item shape: { id, project, kind: 'photo' | 'video', title, src (photo or video cover), video, youtube } */
export const galleryItems = [
  ...galleryBuiltIn.map((p) => ({ project: p.project, kind: 'photo', title: p.title, src: imageFor(p.image) })).filter((p) => p.src),
  ...Object.entries(dropped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([file, src]) => {
      const [, project, slug] = file.match(/gallery-(bic|sukoon)-(.+)\.[a-z]+$/i)
      return { project: project.toLowerCase(), kind: 'photo', title: captionFromSlug(slug), src }
    }),
].map((p, i) => ({ video: null, youtube: null, ...p, id: `${p.project}-${i}` }))

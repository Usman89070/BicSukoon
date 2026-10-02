/**
 * Optional background images for the starting-page boxes.
 * Drop a file named portal-bic.(jpg|jpeg|png|webp) or portal-sukoon.(…) into
 * src/assets/images/ and it is picked up automatically; without one, the box
 * falls back to its brand colours. Keep files around 1500px wide and under
 * ~400 KB (JPG or WebP) so the page stays fast.
 */
const files = import.meta.glob('../assets/images/portal-*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

export function portalImage(id) {
  const key = Object.keys(files).find((k) => new RegExp(`/portal-${id}\\.[a-z]+$`).test(k))
  return key ? files[key] : null
}

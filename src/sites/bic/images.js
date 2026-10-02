/**
 * Optional BIC photography from src/assets/images/ (JPG, PNG or WebP):
 *   hero-bic.*    home + page hero image (falls back to portal-bic.*)
 *   portal-bic.*  aerial render, also used on the starting page
 */
const files = import.meta.glob('../../assets/images/{hero,portal}-bic.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

const find = (name) => {
  const key = Object.keys(files).find((k) => new RegExp(`/${name}\\.[a-z]+$`).test(k))
  return key ? files[key] : null
}

export const heroImage = find('hero-bic') ?? find('portal-bic')

/**
 * Optional BIC photography from src/assets/images/ (JPG, PNG or WebP):
 *   hero-bic.*                  home hero image (shown whole, uncropped; set heroRatio below)
 *   site-300DPIbicM-50kb.jpg    BIC aerial render (also on the starting page)
 *   portal-bic.*                older name for the aerial render
 */
const files = import.meta.glob('../../assets/images/{hero-bic,portal-bic,site-300DPIbic*}.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const find = (name) => {
  const key = Object.keys(files).find((k) => new RegExp(`/${name}[^/]*\\.[a-z]+$`, 'i').test(k))
  return key ? files[key] : null
}

export const heroImage = find('hero-bic') ?? find('site-300DPIbic') ?? find('portal-bic')

/** Width / height of the hero image, so it is shown whole. hero-bic.jpg is 2400 × 1762. */
export const heroRatio = find('hero-bic') ? '2400 / 1762' : '1200 / 881'

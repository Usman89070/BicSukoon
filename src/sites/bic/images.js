/**
 * Optional BIC photography from src/assets/images/ (JPG, PNG or WebP):
 *   hero-bic.*                  home hero image (high-resolution render)
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


import Reveal from '../common/Reveal'
import EmptyState from '../common/EmptyState'

const photos = import.meta.glob('../../assets/images/guests/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
const photoFor = (id) => {
  const key = Object.keys(photos).find((k) => new RegExp(`/${id}\\.[a-z]+$`, 'i').test(k))
  return key ? photos[key] : null
}

/** Initials for the monogram shown until a portrait is supplied. */
const initials = (name) => {
  const skip = /^(her|his|the|most|eminent|right|honourable|excellency|mr|mrs|ms|dr|sheikh|sheikha|shaykh|sheik|imam|mufti|moulana|senator|councillor|inspector|of|bin|al|ibn|mp|ac|psm|phd)$/i
  const words = name.replace(/[^\p{L}\s'-]/gu, ' ').split(/\s+/).map((w) => w.replace(/^al-/i, '')).filter((w) => w && !skip.test(w))
  return ((words[0]?.[0] ?? '') + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase()
}

/** Portrait grid. `guests` comes from useGuests() (admin panel or built-in list). */
export default function GuestGrid({ guests }) {
  if (!guests.length) {
    return (
      <EmptyState icon="star" title="Honoured guests will be featured here">
        Official visits and distinguished guests will be published with approved photographs and details.
      </EmptyState>
    )
  }
  return (
    <ul className="guests">
      {guests.map((g, i) => {
        const photo = g.photoUrl ?? photoFor(g.id)
        return (
          <Reveal as="li" key={g.id} delay={(i % 4) * 70} className="guest">
            <div className="guest__frame">
              {photo ? (
                <img className="guest__photo" src={photo} alt={g.name} loading="lazy" decoding="async" />
              ) : (
                <span className="guest__monogram" aria-hidden="true">{initials(g.name)}</span>
              )}
            </div>
            <h3 className="guest__name">{g.name}</h3>
            {g.role && <p className="guest__role">{g.role}</p>}
          </Reveal>
        )
      })}
    </ul>
  )
}

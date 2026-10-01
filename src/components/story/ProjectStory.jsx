import { story } from '../../data/vision'
import Media from '../common/Media'
import Reveal from '../common/Reveal'
import Pending from '../common/Pending'

/** Scroll-driven storytelling: short blocks, large type, alternating renders. */
export default function ProjectStory() {
  return (
    <section className="story section" aria-labelledby="story-title">
      <div className="container">
        <Reveal className="story__intro">
          <p className="eyebrow">The Project Story</p>
          <h2 id="story-title" className="story__headline">
            One precinct. <em>Two projects.</em> A shared purpose that reaches every generation.
          </h2>
        </Reveal>
        <ol className="story__list">
          {story.map((s, i) => (
            <li key={s.id} className="story__item">
              <Reveal variant="image" className="story__media">
                <Media label={`${s.eyebrow} — image`} ratio="5 / 4" />
              </Reveal>
              <Reveal className="story__text" delay={120}>
                <span className="story__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <p className="eyebrow">{s.eyebrow}</p>
                <h3 className="story__title">{s.title}</h3>
                <p className="story__body">{s.body}</p>
                {s.pending && <Pending>Official wording to be supplied</Pending>}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

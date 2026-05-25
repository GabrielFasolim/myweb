/* ─────────────────────────────────────────────
   Gabriel Fasolim | Portfolio
   Design System: "The Architectural Monolith"
   ───────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import heroBgDesktop from './assets/fasola.png'
import heroBgMobile from './assets/fasolacelular.png'
import FlowArt, { FlowSection } from './components/ui/story-scroll.jsx'

/* ── useInView — fires once when element enters viewport ── */
function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, ...options }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, inView]
}

/* ── Custom Cursor ── */
function CustomCursor() {
  const ref = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const el = ref.current

    const onMove = (e) => {
      if (!el) return
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) setHovering(true)
    }

    const onOut = () => setHovering(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [])

  return <div ref={ref} className={`cursor${hovering ? ' hovering' : ''}`} />
}

/* ── SplitText — letter-by-letter slideUp reveal ── */
function SplitText({ text }) {
  return (
    <span aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="char-wrap" aria-hidden="true">
          <span className="char" style={{ animationDelay: `${i * 0.038}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  )
}

/* ── Nav ── */
function Nav() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  const prefersPortuguese = i18n.language.startsWith('pt')
  let nextLang = 'en'
  let nextLangAbbrev = 'EN'
  let switchAriaKey = 'nav.switchToEnglish'
  if (!prefersPortuguese) {
    nextLang = 'pt'
    nextLangAbbrev = 'PT'
    switchAriaKey = 'nav.switchToPortuguese'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505] mix-blend-difference">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-3 px-6 py-6 md:px-12 md:py-8">
        <div className="shrink-0 text-xl font-bold tracking-[0.2em] text-white uppercase font-headline">
          {t('nav.logo')}
        </div>

        <div className="hidden md:flex gap-12">
          <a
            className="font-label text-[10px] uppercase tracking-widest text-white font-bold opacity-100 hover:opacity-100 transition-opacity duration-300"
            href="#work"
          >
            {t('nav.work')}
          </a>
          <a
            className="font-label text-[10px] uppercase tracking-widest text-[#e8e6e0] opacity-60 hover:opacity-100 transition-opacity duration-300"
            href="#about"
          >
            {t('nav.about')}
          </a>
          <a
            className="font-label text-[10px] uppercase tracking-widest text-[#e8e6e0] opacity-60 hover:opacity-100 transition-opacity duration-300"
            href="#contact"
          >
            {t('nav.contact')}
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => changeLanguage(nextLang)}
            className="font-label text-[10px] uppercase tracking-widest text-[#e8e6e0] opacity-70 transition-opacity duration-300 hover:opacity-100"
            aria-label={t(switchAriaKey)}
          >
            {nextLangAbbrev}
          </button>

          <a
            className="font-label flex items-center text-[10px] uppercase tracking-widest text-white border border-outline-variant/20 px-4 py-2 sm:px-6 hover:bg-white hover:text-black transition-all duration-300"
            href="https://www.linkedin.com/in/gabrielfasolim/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('nav.resume')}
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ── Hero ── */
function Hero() {
  const { t } = useTranslation()
  const name = t('hero.name')
  const firstName = name.split(' ')[0] || 'GABRIEL'
  const lastName = name.split(' ').slice(1).join(' ') || 'FASOLIM'

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center px-6 text-center pt-24 pb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: `url(${heroBgMobile})` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden bg-cover bg-center bg-no-repeat md:block"
        style={{ backgroundImage: `url(${heroBgDesktop})` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/85 via-background/70 to-background"
      />
      <div className="relative z-10 flex min-h-0 w-full max-w-5xl flex-1 flex-col justify-center items-center">
      <h1 className="font-headline font-extrabold text-5xl md:text-8xl lg:text-9xl tracking-[0.1em] text-primary mb-5 mt-10 uppercase leading-[0.95]">
        <span className="block">
          <SplitText text={firstName} />
        </span>
        <span className="block">
          <SplitText text={lastName} />
        </span>
      </h1>

      <p
        className="font-label text-xs md:text-sm uppercase tracking-[0.3em] text-on-surface-variant mb-12 fade-up-hero"
        style={{ animationDelay: '0.8s' }}
      >
        {t('hero.subtitle')}
      </p>

      <div
        className="max-w-2xl mx-auto fade-up-hero"
        style={{ animationDelay: '1s' }}
      >
        <p className="text-lg md:text-xl text-on-surface leading-relaxed font-body">
          {t('hero.description')}
        </p>
      </div>

      <div className="mt-auto pt-12 flex flex-col items-center gap-4 opacity-40">
        <span className="font-label text-[10px] uppercase tracking-widest">
          {t('hero.scroll')}
        </span>
        <span className="material-symbols-outlined animate-bounce">
          arrow_downward
        </span>
      </div>
      </div>
    </section>
  )
}

/* ── Marquee word — texto passa de um lado ao outro, 1–2 repetições visíveis ── */
function MarqueeWord({ text, direction = 'left', speed = 1000 }) {
  const animation = direction === 'right'
    ? `marqueeRtl ${speed}s linear infinite`
    : `marquee ${speed}s linear infinite`

  const word = (
    <span className="bleed-text font-headline font-extrabold tracking-tighter text-surface-container-highest/20 shrink-0">
      {text}
    </span>
  )
  const gap = <span className="shrink-0 inline-block w-[80vw]" />

  return (
    <div className="w-full overflow-hidden px-6 md:px-12">
      <div className="flex items-center whitespace-nowrap" style={{ animation }}>
        {word}{gap}{word}{gap}
      </div>
    </div>
  )
}

/* ── Editorial (renders inside FlowSection) ── */
function Editorial() {
  const { t } = useTranslation()
  const words = t('editorial.words', { returnObjects: true })

  return (
    <div className="w-full space-y-16 md:space-y-20">
      <div>
        <MarqueeWord text={words[0]} direction="left" speed={40} />
        <div className="relative z-10 mx-auto mt-8 w-full max-w-md px-6 md:ml-auto md:mr-0 md:px-0 md:pr-12">
          <p className="text-on-surface-variant leading-relaxed">
            {t('editorial.descriptions.0')}
          </p>
        </div>
      </div>

      <div>
        <MarqueeWord text={words[1]} direction="right" speed={52} />
        <div className="relative z-10 mx-auto mt-8 w-full max-w-md px-6 md:ml-0 md:mr-auto md:px-0 md:pl-12">
          <p className="text-on-surface-variant leading-relaxed">
            {t('editorial.descriptions.1')}
          </p>
        </div>
      </div>

      <div>
        <MarqueeWord text={words[2]} direction="left" speed={60} />
        <div className="relative z-10 mx-auto mt-8 w-full max-w-md px-6 md:ml-auto md:mr-0 md:px-0 md:pr-12">
          <p className="text-on-surface-variant leading-relaxed">
            {t('editorial.descriptions.2')}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Stats ── */
function Stats() {
  const { t } = useTranslation()
  const items = t('stats.items', { returnObjects: true })
  const [ref, inView] = useInView()

  return (
    <section className="border-y border-outline-variant/10 bg-surface-container-lowest/50 py-16 md:py-24">
      <div
        ref={ref}
        className="mx-auto grid max-w-screen-xl grid-cols-2 place-items-stretch gap-x-4 gap-y-10 px-6 text-center sm:gap-x-8 md:grid-cols-5 md:gap-12"
      >
        {items.map(({ value, label }, i) => (
          <div
            key={label}
            className={[
              'fade-up flex min-h-[5.5rem] flex-col items-center justify-start gap-2 sm:min-h-[6rem]',
              inView ? 'visible' : '',
              i === 4 ? 'col-span-2 justify-self-center md:col-span-1 md:justify-self-stretch' : '',
            ].join(' ')}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="font-headline text-2xl font-bold leading-tight sm:text-3xl">{value}</span>
            <span className="font-label text-[10px] uppercase leading-snug tracking-widest text-on-surface-variant">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Experience — single job row with its own observer ── */
function JobItem({ period, company, role, description, delay }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-3 gap-8 group fade-up${inView ? ' visible' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant pt-2">
        {period}
      </div>
      <div className="md:col-span-2">
        <h3 className="font-headline text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-500">
          {company}
        </h3>
        <p className="font-label text-[11px] text-primary-container uppercase tracking-widest mb-6">
          {role}
        </p>
        <p className="text-on-surface-variant leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

/* ── Experience (renders inside FlowSection) ── */
function Experience() {
  const { t } = useTranslation()
  const jobs = t('experience.jobs', { returnObjects: true })
  const [lineRef, lineInView] = useInView({ threshold: 0.05 })

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-16">
        <span className="font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant block mb-4">
          {t('experience.eyebrow')}
        </span>
        <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter">
          {t('experience.title')}
        </h2>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px overflow-hidden">
          <div
            ref={lineRef}
            className={`timeline-line${lineInView ? ' visible' : ''}`}
          />
        </div>

        <div className="space-y-16 md:space-y-20 md:pl-12">
          {jobs.map((job, i) => (
            <JobItem key={job.company} {...job} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Accordion item with smooth expand ── */
function AccordionItem({ title, body }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-outline-variant/20 py-8">
      <button
        role="button"
        onClick={() => setOpen((o) => !o)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-headline text-2xl">{title}</span>
        <span
          className="material-symbols-outlined transition-transform duration-300"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          arrow_outward
        </span>
      </button>

      <div
        className="overflow-hidden"
        style={{
          maxHeight: open ? '400px' : '0',
          transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="mt-6 text-on-surface-variant max-w-2xl">{body}</div>
      </div>
    </div>
  )
}

/* ── WhyMe (renders inside FlowSection) ── */
function WhyMe() {
  const { t } = useTranslation()
  const items = t('whyme.items', { returnObjects: true })

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h2 className="font-headline text-4xl font-bold mb-12 tracking-tight">
        {t('whyme.title')}
      </h2>

      <div className="border-t border-outline-variant/20">
        {items.map(({ title, body }) => (
          <AccordionItem key={title} title={title} body={body} />
        ))}
      </div>
    </div>
  )
}

/* ── Skills ── */
function Skills() {
  const { t } = useTranslation()
  const categories = t('skills.categories', { returnObjects: true })

  return (
    <section className="py-48 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-24">
        {categories.map(({ title, items }) => (
          <div key={title}>
            <h3 className="font-label text-[10px] uppercase tracking-widest text-primary mb-12">
              {title}
            </h3>
            <div className="flex flex-wrap gap-4">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 border border-outline-variant/20 font-label text-[11px] uppercase tracking-wider"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Achievements (renders inside FlowSection) ── */
function Achievements() {
  const { t } = useTranslation()
  const items = t('achievements.items', { returnObjects: true })

  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <h2 className="font-headline text-4xl font-bold mb-12 text-center tracking-tight">
        {t('achievements.title')}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/20 border border-outline-variant/20">
        {items.map(({ title, body }) => (
          <div
            key={title}
            className="bg-background p-8 hover:bg-surface-container-low transition-colors duration-500"
          >
            <h4 className="font-headline text-xl font-bold mb-4">{title}</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Flow — pinned/rotated scroll sequence ── */
const FLOW_BACKGROUNDS = ['#050505', '#0e0e0e', '#131313', '#1c1b1b']

function Flow() {
  const { t } = useTranslation()
  return (
    <FlowArt aria-label={t('flow.ariaLabel')}>
      <FlowSection
        align="center"
        innerClassName="!px-0"
        style={{ backgroundColor: FLOW_BACKGROUNDS[0] }}
        aria-label={t('flow.editorial')}
      >
        <Editorial />
      </FlowSection>
      <FlowSection
        id="work"
        align="center"
        style={{ backgroundColor: FLOW_BACKGROUNDS[1] }}
        aria-label={t('flow.experience')}
      >
        <Experience />
      </FlowSection>
      <FlowSection
        align="center"
        style={{ backgroundColor: FLOW_BACKGROUNDS[2] }}
        aria-label={t('flow.whyme')}
      >
        <WhyMe />
      </FlowSection>
      <FlowSection
        align="center"
        style={{ backgroundColor: FLOW_BACKGROUNDS[3] }}
        aria-label={t('flow.achievements')}
      >
        <Achievements />
      </FlowSection>
    </FlowArt>
  )
}

/* ── Education ── */
function Education() {
  const { t } = useTranslation()
  const entries = t('education.entries', { returnObjects: true })

  return (
    <section className="py-48 px-6 max-w-5xl mx-auto" id="about">
      <h2 className="font-headline text-4xl font-bold mb-16 tracking-tight">
        {t('education.title')}
      </h2>

      <div className="space-y-16">
        {entries.map(({ school, degree, location }) => (
          <div
            key={school}
            className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-8"
          >
            <div>
              <h3 className="font-headline text-2xl font-bold">{school}</h3>
              <p className="text-on-surface-variant">{degree}</p>
            </div>
            <span className="font-label text-[10px] uppercase tracking-widest text-primary-container">
              {location}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  const { t } = useTranslation()
  const links = t('footer.links', { returnObjects: true })

  return (
    <footer
      className="bg-[#050505] w-full px-6 md:px-12 py-20 flex flex-col md:flex-row justify-between items-start gap-12 border-t border-[#474747]/20"
      id="contact"
    >
      <div className="flex flex-col gap-6">
        <div className="text-lg font-bold text-white font-headline uppercase tracking-widest">
          {t('footer.name')}
        </div>
        <p className="font-label text-[10px] uppercase tracking-widest text-[#e8e6e0]">
          {t('footer.copy')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {links.map(({ label, href }) => (
          <a
            key={label}
            className="font-label text-[10px] uppercase tracking-widest text-[#e8e6e0] opacity-60 hover:opacity-100 transition-opacity duration-300"
            href={href}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}

/* ── App ── */
export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <div className="font-body selection:bg-primary-container selection:text-on-primary-container">
      <CustomCursor />
      <Nav />
      <Hero />
      <Stats />
      <Flow />
      <Skills />
      <Education />
      <Footer />
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

const ALIGN_MAP = {
  between: 'justify-between',
  center: 'justify-center',
  start: 'justify-start',
}

export const FlowSection = (props) => {
  const {
    id,
    className,
    innerClassName,
    style = {},
    children,
    align = 'between',
    'aria-label': ariaLabel,
  } = props
  const justify = ALIGN_MAP[align] ?? ALIGN_MAP.between
  return (
    <section
      id={id}
      data-flow-section
      aria-label={ariaLabel}
      className={cx('relative min-h-screen w-full overflow-hidden', className)}
    >
      <div
        data-flow-inner
        className={cx(
          'flow-art-container relative flex min-h-screen w-full flex-col gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]',
          justify,
          'will-change-transform',
          innerClassName,
        )}
        style={{ transformOrigin: 'bottom left', ...style }}
      >
        {children}
      </div>
    </section>
  )
}

const childCount = (children) => React.Children.count(children)

const FlowArt = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return

      const sections = Array.from(
        containerRef.current.querySelectorAll('[data-flow-section]'),
      )
      if (sections.length === 0) return

      const triggers = []

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 })

        const inner = section.querySelector('.flow-art-container')
        if (!inner) return

        if (i > 0) {
          gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' })
          const tween = gsap.to(inner, {
            rotation: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 25%',
              scrub: true,
            },
          })
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        }

        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              pin: true,
              pinSpacing: false,
            }),
          )
        }
      })

      ScrollTrigger.refresh()

      return () => {
        triggers.forEach((t) => t.kill())
      }
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  )

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden', className)}
    >
      {children}
    </main>
  )
}

export default FlowArt

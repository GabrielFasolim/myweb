import { EASE_OUT, MOTION_OK } from './constants'
import { gsap, ScrollTrigger, useGSAP } from './gsap'

const SKEW_LIMIT = 10
const SKEW_VELOCITY_RATIO = -300

export function useScrollProgress(barRef) {
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: 'max',
            scrub: 0.3,
            refreshPriority: -1,
          },
        },
      )
    })
  })
}

export function useVelocitySkew(scopeRef) {
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const targets = gsap.utils.toArray('[data-skew]', scopeRef.current)
      const setSkew = gsap.quickSetter(targets, 'skewX', 'deg')
      const clamp = gsap.utils.clamp(-SKEW_LIMIT, SKEW_LIMIT)
      const proxy = { skew: 0 }

      ScrollTrigger.create({
        trigger: scopeRef.current,
        start: 'top bottom',
        end: 'max',
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / SKEW_VELOCITY_RATIO)
          if (Math.abs(skew) <= Math.abs(proxy.skew)) return
          proxy.skew = skew
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => setSkew(proxy.skew),
          })
        },
      })
    })
  })
}

function revealPanelItems(track, containerAnimation) {
  const offscreen = (item) => item.getBoundingClientRect().left > window.innerWidth * 0.9

  gsap.utils.toArray('[data-h-reveal]', track).filter(offscreen).forEach((item) => {
    gsap.from(item, {
      y: 60,
      opacity: 0,
      rotation: 4,
      duration: 1,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: item,
        containerAnimation,
        start: 'left 90%',
        toggleActions: 'play none none reverse',
      },
    })
  })
}

export function useHorizontalScroll({ sectionRef, trackRef }) {
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const track = trackRef.current
      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0)

      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      revealPanelItems(track, slide)
    })
  })
}

export function useRevealBatch(scopeRef) {
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const items = gsap.utils.toArray('[data-reveal]', scopeRef.current)
      gsap.set(items, { y: 40, opacity: 0 })

      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 1.2, ease: EASE_OUT, stagger: 0.12 }),
      })
    })
  })
}

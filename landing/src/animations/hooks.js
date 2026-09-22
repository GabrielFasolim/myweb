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

export function useMottoAnimation(scopeRef) {
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const scope = scopeRef.current
      const chars = gsap.utils.toArray('[data-motto-char]', scope)
      const dims = gsap.utils.toArray('[data-motto-char="dim"]', scope)
      const highlights = gsap.utils.toArray('[data-motto-char="highlight"]', scope)
      const bang = scope.querySelector('[data-motto-bang]')

      gsap.set(dims, { opacity: 1 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: scope,
            start: 'top top',
            end: '+=220%',
            pin: true,
            scrub: 1,
          },
        })
        .from(chars, { yPercent: 110, opacity: 0, duration: 1, stagger: 0.05, ease: EASE_OUT })
        .to(dims, { opacity: 0.12, duration: 1, stagger: 0.03, ease: 'power2.inOut' }, '+=0.6')
        .fromTo(
          bang,
          { maxWidth: 0, yPercent: -160, rotation: -35, opacity: 0 },
          { maxWidth: '1em', yPercent: 0, rotation: 0, opacity: 1, duration: 0.9, ease: 'back.out(2.5)' },
          '<0.5',
        )
        .to(highlights, { yPercent: -6, duration: 0.4, stagger: 0.04, yoyo: true, repeat: 1, ease: 'power2.out' }, '<0.4')
        .to({}, { duration: 0.8 })
    })
  })
}

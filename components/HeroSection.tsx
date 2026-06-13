'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

export default function HeroSection() {
  const t = useTranslations('hero')
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Background card: 3D tilt back + shrink
  const bgRotateX = useTransform(scrollYProgress, [0, 0.7], [0, -10])
  const bgScale   = useTransform(scrollYProgress, [0, 1],   [1, 0.94])

  // Video: independent parallax (lags behind) + zoom
  const videoY     = useTransform(scrollYProgress, [0, 1], [0, 140])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  // Progressive darkening
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.55])

  // Content: lifts up + fades
  const contentY       = useTransform(scrollYProgress, [0, 0.7],  [0, -65])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])

  // Scroll indicator
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [0.55, 0])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '640px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        background: '#0a0a0a',
      }}
    >
      {/* ── BACKGROUND CARD: 3D tilt on scroll ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          rotateX: bgRotateX,
          scale: bgScale,
          transformOrigin: 'center top',
          willChange: 'transform',
        }}
      >
        {/* Video with independent parallax + zoom */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-2%',
            right: '-2%',
            bottom: '-30%',
            y: videoY,
            scale: videoScale,
            willChange: 'transform',
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/14526896_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Base overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.75) 100%)',
        }} />

        {/* Radial vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(8,8,8,0.7) 100%)',
        }} />

        {/* Scroll-driven darkening */}
        <motion.div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: '#050505',
          opacity: overlayOpacity,
        }} />

        {/* Three.js canvas */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <HeroCanvas />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '220px', zIndex: 5, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
      }} />

      {/* ── CONTENT ── */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '920px',
          y: contentY,
          opacity: contentOpacity,
          willChange: 'transform, opacity',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}
        >
          <span style={{ width: '32px', height: '1px', background: 'var(--gold-primary)', opacity: 0.7 }} />
          <span style={{
            color: 'var(--gold-primary)',
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.3em',
            textTransform: 'uppercase', fontFamily: 'var(--font-body)',
          }}>
            {t('location')}
          </span>
          <span style={{ width: '32px', height: '1px', background: 'var(--gold-primary)', opacity: 0.7 }} />
        </motion.div>

        {/* Title 1 */}
        <motion.h1
          className="font-display"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(56px, 11vw, 118px)', lineHeight: 0.92,
            color: 'var(--text-primary)', margin: '0 0 4px',
          }}
        >
          {t('title1')}
        </motion.h1>

        {/* Title 2 */}
        <motion.h1
          className="font-display gradient-text-gold"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(56px, 11vw, 118px)', lineHeight: 0.92, margin: '0 0 32px' }}
        >
          {t('title2')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            fontWeight: 400, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: '52px',
            fontFamily: 'var(--font-body)',
          }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#contacte"
            style={{
              background: 'var(--gold-primary)', color: '#1a1a1a',
              fontWeight: 700, fontSize: '14px', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '16px 38px',
              borderRadius: 'var(--radius-sm)', textDecoration: 'none',
              fontFamily: 'var(--font-body)', transition: 'all 0.2s ease',
              boxShadow: '0 4px 28px rgba(232,160,32,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--gold-light)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(232,160,32,0.4)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--gold-primary)'
              e.currentTarget.style.boxShadow = '0 4px 28px rgba(232,160,32,0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {t('cta_primary')}
          </a>
          <a
            href="#projectes"
            style={{
              background: 'transparent', color: '#ffffff',
              fontWeight: 400, fontSize: '14px', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '15.5px 38px',
              borderRadius: 'var(--radius-sm)', textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--gold-primary)'
              e.currentTarget.style.color = 'var(--gold-primary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
              e.currentTarget.style.color = '#ffffff'
            }}
          >
            {t('cta_secondary')}
          </a>
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute', bottom: '36px',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <motion.div
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '8px',
            opacity: indicatorOpacity,
          }}
        >
          <span style={{
            fontSize: '9px', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
          }}>Scroll</span>
          <div style={{
            width: '22px', height: '36px',
            border: '1px solid rgba(232,160,32,0.35)',
            borderRadius: '11px', display: 'flex',
            justifyContent: 'center', paddingTop: '7px',
          }}>
            <div style={{
              width: '3px', height: '7px',
              background: 'var(--gold-primary)', borderRadius: '2px',
              animation: 'bounce-scroll 1.6s ease-in-out infinite',
            }} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

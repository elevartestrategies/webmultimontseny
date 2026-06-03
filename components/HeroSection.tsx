'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '640px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #111111 0%, var(--bg-primary) 60%, #151515 100%)',
      }}
    >
      <HeroCanvas />

      {/* Radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(18,18,18,0.65) 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '220px',
          background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '920px',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          <span style={{ width: '32px', height: '1px', background: 'var(--gold-primary)', opacity: 0.7 }} />
          <span
            style={{
              color: 'var(--gold-primary)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('location')}
          </span>
          <span style={{ width: '32px', height: '1px', background: 'var(--gold-primary)', opacity: 0.7 }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(56px, 11vw, 118px)',
            lineHeight: 0.92,
            color: 'var(--text-primary)',
            margin: '0 0 4px',
          }}
        >
          {t('title1')}
        </motion.h1>

        <motion.h1
          className="font-display gradient-text-gold"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(56px, 11vw, 118px)',
            lineHeight: 0.92,
            margin: '0 0 32px',
          }}
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
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '52px',
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
              background: 'var(--gold-primary)',
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '16px 38px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s ease',
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
              background: 'transparent',
              color: '#ffffff',
              fontWeight: 400,
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '15.5px 38px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '22px',
            height: '36px',
            border: '1px solid rgba(232,160,32,0.35)',
            borderRadius: '11px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '7px',
          }}
        >
          <div
            style={{
              width: '3px',
              height: '7px',
              background: 'var(--gold-primary)',
              borderRadius: '2px',
              animation: 'bounce-scroll 1.6s ease-in-out infinite',
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}

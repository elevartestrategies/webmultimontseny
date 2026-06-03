'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < count ? 'var(--gold-primary)' : 'none'}
          stroke={i < count ? 'var(--gold-primary)' : 'var(--text-muted)'}
          strokeWidth={1.5}
          style={{ width: 18, height: 18, flexShrink: 0 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const t = useTranslations('testimonis')
  const items = t.raw('items') as { name: string; location: string; rating: number; text: string; date: string }[]

  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const [paused, setPaused] = useState(false)

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % items.length)
    }, 5000)
  }

  useEffect(() => {
    if (!paused) startInterval()
    return () => clearInterval(intervalRef.current!)
  }, [paused, items.length])

  const goTo = (i: number) => {
    setActive(i)
    clearInterval(intervalRef.current!)
    startInterval()
  }

  const current = items[active]

  return (
    <section
      id="testimonis"
      style={{
        background: 'var(--bg-primary)',
        padding: 'var(--section-py) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large quote mark */}
      <div
        style={{
          position: 'absolute',
          top: '48px',
          left: '48px',
          fontSize: '220px',
          lineHeight: 1,
          color: 'rgba(232,160,32,0.04)',
          fontFamily: 'Georgia, serif',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        "
      </div>

      <div
        style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', lineHeight: 1 }}
          >
            {t('title')}{' '}
            <span style={{ color: 'var(--gold-primary)' }}>{t('title_accent')}</span>
          </h2>
        </motion.div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(2rem, 5vw, 3rem) clamp(2rem, 5vw, 4rem)',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <Stars count={current.rating} />
            </div>

            <blockquote
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                lineHeight: 1.8,
                fontStyle: 'italic',
                fontWeight: 300,
                fontFamily: 'var(--font-body)',
                margin: '0 0 24px',
              }}
            >
              "{current.text}"
            </blockquote>

            <p
              style={{
                color: 'var(--gold-primary)',
                fontWeight: 500,
                fontSize: '15px',
                fontFamily: 'var(--font-body)',
                margin: '0 0 4px',
              }}
            >
              {current.name}
            </p>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                margin: 0,
              }}
            >
              {current.location} · {current.date}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '28px',
          }}
        >
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === active ? 'var(--gold-primary)' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
                opacity: i === active ? 1 : 0.4,
              }}
              aria-label={`Testimoni ${i + 1}`}
            />
          ))}
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: '28px',
            color: 'var(--text-muted)',
            fontSize: '12px',
            fontFamily: 'var(--font-body)',
          }}
        >
          {t('google_text')}
        </p>
      </div>
    </section>
  )
}

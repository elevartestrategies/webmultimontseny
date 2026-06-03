'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function AnimatedNumber({
  value,
  suffix,
}: {
  value: number
  suffix: string
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 2000
          const start = performance.now()
          const isDecimal = value % 1 !== 0
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = easeOutCubic(progress)
            const current = eased * value
            setDisplay(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  const isDecimal = value % 1 !== 0
  return <span ref={ref}>{isDecimal ? display.toFixed(1) : display}{suffix}</span>
}

export default function StatsCounter() {
  const t = useTranslations('stats')
  const items = t.raw('items') as { value: number; suffix: string; label: string; sublabel?: string }[]
  const features = t.raw('features') as { title: string; desc: string }[]

  return (
    <section
      id="nosaltres"
      style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--section-py) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(232,160,32,0.035) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', lineHeight: 1, marginBottom: '16px' }}
          >
            {t('title')}{' '}
            <span style={{ color: 'var(--gold-primary)' }}>{t('title_accent')}</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '15px',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.7,
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
          }}
          className="stats-grid"
        >
          {items.map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: 'clamp(28px, 4vw, 48px) 24px',
                textAlign: 'center',
                borderRight: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <div
                className="font-display gradient-text-gold"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 1,
                  marginBottom: '10px',
                  display: 'block',
                }}
              >
                <AnimatedNumber value={item.value} suffix={item.suffix} />
              </div>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                  margin: 0,
                }}
              >
                {item.label}
              </p>
              {item.sublabel && (
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '11px',
                    fontFamily: 'var(--font-body)',
                    marginTop: '4px',
                  }}
                >
                  {item.sublabel}
                </p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginTop: '24px',
          }}
        >
          {features.map(({ title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '1.25rem 1.5rem',
                background: 'var(--bg-card)',
                borderRadius: `0 var(--radius-md) var(--radius-md) 0`,
                borderLeft: '3px solid var(--gold-primary)',
              }}
            >
              <div>
                <h4
                  style={{
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    fontSize: '15px',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}

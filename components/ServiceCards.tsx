'use client'

import { useRef, MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Hammer, Building2, Waves, Zap, Leaf, Paintbrush } from 'lucide-react'

const ICONS = [Hammer, Building2, Waves, Zap, Leaf, Paintbrush]

function ServiceCard({
  icon: Icon,
  title,
  desc,
  more,
  index,
}: {
  icon: typeof Hammer
  title: string
  desc: string
  more: string
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.1s ease'
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -16
    const rotateY = (x - 0.5) * 16
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`

    const shimmer = card.querySelector('.card-shimmer') as HTMLElement | null
    if (shimmer) {
      shimmer.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(232,160,32,0.09) 0%, transparent 60%)`
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.4s ease'
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    const shimmer = card.querySelector('.card-shimmer') as HTMLElement | null
    if (shimmer) shimmer.style.background = 'none'
  }

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (card) {
      card.style.borderColor = 'var(--border-gold)'
      card.style.background = 'var(--bg-card-hover)'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'default',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s ease, border-color 0.25s ease, background 0.25s ease',
          height: '100%',
        }}
      >
        {/* Shimmer layer */}
        <div
          className="card-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'var(--radius-lg)',
            pointerEvents: 'none',
            transition: 'background 0.1s ease',
          }}
        />

        {/* Icon */}
        <div
          style={{
            display: 'inline-flex',
            padding: '0.75rem',
            background: 'var(--gold-muted)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
            color: 'var(--gold-primary)',
          }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3
          className="font-display"
          style={{
            fontSize: '24px',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
          }}
        >
          {title}
        </h3>

        {/* Desc */}
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '14px',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          {desc}
        </p>

        {/* More link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--gold-primary)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-body)',
          }}
        >
          <span>{more}</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 13, height: 13 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServiceCards() {
  const t = useTranslations('serveis')
  const items = t.raw('items') as { title: string; desc: string }[]

  return (
    <section
      id="serveis"
      style={{
        background: 'var(--bg-primary)',
        padding: 'var(--section-py) 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '20px',
          }}
        >
          {items.map((item, i) => (
            <ServiceCard
              key={item.title}
              icon={ICONS[i]}
              title={item.title}
              desc={item.desc}
              more={t('more')}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

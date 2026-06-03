'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

type CategoryKey = 'tots' | 'reformes' | 'piscines' | 'construccio' | 'installacions'

const CATEGORY_KEYS: CategoryKey[] = ['tots', 'reformes', 'piscines', 'construccio', 'installacions']

const PROJECTS = [
  { id: 1, title_ca: 'Reforma integral cuina', title_es: 'Reforma integral cocina', cat: 'reformes', aspect: 'tall', bg: '#2a2218' },
  { id: 2, title_ca: 'Piscina amb jardí', title_es: 'Piscina con jardín', cat: 'piscines', aspect: 'wide', bg: '#18222a' },
  { id: 3, title_ca: 'Casa nova a Vallgorguina', title_es: 'Casa nueva en Vallgorguina', cat: 'construccio', aspect: 'tall', bg: '#1e2a18' },
  { id: 4, title_ca: 'Bany de disseny', title_es: 'Baño de diseño', cat: 'reformes', aspect: 'square', bg: '#2a1e18' },
  { id: 5, title_ca: 'Piscina desbordant', title_es: 'Piscina desbordante', cat: 'piscines', aspect: 'wide', bg: '#18202a' },
  { id: 6, title_ca: 'Instal·lació elèctrica', title_es: 'Instalación eléctrica', cat: 'installacions', aspect: 'square', bg: '#20182a' },
  { id: 7, title_ca: 'Ampliació habitatge', title_es: 'Ampliación vivienda', cat: 'construccio', aspect: 'wide', bg: '#20221a' },
  { id: 8, title_ca: 'Reforma saló-menjador', title_es: 'Reforma salón-comedor', cat: 'reformes', aspect: 'tall', bg: '#2a2018' },
]

export default function Gallery() {
  const t = useTranslations('gallery')
  const cats = t.raw('categories') as Record<string, string>
  const [activeKey, setActiveKey] = useState<CategoryKey>('tots')
  const [lightbox, setLightbox] = useState<typeof PROJECTS[0] | null>(null)

  const isCA = true // We'll simplify: titles are in ca.json/es.json but project data is static here

  const filtered = activeKey === 'tots'
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === activeKey)

  return (
    <section
      id="projectes"
      style={{ background: 'var(--bg-primary)', padding: 'var(--section-py) 24px' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '44px' }}
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
              maxWidth: '520px',
              margin: '0 auto 28px',
              lineHeight: 1.7,
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('subtitle')}
          </p>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORY_KEYS.map(key => (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '100px',
                  border: `1px solid ${activeKey === key ? 'var(--gold-primary)' : 'var(--border-subtle)'}`,
                  background: 'transparent',
                  color: activeKey === key ? 'var(--gold-primary)' : 'var(--text-secondary)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: 400,
                }}
                onMouseEnter={e => {
                  if (activeKey !== key) e.currentTarget.style.borderColor = 'rgba(232,160,32,0.45)'
                }}
                onMouseLeave={e => {
                  if (activeKey !== key) e.currentTarget.style.borderColor = 'var(--border-subtle)'
                }}
              >
                {cats[key]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry grid */}
        <div style={{ columns: 'auto 270px', columnGap: '14px' }}>
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setLightbox(project)}
              style={{
                breakInside: 'avoid',
                marginBottom: '14px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                aspectRatio: project.aspect === 'tall' ? '3/4' : project.aspect === 'wide' ? '16/9' : '1/1',
                background: project.bg,
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4, delay: i * 0.06, scale: { duration: 0.25 } }}
            >
              {/* Placeholder image slot */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.07)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 40, height: 40 }}>
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              </div>

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0) 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '18px',
                }}
              >
                <h3
                  className="font-display"
                  style={{ color: '#fff', fontSize: '20px', margin: 0 }}
                >
                  {project.title_ca}
                </h3>
              </motion.div>

              {/* Category badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(232,160,32,0.9)',
                  color: '#1a1a1a',
                  borderRadius: 'var(--radius-sm)',
                  padding: '3px 9px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {cats[project.cat as CategoryKey]}
              </div>
            </motion.div>
          ))}
        </div>

        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '12px',
            marginTop: '28px',
            fontFamily: 'var(--font-body)',
          }}
        >
          * {t('note')}
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.88)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                maxWidth: '720px',
                width: '100%',
                border: '1px solid var(--border-gold)',
              }}
            >
              <div
                style={{
                  aspectRatio: '16/9',
                  background: lightbox.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.08)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 64, height: 64 }}>
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              </div>
              <div style={{ padding: '24px' }}>
                <span
                  style={{
                    color: 'var(--gold-primary)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {cats[lightbox.cat as CategoryKey]}
                </span>
                <h3
                  className="font-display"
                  style={{ color: '#fff', fontSize: '26px', marginTop: '4px', marginBottom: '16px' }}
                >
                  {lightbox.title_ca}
                </h3>
                <button
                  onClick={() => setLightbox(null)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    padding: '8px 20px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {t('close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

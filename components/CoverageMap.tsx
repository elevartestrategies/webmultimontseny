'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function CoverageMap() {
  const t = useTranslations('zona')
  const areas = t.raw('areas') as string[]

  return (
    <section
      id="zona"
      style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--section-py) 24px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px',
            alignItems: 'center',
          }}
        >
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(38px, 5vw, 58px)',
                lineHeight: 1,
                marginBottom: '24px',
              }}
            >
              {t('title')}{' '}
              <span style={{ color: 'var(--gold-primary)' }}>{t('title_accent')}</span>
            </h2>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '15px',
                lineHeight: 1.75,
                marginBottom: '28px',
                fontFamily: 'var(--font-body)',
              }}
              dangerouslySetInnerHTML={{
                __html: (t.raw('description') as string)
                  .replace(/<gold>/g, '<strong style="color:var(--gold-primary)">')
                  .replace(/<\/gold>/g, '</strong>'),
              }}
            />

            {/* Area pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
              {areas.map(area => (
                <span
                  key={area}
                  style={{
                    padding: '5px 13px',
                    borderRadius: '100px',
                    border: '1px solid var(--border-gold)',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--gold-primary)'
                    e.currentTarget.style.color = 'var(--gold-primary)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-gold)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                >
                  {area}
                </span>
              ))}
            </div>

            {/* SEO text */}
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '11px',
                lineHeight: 1.8,
                fontFamily: 'var(--font-body)',
                opacity: 0.7,
              }}
            >
              {t('seo_text')}
            </p>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23969.91399780!2d2.4734!3d41.6862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a557d9e22fdebd%3A0x4b78ea07c39b0a!2s08470%20Sant%20Celoni%2C%20Barcelona!5e0!3m2!1sca!2ses!4v1733318400000"
                width="100%"
                height="420"
                style={{
                  border: 0,
                  display: 'block',
                  filter: 'invert(90%) hue-rotate(180deg)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicació Multimontseny — Sant Celoni"
              />
            </div>

            {/* Pin info below map */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '16px',
                padding: '14px 16px',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-primary))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg viewBox="0 0 24 24" fill="#1a1a1a" style={{ width: 16, height: 16 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'var(--font-body)',
                    margin: '0 0 2px',
                  }}
                >
                  {t('pin_city')}
                </p>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                  }}
                >
                  {t('pin_address')} · {t('pin_postal')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

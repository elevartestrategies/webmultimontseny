'use client'

import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const services = t.raw('services') as string[]
  const hours = t.raw('hours') as { days: string; time: string }[]
  const legal = t.raw('legal') as string[]

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: 'clamp(40px, 6vw, 72px) 24px 28px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-primary))',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#1a1a1a',
                }}
              >
                M
              </div>
              <span
                className="font-display"
                style={{ fontSize: '17px', color: '#fff', letterSpacing: '0.06em' }}
              >
                MULTIMONTSENY
              </span>
            </div>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '13px',
                lineHeight: 1.65,
                maxWidth: '240px',
                fontFamily: 'var(--font-body)',
                marginBottom: '18px',
              }}
            >
              {t('tagline')}
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                {
                  label: 'Facebook',
                  href: 'https://www.facebook.com/multimontseny',
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/multimontseny',
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--gold-primary)'
                    e.currentTarget.style.borderColor = 'var(--gold-primary)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  }}
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                color: 'var(--gold-primary)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                marginBottom: '16px',
              }}
            >
              {t('services_title')}
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {services.map(s => (
                <li key={s}>
                  <a
                    href="#serveis"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: 'var(--font-body)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: 'var(--gold-primary)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                marginBottom: '16px',
              }}
            >
              {t('contact_title')}
            </h4>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {t('address_label')}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                  Plaça del Bestiar, 27<br />08470 Sant Celoni<br />Barcelona
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {t('phones_label')}
                </p>
                {['tel:+34930166330', 'tel:+34640746129'].map((href, i) => (
                  <a
                    key={href}
                    href={href}
                    style={{
                      display: 'block',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)',
                      transition: 'color 0.2s ease',
                      marginBottom: i === 0 ? '2px' : 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {i === 0 ? '930 166 330' : '640 746 129'}
                  </a>
                ))}
                <a
                  href="mailto:info@multimontseny.com"
                  style={{
                    display: 'block',
                    marginTop: '6px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  info@multimontseny.com
                </a>
              </div>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h4
              style={{
                color: 'var(--gold-primary)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                marginBottom: '16px',
              }}
            >
              {t('hours_title')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {hours.map(({ days, time }) => (
                <div
                  key={days}
                  style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}
                >
                  <span
                    style={{ color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--font-body)' }}
                  >
                    {days}
                  </span>
                  <span
                    style={{ color: 'var(--text-secondary)', fontSize: '13px', fontFamily: 'var(--font-body)' }}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '20px' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '12px',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}
          >
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {legal.map(l => (
              <a
                key={l}
                href="#"
                style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

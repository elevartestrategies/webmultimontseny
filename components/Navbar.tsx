'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const NAV_KEYS = ['serveis', 'projectes', 'nosaltres', 'testimonis', 'contacte'] as const
const NAV_HREFS: Record<string, string> = {
  serveis: '#serveis',
  projectes: '#projectes',
  nosaltres: '#nosaltres',
  testimonis: '#testimonis',
  contacte: '#contacte',
}

export default function Navbar() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const currentLocale = pathname.startsWith('/es') ? 'es' : 'ca'

  const switchLocale = (locale: string) => {
    const newPath = locale === 'ca'
      ? pathname.replace(/^\/es/, '/ca')
      : pathname.replace(/^\/ca/, '/es')
    router.push(newPath)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(26,26,26,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        {/* Logo */}
        <a
          href="/ca"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo.jpg"
              alt="Multimontseny"
              width={36}
              height={36}
              style={{
                objectFit: 'cover',
                objectPosition: '50% 30%',
                display: 'block',
              }}
              priority
            />
          </div>
          <span
            className="font-display"
            style={{ fontSize: '19px', color: '#ffffff', letterSpacing: '0.06em' }}
          >
            MULTIMONTSENY
          </span>
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: '28px',
            listStyle: 'none',
            alignItems: 'center',
            margin: 0,
            padding: 0,
          }}
          className="hidden md:flex"
        >
          {NAV_KEYS.map(key => (
            <li key={key}>
              <a
                href={NAV_HREFS[key]}
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: locale switcher + CTA */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}
          className="hidden md:flex"
        >
          {/* Locale switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.05em',
            }}
          >
            {(['ca', 'es'] as const).map((loc, i) => (
              <React.Fragment key={loc}>
                {i > 0 && (
                  <span style={{ color: 'var(--text-muted)', lineHeight: 1 }}>/</span>
                )}
                <button
                  onClick={() => switchLocale(loc)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 4px',
                    color: currentLocale === loc ? 'var(--gold-primary)' : 'var(--text-muted)',
                    fontWeight: currentLocale === loc ? 600 : 400,
                    fontSize: '12px',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {loc.toUpperCase()}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contacte"
            style={{
              background: 'var(--gold-primary)',
              color: '#1a1a1a',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '9px 20px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--gold-light)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--gold-primary)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {t('pressupost')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Obrir menú"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--gold-primary)',
                borderRadius: '2px',
                display: 'block',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: menuOpen
                  ? i === 0
                    ? 'rotate(45deg) translate(4.5px, 4.5px)'
                    : i === 1
                    ? 'scaleX(0)'
                    : 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(26,26,26,0.98)',
            backdropFilter: 'blur(20px)',
            padding: '16px 24px 28px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_KEYS.map(key => (
              <li key={key}>
                <a
                  href={NAV_HREFS[key]}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '22px',
                    padding: '11px 0',
                    borderBottom: '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {t(key)}
                </a>
              </li>
            ))}
            <li style={{ marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <a
                href="#contacte"
                onClick={() => setMenuOpen(false)}
                style={{
                  flex: 1,
                  display: 'block',
                  background: 'var(--gold-primary)',
                  color: '#1a1a1a',
                  fontWeight: 600,
                  fontSize: '14px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '13px 24px',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t('pressupost')}
              </a>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['ca', 'es'] as const).map(loc => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    style={{
                      background: currentLocale === loc ? 'rgba(232,160,32,0.15)' : 'transparent',
                      border: `1px solid ${currentLocale === loc ? 'var(--gold-primary)' : 'var(--border-subtle)'}`,
                      color: currentLocale === loc ? 'var(--gold-primary)' : 'var(--text-muted)',
                      fontWeight: currentLocale === loc ? 600 : 400,
                      fontSize: '12px',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

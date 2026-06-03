'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

type Status = 'idle' | 'sending' | 'ok' | 'error'

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-md)',
  padding: '0.875rem 1rem',
  color: 'var(--text-primary)',
  fontSize: '15px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
}

const labelBase: React.CSSProperties = {
  display: 'block',
  color: 'var(--text-secondary)',
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontFamily: 'var(--font-body)',
  fontWeight: 400,
  marginBottom: '8px',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelBase}>{label}</label>
      {children}
    </div>
  )
}

const focusStyle = (el: HTMLElement) => {
  el.style.borderColor = 'var(--gold-primary)'
  el.style.boxShadow = '0 0 0 3px rgba(232,160,32,0.1)'
}
const blurStyle = (el: HTMLElement) => {
  el.style.borderColor = 'var(--border-subtle)'
  el.style.boxShadow = 'none'
}

export default function ContactForm() {
  const t = useTranslations('contacte')
  const services = t.raw('services') as { value: string; label: string }[]
  const altContacts = t.raw('alt_contacts') as { label: string; value: string; href: string; icon: string }[]

  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', phone: '', service: '', description: '', location: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'ok' : 'error')
      if (res.ok) setForm({ name: '', phone: '', service: '', description: '', location: '' })
    } catch {
      setStatus('error')
    }
  }

  const form_t = t.raw('form') as Record<string, string>

  return (
    <section
      id="contacte"
      style={{
        background: 'var(--bg-primary)',
        padding: 'var(--section-py) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          right: '-80px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(232,160,32,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
            style={{ fontSize: 'clamp(38px, 5.5vw, 62px)', lineHeight: 1, marginBottom: '16px' }}
          >
            {t('title')}{' '}
            <span style={{ color: 'var(--gold-primary)' }}>{t('title_accent')}</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '15px',
              lineHeight: 1.7,
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(28px, 5vw, 48px)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '18px',
              marginBottom: '18px',
            }}
          >
            <Field label={form_t.name_label}>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder={form_t.name_placeholder}
                style={{ ...inputBase, '::placeholder': { color: 'var(--text-muted)' } } as React.CSSProperties}
                onFocus={e => focusStyle(e.target)}
                onBlur={e => blurStyle(e.target)}
              />
            </Field>
            <Field label={form_t.phone_label}>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder={form_t.phone_placeholder}
                style={inputBase}
                onFocus={e => focusStyle(e.target)}
                onBlur={e => blurStyle(e.target)}
              />
            </Field>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '18px',
              marginBottom: '18px',
            }}
          >
            <Field label={form_t.service_label}>
              <div style={{ position: 'relative' }}>
                <select
                  required
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  style={{
                    ...inputBase,
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    paddingRight: '38px',
                  }}
                  onFocus={e => focusStyle(e.target)}
                  onBlur={e => blurStyle(e.target)}
                >
                  <option value="" style={{ background: 'var(--bg-card)' }}>
                    {form_t.service_placeholder}
                  </option>
                  {services.map(s => (
                    <option key={s.value} value={s.value} style={{ background: 'var(--bg-card)' }}>
                      {s.label}
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="var(--gold-primary)"
                  strokeWidth={2}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '14px',
                    height: '14px',
                    pointerEvents: 'none',
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
                </svg>
              </div>
            </Field>
            <Field label={form_t.location_label}>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                placeholder={form_t.location_placeholder}
                style={inputBase}
                onFocus={e => focusStyle(e.target)}
                onBlur={e => blurStyle(e.target)}
              />
            </Field>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <Field label={form_t.desc_label}>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder={form_t.desc_placeholder}
                rows={4}
                style={{ ...inputBase, resize: 'vertical', minHeight: '100px' }}
                onFocus={e => focusStyle(e.target)}
                onBlur={e => blurStyle(e.target)}
              />
            </Field>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              width: '100%',
              background: status === 'sending' ? 'var(--text-muted)' : 'var(--gold-primary)',
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s ease',
              boxShadow: status === 'sending' ? 'none' : '0 4px 20px rgba(232,160,32,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
            onMouseEnter={e => {
              if (status !== 'sending') {
                e.currentTarget.style.background = 'var(--gold-light)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(232,160,32,0.3)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = status === 'sending' ? 'var(--text-muted)' : 'var(--gold-primary)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = status === 'sending' ? 'none' : '0 4px 20px rgba(232,160,32,0.2)'
            }}
          >
            {status === 'sending' ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }}
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                {form_t.submitting}
              </>
            ) : status === 'ok' ? (
              <>
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 18, height: 18 }}>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {form_t.success}
              </>
            ) : (
              form_t.submit
            )}
          </button>

          {status === 'error' && (
            <p
              style={{
                marginTop: '12px',
                padding: '12px 16px',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 'var(--radius-md)',
                color: '#f87171',
                textAlign: 'center',
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
              }}
            >
              {form_t.error}{' '}
              <a href="tel:+34930166330" style={{ color: 'var(--gold-primary)' }}>
                930 166 330
              </a>
            </p>
          )}

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '12px',
              textAlign: 'center',
              marginTop: '16px',
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('privacy')}
          </p>
        </motion.form>

        {/* Alt contacts */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '32px',
            flexWrap: 'wrap',
          }}
        >
          {altContacts.map(c => (
            <a
              key={c.label}
              href={c.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                padding: '14px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.2s ease',
                minWidth: '140px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-gold)'
                e.currentTarget.style.background = 'var(--bg-card-hover)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.background = 'var(--bg-card)'
              }}
            >
              <span
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {c.label}
              </span>
              <span
                style={{
                  color: 'var(--gold-primary)',
                  fontWeight: 500,
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {c.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}

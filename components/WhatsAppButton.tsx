'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

const WA_MESSAGE = "Hola! M'agradaria demanar un pressupost per a una reforma/piscina/instal·lació."
const WA_NUMBER = "34640746129"
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

export default function WhatsAppButton() {
  const t = useTranslations('footer')
  const [visible, setVisible] = useState(false)
  const [tooltip, setTooltip] = useState(false)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t1)
  }, [])

  // Trigger bounce+rings every 4s
  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 1200)
    }, 4000)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 9999,
          }}
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
        >
          {/* Rings */}
          {pulse && (
            <>
              <span
                key="ring1"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid #25D366',
                  animation: 'ring-expand 1s ease-out forwards',
                }}
              />
              <span
                key="ring2"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid #25D366',
                  animation: 'ring-expand-2 1s ease-out 0.3s forwards',
                }}
              />
            </>
          )}

          {/* Button */}
          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('wa_tooltip')}
            animate={pulse ? { scale: [1, 1.15, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              backgroundColor: '#25D366',
              boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
              cursor: 'pointer',
              textDecoration: 'none',
              position: 'relative',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              style={{ width: '28px', height: '28px' }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </motion.a>

          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  right: '68px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                {t('wa_tooltip')}
                <span
                  style={{
                    position: 'absolute',
                    right: '-5px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderLeft: '5px solid var(--bg-card)',
                  }}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

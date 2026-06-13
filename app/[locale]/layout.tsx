import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import '../globals.css'

const locales = ['ca', 'es']

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const icons = {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  }

  if (locale === 'es') {
    return {
      title: 'Multimontseny | Reformas, Construcción y Piscinas en Sant Celoni',
      description:
        'Empresa de reformas integrales, construcción y piscinas en el Vallès Oriental. Más de 10 años de experiencia. Presupuesto gratuito. Tel: 930 166 330',
      keywords: ['reformas sant celoni', 'construcción sant celoni', 'piscinas sant celoni', 'empresa reformas vallès oriental'],
      icons,
      alternates: {
        canonical: 'https://multimontseny.es/es',
        languages: { ca: 'https://multimontseny.es/ca' },
      },
      openGraph: {
        title: 'Multimontseny | Reformas y Construcción Sant Celoni',
        description: 'Tu equipo de confianza para reformas, construcción y piscinas en Sant Celoni.',
        locale: 'es_ES',
        type: 'website',
      },
    }
  }
  return {
    title: 'Multimontseny | Reformes, Construcció i Piscines a Sant Celoni',
    description:
      "Empresa de reformes integrals, construcció i piscines al Vallès Oriental. Més de 10 anys d'experiència. Pressupost gratuït. Tel: 930 166 330",
    keywords: ['reformes sant celoni', 'construcció sant celoni', 'piscines sant celoni', 'empresa reformes vallès oriental'],
    icons,
    alternates: {
      canonical: 'https://multimontseny.es/ca',
      languages: { es: 'https://multimontseny.es/es' },
    },
    openGraph: {
      title: 'Multimontseny | Reformes i Construcció Sant Celoni',
      description: "El teu equip de confiança per a reformes, construcció i piscines a Sant Celoni.",
      locale: 'ca_ES',
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Multimontseny Serveis i Manteniments S.L.',
  telephone: ['+34930166330', '+34640746129'],
  email: 'info@multimontseny.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plaça del Bestiar, 27',
    addressLocality: 'Sant Celoni',
    postalCode: '08470',
    addressRegion: 'Barcelona',
    addressCountry: 'ES',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 41.6894, longitude: 2.4958 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday'], opens: '09:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '19:00' },
  ],
  areaServed: ['Sant Celoni','Gualba','Vallgorguina','Santa Maria de Palautordera','Montseny','Vallès Oriental'],
  priceRange: '€€',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.4', reviewCount: '68' },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}

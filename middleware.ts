import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['ca', 'es'],
  defaultLocale: 'ca',
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

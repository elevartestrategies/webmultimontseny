import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, service, description, location } = body

    if (!name || !phone || !service) {
      return NextResponse.json({ error: 'Camps obligatoris' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set')
      return NextResponse.json({ error: 'Config error' }, { status: 500 })
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1e1e1e; color: #ffffff; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #b87818, #e8a020); padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 24px; color: #1e1e1e;">Nova sol·licitud de pressupost</h1>
          <p style="margin: 4px 0 0; color: #1e1e1e; opacity: 0.8;">Multimontseny · Web</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #a0a0a0; width: 140px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Nom</td>
              <td style="padding: 10px 0; color: #ffffff; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #a0a0a0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Telèfon</td>
              <td style="padding: 10px 0; color: #e8a020; font-weight: 600;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #a0a0a0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Servei</td>
              <td style="padding: 10px 0; color: #ffffff;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #a0a0a0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Localitat</td>
              <td style="padding: 10px 0; color: #ffffff;">${location || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #a0a0a0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Descripció</td>
              <td style="padding: 10px 0; color: #ffffff; line-height: 1.5;">${description || '-'}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 16px 32px; background: #161616; font-size: 12px; color: #444;">
          Rebut via multimontseny.com · ${new Date().toLocaleString('ca-ES')}
        </div>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'web@multimontseny.com',
        to: ['info@multimontseny.com'],
        reply_to: undefined,
        subject: `Nova sol·licitud: ${service} — ${name}`,
        html: emailHtml,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ error: 'Email error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact route error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

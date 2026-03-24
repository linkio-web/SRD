// MODIFIED: Real email submission via Resend
// Variables d'environnement requises :
//   RESEND_API_KEY   → Clé API Resend (https://resend.com/api-keys)
//   CONTACT_EMAIL    → Email destinataire (ex: cremilde.hirschi@srdpartners.ch)
//   RESEND_FROM      → Expéditeur vérifié (ex: noreply@srdpartners.ch)
//                      Le domaine doit être vérifié dans Resend.
//                      Pour les tests : "onboarding@resend.dev"

import { Resend } from 'resend'
import { NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  company?: string
  email: string
  phone?: string
  subject: string
  message: string
}

/* ── Validation serveur ──────────────────────────────────── */
function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim())    return 'Le nom est requis.'
  if (!body.email?.trim())   return "L'e-mail est requis."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return 'E-mail invalide.'
  if (!body.subject?.trim()) return 'Le sujet est requis.'
  if (!body.message?.trim()) return 'Le message est requis.'
  return null
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const validationError = validate(body)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 })
  }

  const resend    = new Resend(process.env.RESEND_API_KEY)
  const toEmail   = process.env.CONTACT_EMAIL   ?? 'cremilde.hirschi@srdpartners.ch'
  const fromEmail = process.env.RESEND_FROM     ?? 'onboarding@resend.dev'

  try {
    await resend.emails.send({
      from:    `SRD Partners Contact <${fromEmail}>`,
      to:      [toEmail],
      replyTo: body.email!,
      subject: `[SRD Partners] ${body.subject} — ${body.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#46184E;margin-bottom:16px">Nouveau message via srdpartners.ch</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#5A6080;font-size:13px;width:140px">Nom</td>
                <td style="padding:8px 0;font-size:14px;color:#1E0F28">${body.name}</td></tr>
            ${body.company ? `<tr><td style="padding:8px 0;color:#5A6080;font-size:13px">Société</td>
                <td style="padding:8px 0;font-size:14px;color:#1E0F28">${body.company}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#5A6080;font-size:13px">E-mail</td>
                <td style="padding:8px 0;font-size:14px;color:#1E0F28">${body.email}</td></tr>
            ${body.phone ? `<tr><td style="padding:8px 0;color:#5A6080;font-size:13px">Téléphone</td>
                <td style="padding:8px 0;font-size:14px;color:#1E0F28">${body.phone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#5A6080;font-size:13px">Sujet</td>
                <td style="padding:8px 0;font-size:14px;color:#1E0F28">${body.subject}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #E7DEEC;margin:16px 0">
          <p style="color:#5A6080;font-size:13px;margin-bottom:4px">Message :</p>
          <p style="font-size:15px;color:#1E0F28;line-height:1.7;white-space:pre-line">${body.message}</p>
          <hr style="border:none;border-top:1px solid #E7DEEC;margin:24px 0">
          <p style="font-size:12px;color:#9BA4BB">SRD Partners Sàrl · Les Vernets 2 · 2035 Corcelles NE</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[api/contact] Resend error:', err)
    return NextResponse.json(
      { error: "L'envoi a échoué. Veuillez réessayer ou nous contacter directement." },
      { status: 500 }
    )
  }
}

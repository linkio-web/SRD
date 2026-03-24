// MODIFIED: Redirect 301 vers /qui-sommes-nous (page unifiée)
import { redirect } from 'next/navigation'

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/qui-sommes-nous`)
}

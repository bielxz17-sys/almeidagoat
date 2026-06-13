import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data, error } = await supabase
    .from('aplicacoes_almeidagoat')
    .select('*')
    .order('criado_em', { ascending: false })

  if (error) return NextResponse.json({ data: [] })
  return NextResponse.json({ data })
}

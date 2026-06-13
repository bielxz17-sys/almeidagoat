import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    await supabase.from('aplicacoes_almeidagoat').insert({
      nome: body.nome,
      o_que_faz: body.o_que_faz,
      experiencia_venda: body.experiencia_venda,
      tem_computador: body.tem_computador,
      comprometimento: body.comprometimento,
      faturamento: body.faturamento,
      valor_investir: body.valor_investir,
      forma_pagamento: body.forma_pagamento,
      whatsapp: body.whatsapp,
      instagram: body.instagram,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

'use client'

import { useState, useEffect } from 'react'

interface Aplicacao {
  id: string
  nome: string
  o_que_faz: string
  experiencia_venda: string
  tem_computador: string
  comprometimento: string
  faturamento: string
  valor_investir: string
  forma_pagamento: string
  whatsapp: string
  instagram: string
  criado_em: string
}

export default function AdminPage() {
  const [senha, setSenha] = useState('')
  const [autenticado, setAutenticado] = useState(false)
  const [erro, setErro] = useState(false)
  const [dados, setDados] = useState<Aplicacao[]>([])
  const [loading, setLoading] = useState(false)
  const [selecionado, setSelecionado] = useState<Aplicacao | null>(null)

  async function login() {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha }),
    })
    if (res.ok) {
      setAutenticado(true)
      setErro(false)
    } else {
      setErro(true)
    }
  }

  useEffect(() => {
    if (!autenticado) return
    setLoading(true)
    fetch('/api/admin/aplicacoes')
      .then(r => r.ok ? r.json() : { data: [] })
      .then(d => setDados(d.data || []))
      .finally(() => setLoading(false))
  }, [autenticado])

  if (!autenticado) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-white font-black text-2xl uppercase mb-8 text-center">
            ALMEIDA<span className="text-blue-500">GOAT</span> Admin
          </h1>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            autoFocus
            className="w-full bg-transparent border border-gray-600 focus:border-white text-white px-4 py-3 outline-none placeholder-gray-600 mb-4"
          />
          {erro && <p className="text-red-500 text-sm mb-4">Senha incorreta.</p>}
          <button onClick={login} className="w-full border-2 border-white text-white font-black uppercase py-3 hover:bg-white hover:text-black transition-colors">
            ENTRAR
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-black text-2xl uppercase">
            ALMEIDA<span className="text-blue-500">GOAT</span> — Aplicações
          </h1>
          <span className="text-gray-400 text-sm">{dados.length} respostas</span>
        </div>

        {loading && <p className="text-gray-500">Carregando...</p>}

        {!loading && dados.length === 0 && (
          <p className="text-gray-500">Nenhuma aplicação ainda.</p>
        )}

        {!loading && dados.length > 0 && (
          <div className="space-y-3">
            {dados.map(a => (
              <div
                key={a.id}
                onClick={() => setSelecionado(selecionado?.id === a.id ? null : a)}
                className="border border-gray-800 hover:border-gray-600 p-4 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{a.nome || '—'}</p>
                    <p className="text-gray-400 text-sm">{a.whatsapp} · {a.instagram}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-400 text-sm font-bold">{a.faturamento}</p>
                    <p className="text-gray-500 text-xs">{new Date(a.criado_em).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                {selecionado?.id === a.id && (
                  <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-1 gap-3 text-sm">
                    <Row label="O que faz" value={a.o_que_faz} />
                    <Row label="Experiência de venda" value={a.experiencia_venda} />
                    <Row label="Tem computador" value={a.tem_computador} />
                    <Row label="Comprometimento" value={`${a.comprometimento}/10`} />
                    <Row label="Faturamento mensal" value={a.faturamento} />
                    <Row label="Valor para investir" value={a.valor_investir} />
                    <Row label="Forma de pagamento" value={a.forma_pagamento} />
                    <Row label="WhatsApp" value={a.whatsapp} />
                    <Row label="Instagram" value={a.instagram} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-gray-500 uppercase text-xs">{label}: </span>
      <span className="text-white">{value || '—'}</span>
    </div>
  )
}

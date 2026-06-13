'use client'

import { useState } from 'react'

interface FormData {
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
}

const initial: FormData = {
  nome: '',
  o_que_faz: '',
  experiencia_venda: '',
  tem_computador: '',
  comprometimento: '',
  faturamento: '',
  valor_investir: '',
  forma_pagamento: '',
  whatsapp: '',
  instagram: '',
}

const TOTAL = 10

export default function AplicacaoPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const progress = Math.round((step / TOTAL) * 100)

  function set(field: keyof FormData, value: string) {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => Math.max(0, s - 1))

  async function submit() {
    setSubmitting(true)
    await fetch('/api/aplicacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => null)
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Screen progress={null}>
        <div className="text-center">
          <p className="text-green-400 text-5xl mb-4">✓</p>
          <h2 className="text-white font-black text-2xl uppercase mb-3">Aplicação Enviada!</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            Vou analisar sua aplicação e entro em contato pelo WhatsApp em breve.
          </p>
        </div>
      </Screen>
    )
  }

  return (
    <Screen progress={step > 0 ? progress : null}>
      {step === 0 && <Intro onStart={next} />}

      {step === 1 && (
        <TextStep num={1} question="QUAL É O SEU NOME?"
          value={data.nome} onChange={v => set('nome', v)}
          onNext={next} onBack={back} placeholder="Seu nome completo" />
      )}

      {step === 2 && (
        <TextareaStep num={2} question="O QUE VOCÊ FAZ HOJE PRA GANHAR DINHEIRO?"
          value={data.o_que_faz} onChange={v => set('o_que_faz', v)}
          onNext={next} onBack={back} />
      )}

      {step === 3 && (
        <ChoiceStep num={3} question="JÁ FEZ ALGUM LANÇAMENTO OU VENDA AO VIVO?"
          value={data.experiencia_venda} onChange={v => set('experiencia_venda', v)}
          onNext={next} onBack={back}
          options={[
            'SIM, JÁ FIZ LANÇAMENTO COMPLETO (com aquecimento e abertura de carrinho)',
            'JÁ FIZ LIVE OU WEBINAR DE VENDA (apresentei produto ao vivo e vendi)',
            'JÁ VENDI ALGO ONLINE, MAS NUNCA AO VIVO (página de vendas, DM, grupo, VSL)',
            'AINDA NÃO VENDI NADA ONLINE (tô começando do zero ou já tentei sem resultado)',
          ]} />
      )}

      {step === 4 && (
        <ChoiceStep num={4} question="VOCÊ TEM NOTEBOOK OU PC PARA TRABALHAR?"
          value={data.tem_computador} onChange={v => set('tem_computador', v)}
          onNext={next} onBack={back}
          options={[
            'TENHO UM NOTEBOOK OU PC',
            'CONSIGO ARRUMAR EMPRESTADO',
            'NÃO TENHO E NÃO CONSIGO NO MOMENTO',
          ]} />
      )}

      {step === 5 && (
        <ScaleStep num={5} question="NUMA ESCALA DE 0 A 10, QUÃO CERTO VOCÊ TÁ QUE VAI EXECUTAR 100% COMIGO?"
          value={data.comprometimento} onChange={v => set('comprometimento', v)}
          onNext={next} onBack={back} />
      )}

      {step === 6 && (
        <ChoiceStep num={6} question="QUAL SEU FATURAMENTO MENSAL MÉDIO HOJE?"
          value={data.faturamento} onChange={v => set('faturamento', v)}
          onNext={next} onBack={back}
          options={[
            'MENOS de R$ 1.000',
            'R$ 1.000 A R$ 2.000',
            'R$ 2.000 A R$ 5.000',
            'R$ 5.000 A R$ 10.000',
            'ACIMA DE R$ 10.000',
          ]} />
      )}

      {step === 7 && (
        <TextStep num={7} question="QUANTO EXATAMENTE PRA INVESTIR VOCÊ TEM?"
          subtitle="Seja real. Se inflar, te mando a oferta errada e tu perde tempo. Se diminuir, perde a oferta certa pra ti."
          value={data.valor_investir} onChange={v => set('valor_investir', v)}
          onNext={next} onBack={back} placeholder="R$ xxxxx" />
      )}

      {step === 8 && (
        <ChoiceStep num={8} question="COM BASE NO INVESTIMENTO QUE VOCÊ COLOCOU, QUAL FORMA DE PAGAMENTO VOCÊ TEM?"
          subtitle="Seja sincero 100%"
          value={data.forma_pagamento} onChange={v => set('forma_pagamento', v)}
          onNext={next} onBack={back}
          options={[
            'PIX à vista',
            'Cartão parcelado (até 12x)',
            'PIX + Cartão (parcial)',
            'Coloquei o valor mas não tenho ele de fato',
          ]} />
      )}

      {step === 9 && (
        <TextStep num={9} question="QUAL SEU NÚMERO PARA CONTATO? (WHATSAPP)"
          subtitle="VOU ENTRAR EM CONTATO COM VOCÊ."
          value={data.whatsapp} onChange={v => set('whatsapp', v)}
          onNext={next} onBack={back} placeholder="(XX) 9XXXX-XXXX" type="tel" />
      )}

      {step === 10 && (
        <FinalStep num={10} question="QUAL SEU @ DO INSTAGRAM?"
          value={data.instagram} onChange={v => set('instagram', v)}
          onSubmit={submit} onBack={back} submitting={submitting} />
      )}
    </Screen>
  )
}

function Screen({ children, progress }: { children: React.ReactNode; progress: number | null }) {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <span className="text-white font-black text-lg tracking-widest uppercase">
            ALMEIDA<span className="text-red-500">GOAT</span>
          </span>
        </div>
        {progress !== null && (
          <div className="w-full bg-gray-800 rounded-full h-1 mb-8">
            <div className="bg-white h-1 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        )}
        {children}
      </div>
    </main>
  )
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <h1 className="text-white font-black text-3xl uppercase leading-tight mb-2">
        PROPOSTA PARA<br /><span className="text-red-500">TRABALHAR</span> COMIGO.
      </h1>
      <p className="text-gray-300 font-bold text-sm uppercase mt-6 mb-1">
        QUER TRABALHAR COMIGO? SABER SOBRE A OPERAÇÃO?
      </p>
      <p className="text-gray-300 text-sm mb-6">
        Esse formulário é só pra quem quer OPERAR comigo.
      </p>
      <p className="text-white font-bold text-sm uppercase mb-2">O que tu destrava aqui dentro:</p>
      <ul className="text-gray-300 text-sm space-y-1 mb-8">
        <li>→ Funil de +R$1k/dia no orgânico</li>
        <li>→ Script de Lançamento (resultado Imediato)</li>
        <li>→ Oferta Validada + Estrutura Pronta</li>
        <li>→ Acesso à network de operadores</li>
      </ul>
      <p className="text-white font-bold text-sm uppercase mb-1">AGORA EU PRECISO TE CONHECER.</p>
      <p className="text-gray-400 text-sm mb-8">São 10 perguntas. Leva 3 minutos.</p>
      <button onClick={onStart} className="border-2 border-white text-white font-black uppercase px-8 py-3 text-sm hover:bg-white hover:text-black transition-colors">
        INICIAR →
      </button>
    </div>
  )
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-gray-500 text-sm mb-6 hover:text-white transition-colors block">
      ← Voltar
    </button>
  )
}

function ConfirmBtn({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="border-2 border-white text-white font-black uppercase px-6 py-2 text-sm hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-6 block">
      CONFIRMAR →
    </button>
  )
}

function TextStep({ num, question, subtitle, value, onChange, onNext, onBack, placeholder, type = 'text' }: {
  num: number; question: string; subtitle?: string; value: string;
  onChange: (v: string) => void; onNext: () => void; onBack: () => void;
  placeholder?: string; type?: string
}) {
  return (
    <div>
      <BackBtn onClick={onBack} />
      {subtitle && <p className="text-gray-400 text-xs uppercase font-bold mb-3">{subtitle}</p>}
      <h2 className="text-white font-black text-xl uppercase mb-6">
        {num}. {question} <span className="text-red-500">*</span>
      </h2>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onKeyDown={e => { if (e.key === 'Enter' && value.trim()) onNext() }}
        autoFocus
        className="w-full bg-transparent border border-gray-600 focus:border-white text-white px-4 py-3 outline-none placeholder-gray-600" />
      <ConfirmBtn onClick={onNext} disabled={!value.trim()} />
    </div>
  )
}

function TextareaStep({ num, question, value, onChange, onNext, onBack }: {
  num: number; question: string; value: string;
  onChange: (v: string) => void; onNext: () => void; onBack: () => void;
}) {
  return (
    <div>
      <BackBtn onClick={onBack} />
      <h2 className="text-white font-black text-xl uppercase mb-6">
        {num}. {question} <span className="text-red-500">*</span>
      </h2>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} autoFocus
        className="w-full bg-transparent border border-gray-600 focus:border-white text-white px-4 py-3 outline-none resize-none" />
      <ConfirmBtn onClick={onNext} disabled={!value.trim()} />
    </div>
  )
}

function ChoiceStep({ num, question, subtitle, value, onChange, onNext, onBack, options }: {
  num: number; question: string; subtitle?: string; value: string;
  onChange: (v: string) => void; onNext: () => void; onBack: () => void; options: string[]
}) {
  const letters = ['A', 'B', 'C', 'D', 'E']
  return (
    <div>
      <BackBtn onClick={onBack} />
      {subtitle && <p className="text-gray-400 text-xs uppercase font-bold mb-3">{subtitle}</p>}
      <h2 className="text-white font-black text-xl uppercase mb-6">
        {num}. {question} <span className="text-red-500">*</span>
      </h2>
      <div className="flex flex-col gap-3 mb-2">
        {options.map((opt, i) => (
          <button key={opt} onClick={() => { onChange(opt); setTimeout(onNext, 200) }}
            className={`text-left px-4 py-3 border text-sm transition-colors ${value === opt ? 'border-white bg-white/10 text-white' : 'border-gray-700 text-gray-300 hover:border-gray-400'}`}>
            <span className="text-gray-500 mr-2">{letters[i]}</span>{opt}
          </button>
        ))}
      </div>
      <ConfirmBtn onClick={onNext} disabled={!value} />
    </div>
  )
}

function ScaleStep({ num, question, value, onChange, onNext, onBack }: {
  num: number; question: string; value: string;
  onChange: (v: string) => void; onNext: () => void; onBack: () => void;
}) {
  return (
    <div>
      <BackBtn onClick={onBack} />
      <h2 className="text-white font-black text-xl uppercase mb-6 leading-tight">
        {num}. {question} <span className="text-red-500">*</span>
      </h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {Array.from({ length: 11 }, (_, i) => String(i)).map(n => (
          <button key={n} onClick={() => { onChange(n); setTimeout(onNext, 200) }}
            className={`w-10 h-10 border text-sm font-bold transition-colors ${value === n ? 'border-white bg-white text-black' : 'border-gray-700 text-gray-300 hover:border-white'}`}>
            {n}
          </button>
        ))}
      </div>
      <ConfirmBtn onClick={onNext} disabled={!value} />
    </div>
  )
}

function FinalStep({ num, question, value, onChange, onSubmit, onBack, submitting }: {
  num: number; question: string; value: string;
  onChange: (v: string) => void; onSubmit: () => void; onBack: () => void; submitting: boolean
}) {
  return (
    <div>
      <BackBtn onClick={onBack} />
      <p className="text-gray-400 text-xs uppercase font-bold mb-3">VOU ENTRAR EM CONTATO COM VOCÊ.</p>
      <h2 className="text-white font-black text-xl uppercase mb-6">
        {num}. {question} <span className="text-red-500">*</span>
      </h2>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="@seuinstagram" autoFocus
        className="w-full bg-transparent border border-gray-600 focus:border-white text-white px-4 py-3 outline-none placeholder-gray-600" />
      <button onClick={onSubmit} disabled={!value.trim() || submitting}
        className="border-2 border-white text-white font-black uppercase px-8 py-3 text-sm hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-6 block">
        {submitting ? 'ENVIANDO...' : 'ENVIAR APLICAÇÃO →'}
      </button>
    </div>
  )
}

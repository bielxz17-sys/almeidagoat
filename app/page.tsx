import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <div className="text-center mb-2">
          <h1 className="text-white font-black text-2xl tracking-widest uppercase">
            ALMEIDA<span className="text-blue-500">GOAT</span>
          </h1>
        </div>

        <Link
          href="/aplicacao"
          className="w-full rounded-2xl border-2 border-blue-500 overflow-hidden block transition-all duration-300 ease-out hover:scale-[1.03] hover:border-blue-400 active:scale-[0.98]"
          style={{ boxShadow: '0 0 60px rgba(59,130,246,0.7), 0 0 120px rgba(59,130,246,0.3)' }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 80px rgba(59,130,246,1), 0 0 160px rgba(59,130,246,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 60px rgba(59,130,246,0.7), 0 0 120px rgba(59,130,246,0.3)')}
        >
          <div className="relative h-72 overflow-hidden">
            <Image
              src="/hero.jpg"
              alt="Minha operação"
              fill
              className="object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 pb-6 px-6 text-center">
              <h2 className="text-white font-black text-2xl uppercase leading-tight drop-shadow-lg">
                PROPOSTA PARA<br />TRABALHAR COMIGO
              </h2>
              <p className="text-gray-300 text-sm mt-1">Aplicação exclusiva — vagas limitadas</p>
            </div>
          </div>
          <div className="flex justify-center py-4 bg-black group">
            <span className="bg-blue-600 text-white font-bold px-7 py-2 rounded-full text-sm transition-all duration-300 hover:bg-blue-500 hover:px-9">
              Entrar →
            </span>
          </div>
        </Link>

        <p className="text-gray-600 text-xs mt-4">© 2026 Almeida Goat</p>
      </div>
    </main>
  )
}

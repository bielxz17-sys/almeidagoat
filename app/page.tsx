import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <div className="text-center mb-2">
          <h1 className="text-white font-black text-2xl tracking-widest uppercase">
            ALMEIDA<span className="text-red-500">GOAT</span>
          </h1>
        </div>

        <Link
          href="/aplicacao"
          className="w-full rounded-2xl border-2 border-blue-500 overflow-hidden block"
          style={{ boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}
        >
          <div className="relative h-64">
            <Image
              src="/hero.jpg"
              alt="Minha operação"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 pb-5 px-6 text-center">
              <h2 className="text-white font-black text-2xl uppercase leading-tight drop-shadow-lg">
                PROPOSTA PARA<br />TRABALHAR COMIGO
              </h2>
              <p className="text-gray-300 text-sm mt-1">Aplicação exclusiva — vagas limitadas</p>
            </div>
          </div>
          <div className="flex justify-center py-4 bg-black">
            <span className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full text-sm">
              Entrar →
            </span>
          </div>
        </Link>

        <p className="text-gray-600 text-xs mt-4">© 2026 Almeida Goat</p>
      </div>
    </main>
  )
}

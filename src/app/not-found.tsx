import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="relative">
        <div className="w-36 h-36 border border-secondary animate-spin-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold">404</span>
        </div>
      </div>
      <h1 className="mt-8 text-4xl font-bold">Página não encontrada</h1>
      <p className="mt-4 text-xl">Desculpe, a página que você está procurando não existe.</p>
      <Link href="/" className="mt-8 px-6 py-3 bg-secondary hover:bg-secondary-foreground text-white rounded-md transition-colors duration-300">
        Voltar para a página inicial
      </Link>
    </div>
  )
}
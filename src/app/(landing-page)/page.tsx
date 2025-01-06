import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, PieChart, Shield } from 'lucide-react'
import { FeatureCard } from '@/components/feature-card'
import { StepCard } from '@/components/step-card'
import { TestimonialCard } from '@/components/testimonial-card'
import { Header } from '@/components/header'

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header landing_page/>
      <main className="flex-1 mx-auto">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-50">
          <div className=" px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Gerencie suas dívidas com facilidade
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Organize sua vida financeira, acompanhe seus pagamentos e alcance a liberdade financeira com Serasa.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/auth"}>
                  <Button className="bg-secondary text-white hover:bg-blue-700">
                    Comece Agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Recursos Principais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-green-500" />}
                title="Cadastro de Dívidas"
                description="Registre facilmente suas dívidas com detalhes como título, valor, data de vencimento e status."
              />
              <FeatureCard
                icon={<PieChart className="h-10 w-10 text-blue-500" />}
                title="Resumo Financeiro"
                description="Visualize um painel com o total de dívidas, valor pendente e quantidade de dívidas pagas."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-purple-500" />}
                title="Segurança"
                description="Autenticação segura para proteger seus dados financeiros pessoais."
              />
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Como Funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                number={1}
                title="Cadastre-se"
                description="Crie sua conta gratuitamente em poucos segundos."
              />
              <StepCard
                number={2}
                title="Adicione suas dívidas"
                description="Registre todas as suas dívidas com detalhes importantes."
              />
              <StepCard
                number={3}
                title="Gerencie e acompanhe"
                description="Visualize seu progresso e mantenha-se no controle de suas finanças."
              />
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              O que nossos usuários dizem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="Serasa mudou minha vida financeira. Agora tenho total controle sobre minhas dívidas."
                author="Maria S."
              />
              <TestimonialCard
                quote="Interface intuitiva e fácil de usar. Recomendo para todos que querem organizar suas finanças."
                author="João P."
              />
              <TestimonialCard
                quote="O resumo financeiro me ajuda a tomar decisões melhores sobre meus gastos."
                author="Ana L."
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-white">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Pronto para controlar suas dívidas?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                  Junte-se a milhares de usuários que já estão no caminho da liberdade financeira.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/auth"}>
                  <Button className="bg-white text-secondary hover:bg-blue-50">
                    Comece Gratuitamente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2025 Serasa. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:scale-105" href="#">
            Termos de Serviço
          </Link>
          <Link className="text-xs hover:scale-105" href="#">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  )
}


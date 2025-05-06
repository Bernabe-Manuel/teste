import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Award, Users, Utensils, Heart } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800">Sobre Nós</h1>
        <p className="mt-4 text-xl text-gray-600">Conheça a história e a missão do Restaurante Manança</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurante Manança"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-amber-800">Nossa História</h2>
          <p className="text-gray-700">
            O Restaurante Manança nasceu em 2010, fruto da paixão do Chef António Manança pela culinária tradicional
            angolana. Após anos de experiência em restaurantes renomados em Portugal e Angola, António decidiu abrir seu
            próprio espaço para compartilhar as receitas que aprendeu com sua avó durante a infância em Luanda.
          </p>
          <p className="text-gray-700">
            O nome "Manança" não é apenas o sobrenome do fundador, mas também uma homenagem às suas raízes familiares e
            à rica tradição culinária que foi passada de geração em geração.
          </p>
          <p className="text-gray-700">
            Desde a inauguração, o restaurante se tornou um ponto de referência em Viana, Luanda Sul, atraindo tanto
            moradores locais quanto turistas que desejam experimentar os autênticos sabores de Angola em um ambiente
            acolhedor e elegante.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardHeader className="pb-2">
            <Award className="h-8 w-8 text-amber-700 mb-2" />
            <CardTitle className="text-amber-800">Qualidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Comprometidos com a excelência em cada prato que servimos, utilizando apenas ingredientes frescos e de
              alta qualidade.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Utensils className="h-8 w-8 text-amber-700 mb-2" />
            <CardTitle className="text-amber-800">Autenticidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Preservamos as receitas tradicionais angolanas, respeitando as técnicas e sabores originais que fazem
              parte da nossa cultura.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Users className="h-8 w-8 text-amber-700 mb-2" />
            <CardTitle className="text-amber-800">Hospitalidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Oferecemos um atendimento caloroso e personalizado, fazendo com que cada cliente se sinta em casa.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Heart className="h-8 w-8 text-amber-700 mb-2" />
            <CardTitle className="text-amber-800">Paixão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Colocamos amor e dedicação em cada detalhe, desde a preparação dos pratos até a decoração do ambiente.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-amber-800">Nosso Ambiente</h2>
        <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
          O Restaurante Manança oferece um ambiente acolhedor e elegante, perfeito para desfrutar da autêntica culinária
          angolana
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
            alt="Ambiente do Restaurante Manança"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
            alt="Ambiente do Restaurante Manança"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop"
            alt="Ambiente do Restaurante Manança"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="bg-amber-800 text-white p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4">Venha nos Visitar</h2>
        <p className="text-xl mb-6">
          Estamos ansiosos para recebê-lo no Restaurante Manança e proporcionar uma experiência gastronômica
          inesquecível
        </p>
      </div>
    </div>
  )
}

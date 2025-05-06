import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-amber-800">Restaurante da Manança</h1>
            <p className="mt-4 text-xl text-gray-700">
              Descubra os autênticos sabores de Angola no coração de Kilamba, Luanda
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-amber-700 hover:bg-amber-800">
                <Link href="/menu">Ver Menu</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-50">
                <Link href="/reservas">Fazer Reserva</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
              alt="Restaurante da Manança"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 bg-amber-50 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-800">Pratos em Destaque</h2>
          <p className="mt-4 text-gray-600">Experimente nossas especialidades angolanas</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Muamba de Galinha",
              description: "Tradicional guisado de galinha com óleo de palma e amendoim",
              image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fzEVhM886scTAqfOl46C4f8jl0WZLs.png",
            },
            {
              name: "Calulu de Peixe",
              description: "Peixe seco com legumes e folhas de mandioca",
              image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6x76OaNz1D2teGhKHMrOycT0r3MDpZ.png",
            },
            {
              name: "Funge com Mufete",
              description: "Peixe grelhado servido com funge e molho de cebola",
              image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QGdjnHkjsG0OwmS9iCtKrSTmOUGOSG.png",
            },
          ].map((dish, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-800">{dish.name}</h3>
                <p className="mt-2 text-gray-600">{dish.description}</p>
                <Button asChild variant="link" className="mt-4 text-amber-700 p-0">
                  <Link href="/menu" className="flex items-center">
                    Ver detalhes <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
              alt="Restaurante da Manança"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-amber-800">Sobre Nós</h2>
            <p className="mt-4 text-gray-700">
              O Restaurante da Manança nasceu da paixão pela culinária angolana e do desejo de compartilhar os sabores
              autênticos de Angola com todos os nossos clientes.
            </p>
            <p className="mt-4 text-gray-700">
              Localizado em Kilamba, Luanda, nosso espaço acolhedor oferece uma experiência gastronômica única, com
              pratos preparados com ingredientes frescos e técnicas tradicionais.
            </p>
            <Button asChild className="mt-6 bg-amber-700 hover:bg-amber-800">
              <Link href="/sobre">Conheça Nossa História</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-amber-50 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-800">O Que Dizem Nossos Clientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "João Silva",
              comment: "A melhor muamba de galinha que já provei! Ambiente acolhedor e serviço excelente.",
            },
            {
              name: "Maria Fernandes",
              comment: "Adorei o funge com mufete! Sabor autêntico que me fez lembrar da minha infância em Angola.",
            },
            {
              name: "Pedro Santos",
              comment: "Ótimo lugar para levar a família. Os pratos são deliciosos e o atendimento é impecável.",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col h-full">
                <p className="text-gray-700 italic flex-grow">"{testimonial.comment}"</p>
                <p className="mt-4 font-semibold text-amber-800">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-amber-800">Reserve Sua Mesa</h2>
        <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
          Venha desfrutar de uma experiência gastronômica autêntica angolana no Restaurante da Manança
        </p>
        <Button asChild size="lg" className="mt-8 bg-amber-700 hover:bg-amber-800">
          <Link href="/reservas">Fazer Reserva Agora</Link>
        </Button>
      </section>
    </div>
  )
}

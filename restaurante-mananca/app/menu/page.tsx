"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Star } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"

export default function MenuPage() {
  const { dishes } = useRestaurant()

  // Organize dishes by category
  const categorizedDishes = {
    entradas: dishes.filter((dish) => dish.categoria === "entradas"),
    principais: dishes.filter((dish) => dish.categoria === "principais"),
    sobremesas: dishes.filter((dish) => dish.categoria === "sobremesas"),
    bebidas: dishes.filter((dish) => dish.categoria === "bebidas"),
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800">Nosso Cardápio</h1>
        <p className="mt-4 text-xl text-gray-600">Descubra os autênticos sabores da culinária angolana</p>
      </div>

      <Tabs defaultValue="principais" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="entradas">Entradas</TabsTrigger>
          <TabsTrigger value="principais">Pratos Principais</TabsTrigger>
          <TabsTrigger value="sobremesas">Sobremesas</TabsTrigger>
          <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
        </TabsList>

        {Object.entries(categorizedDishes).map(([categoria, items]) => (
          <TabsContent key={categoria} value={categoria} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((prato) => (
                <Card key={prato.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64 w-full">
                    <Image
                      src={prato.imagem || "/placeholder.svg"}
                      alt={prato.nome}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-amber-800">{prato.nome}</CardTitle>
                      <div className="flex items-center text-amber-600">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                        <span>{prato.avaliacao}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{prato.descricao}</p>
                    <p className="font-bold text-amber-700">{prato.preco}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16 bg-amber-50 p-8 rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-amber-800">Informações Adicionais</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-800">Ingredientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Utilizamos ingredientes frescos e autênticos, muitos deles importados diretamente de Angola para
                garantir o sabor tradicional dos nossos pratos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-amber-800">Restrições Alimentares</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Informe ao nosso atendimento sobre alergias ou restrições alimentares. Temos opções vegetarianas e
                podemos adaptar alguns pratos conforme necessidade.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-amber-800">Pratos Especiais</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Aos finais de semana, oferecemos pratos especiais que não constam no cardápio regular. Consulte nosso
                atendimento para saber as opções disponíveis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

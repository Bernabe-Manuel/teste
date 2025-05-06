"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, MessageSquare } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"

export default function MenuCliente() {
  const { dishes } = useRestaurant()
  const [selectedPrato, setSelectedPrato] = useState<any>(null)

  // Organize dishes by category
  const categorizedDishes = {
    entradas: dishes.filter((dish) => dish.categoria === "entradas"),
    principais: dishes.filter((dish) => dish.categoria === "principais"),
    sobremesas: dishes.filter((dish) => dish.categoria === "sobremesas"),
    bebidas: dishes.filter((dish) => dish.categoria === "bebidas"),
  }

  return (
    <div>
      <Tabs defaultValue="principais" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="entradas">Entradas</TabsTrigger>
          <TabsTrigger value="principais">Pratos Principais</TabsTrigger>
          <TabsTrigger value="sobremesas">Sobremesas</TabsTrigger>
          <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
        </TabsList>

        {Object.entries(categorizedDishes).map(([categoria, items]) => (
          <TabsContent key={categoria} value={categoria} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((prato) => (
                <Card key={prato.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-60 w-full">
                    <Image
                      src={prato.imagem || "/placeholder.svg"}
                      alt={prato.nome}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-amber-800">{prato.nome}</CardTitle>
                    <div className="flex items-center text-amber-600">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                      <span>{prato.avaliacao}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-gray-600 line-clamp-2">{prato.descricao}</p>
                    <p className="font-bold text-amber-700 mt-2">{prato.preco}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-amber-700 text-amber-700 hover:bg-amber-50"
                          onClick={() => setSelectedPrato(prato)}
                        >
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        {selectedPrato && (
                          <>
                            <DialogHeader>
                              <DialogTitle className="text-amber-800">{selectedPrato.nome}</DialogTitle>
                              <DialogDescription>
                                <div className="flex items-center text-amber-600 mt-1">
                                  <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                                  <span>{selectedPrato.avaliacao}</span>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="relative h-72 my-4 w-full">
                              <Image
                                src={selectedPrato.imagem || "/placeholder.svg"}
                                alt={selectedPrato.nome}
                                fill
                                className="object-contain rounded-md"
                                sizes="(max-width: 768px) 100vw, 500px"
                              />
                            </div>
                            <p className="text-gray-700">{selectedPrato.descricao}</p>
                            <p className="font-bold text-amber-700 mt-2">{selectedPrato.preco}</p>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" className="text-amber-700 hover:bg-amber-50">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Comentar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

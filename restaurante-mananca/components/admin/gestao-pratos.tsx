"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Pencil, Trash2, Search, Filter, DollarSign, Tag, Eye } from "lucide-react"
import Image from "next/image"
import { useRestaurant } from "@/contexts/restaurant-context"

export default function GestaoPratos() {
  const { dishes, addDish, updateDish, deleteDish } = useRestaurant()
  const [filtro, setFiltro] = useState("todos")
  const [busca, setBusca] = useState("")
  const [pratoEmEdicao, setPratoEmEdicao] = useState<any>(null)
  const [pratoVisualizacao, setPratoVisualizacao] = useState<any>(null)

  const filtrarPratos = () => {
    let pratosFiltrados = [...dishes]

    // Filtrar por categoria
    if (filtro !== "todos") {
      pratosFiltrados = pratosFiltrados.filter((prato) => prato.categoria === filtro)
    }

    // Filtrar por busca
    if (busca) {
      const termoBusca = busca.toLowerCase()
      pratosFiltrados = pratosFiltrados.filter(
        (prato) => prato.nome.toLowerCase().includes(termoBusca) || prato.descricao.toLowerCase().includes(termoBusca),
      )
    }

    return pratosFiltrados
  }

  const pratosFiltrados = filtrarPratos()

  const FormularioPrato = ({ prato, onSubmit, isEditing = false }: any) => {
    const [formData, setFormData] = useState(
      prato || {
        nome: "",
        categoria: "",
        descricao: "",
        preco: "",
        imagem: "https://via.placeholder.com/400x300",
        destaque: false,
        avaliacao: 4.0,
      },
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
    }

    const handleSelectChange = (name: string, value: string) => {
      setFormData({ ...formData, [name]: value })
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target
      setFormData({ ...formData, [name]: checked })
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Prato</Label>
            <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Select
              name="categoria"
              value={formData.categoria}
              onValueChange={(value) => handleSelectChange("categoria", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entradas">Entradas</SelectItem>
                <SelectItem value="principais">Pratos Principais</SelectItem>
                <SelectItem value="sobremesas">Sobremesas</SelectItem>
                <SelectItem value="bebidas">Bebidas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="preco">Preço</Label>
            <Input
              id="preco"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              required
              placeholder="Ex: 3.500 Kz"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagem">URL da Imagem</Label>
            <Input id="imagem" name="imagem" value={formData.imagem} onChange={handleChange} required />
          </div>
        </div>

        {formData.imagem && (
          <div className="mt-2">
            <Label>Pré-visualização da Imagem</Label>
            <div className="relative h-40 w-full mt-2 border rounded-md overflow-hidden">
              <Image
                src={formData.imagem || "/placeholder.svg"}
                alt="Pré-visualização"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="destaque"
            name="destaque"
            checked={formData.destaque}
            onChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="destaque">Destacar na página inicial</Label>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" className="bg-amber-700 hover:bg-amber-800">
            {isEditing ? "Salvar Alterações" : "Adicionar Prato"}
          </Button>
        </DialogFooter>
      </form>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Buscar pratos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Select value={filtro} onValueChange={setFiltro}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por categoria" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os pratos</SelectItem>
              <SelectItem value="entradas">Entradas</SelectItem>
              <SelectItem value="principais">Pratos Principais</SelectItem>
              <SelectItem value="sobremesas">Sobremesas</SelectItem>
              <SelectItem value="bebidas">Bebidas</SelectItem>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-amber-700 hover:bg-amber-800">
                <PlusCircle className="h-4 w-4 mr-2" />
                Novo Prato
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Prato</DialogTitle>
                <DialogDescription>Preencha os detalhes do novo prato para adicionar ao cardápio</DialogDescription>
              </DialogHeader>
              <FormularioPrato onSubmit={addDish} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {pratosFiltrados.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum prato encontrado com os filtros atuais.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pratosFiltrados.map((prato) => (
            <Card key={prato.id} className="overflow-hidden">
              <div className="relative h-60 w-full">
                <Image
                  src={prato.imagem || "/placeholder.svg"}
                  alt={prato.nome}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {prato.destaque && <Badge className="absolute top-2 right-2 bg-amber-500">Destaque</Badge>}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-amber-800">{prato.nome}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline" className="mt-1">
                        <Tag className="h-3 w-3 mr-1" />
                        {prato.categoria === "entradas"
                          ? "Entrada"
                          : prato.categoria === "principais"
                            ? "Prato Principal"
                            : prato.categoria === "sobremesas"
                              ? "Sobremesa"
                              : "Bebida"}
                      </Badge>
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="font-bold">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {prato.preco}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-600 line-clamp-3">{prato.descricao}</p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setPratoVisualizacao(prato)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Visualização do Prato</DialogTitle>
                    </DialogHeader>
                    {pratoVisualizacao && (
                      <div className="space-y-4">
                        <div className="relative h-80 w-full rounded-md overflow-hidden">
                          <Image
                            src={pratoVisualizacao.imagem || "/placeholder.svg"}
                            alt={pratoVisualizacao.nome}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 700px"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-2xl font-bold text-amber-800">{pratoVisualizacao.nome}</h3>
                          <Badge variant="secondary" className="font-bold text-base">
                            {pratoVisualizacao.preco}
                          </Badge>
                        </div>
                        <Badge variant="outline">
                          {pratoVisualizacao.categoria === "entradas"
                            ? "Entrada"
                            : pratoVisualizacao.categoria === "principais"
                              ? "Prato Principal"
                              : pratoVisualizacao.categoria === "sobremesas"
                                ? "Sobremesa"
                                : "Bebida"}
                        </Badge>
                        <p className="text-gray-700">{pratoVisualizacao.descricao}</p>
                        {pratoVisualizacao.destaque && (
                          <Badge className="bg-amber-500">Destacado na página inicial</Badge>
                        )}
                      </div>
                    )}
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Fechar</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setPratoEmEdicao(prato)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Editar Prato</DialogTitle>
                      <DialogDescription>Altere os detalhes do prato conforme necessário</DialogDescription>
                    </DialogHeader>
                    {pratoEmEdicao && (
                      <FormularioPrato
                        prato={pratoEmEdicao}
                        onSubmit={(updatedDish: any) => updateDish(pratoEmEdicao.id, updatedDish)}
                        isEditing={true}
                      />
                    )}
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir Prato</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir "{prato.nome}"? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteDish(prato.id)} className="bg-red-600 hover:bg-red-700">
                        Sim, excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, Star, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRestaurant } from "@/contexts/restaurant-context"

export default function ComentariosCliente() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { comments, addComment, likeComment } = useRestaurant()

  // Filtrar apenas comentários aprovados
  const comentariosAprovados = comments.filter((comment) => comment.status === "aprovado")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const novoPrato = formData.get("prato") as string
    const novaAvaliacao = Number.parseInt(formData.get("avaliacao") as string)
    const novoComentario = formData.get("comentario") as string

    // Simulação de envio de comentário
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)

      // Adicionar novo comentário ao contexto
      addComment({
        usuario: "Você",
        avatar: "VC",
        data: new Date().toLocaleDateString("pt-BR"),
        prato: novoPrato,
        avaliacao: novaAvaliacao,
        comentario: novoComentario,
      })

      // Resetar o formulário após 3 segundos
      setTimeout(() => {
        setSuccess(false)
        e.currentTarget.reset()
      }, 3000)
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <div className="bg-amber-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-amber-800 mb-4">Deixe seu comentário</h3>

        {success ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">Comentário enviado!</AlertTitle>
            <AlertDescription className="text-green-700">
              Obrigado pelo seu feedback. Seu comentário foi enviado para aprovação.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prato">Prato</Label>
                <Select name="prato" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o prato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Geral">Avaliação Geral</SelectItem>
                    <SelectItem value="Muamba de Galinha">Muamba de Galinha</SelectItem>
                    <SelectItem value="Calulu de Peixe">Calulu de Peixe</SelectItem>
                    <SelectItem value="Funge com Mufete">Funge com Mufete</SelectItem>
                    <SelectItem value="Kizaka com Carne Seca">Kizaka com Carne Seca</SelectItem>
                    <SelectItem value="Cocada Amarela">Cocada Amarela</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avaliacao">Avaliação</Label>
                <Select name="avaliacao" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">
                      <div className="flex items-center">
                        <span className="mr-2">5</span>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </SelectItem>
                    <SelectItem value="4">
                      <div className="flex items-center">
                        <span className="mr-2">4</span>
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                    </SelectItem>
                    <SelectItem value="3">
                      <div className="flex items-center">
                        <span className="mr-2">3</span>
                        {[...Array(3)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                        ))}
                        {[...Array(2)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                    </SelectItem>
                    <SelectItem value="2">
                      <div className="flex items-center">
                        <span className="mr-2">2</span>
                        {[...Array(2)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                        ))}
                        {[...Array(3)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                    </SelectItem>
                    <SelectItem value="1">
                      <div className="flex items-center">
                        <span className="mr-2">1</span>
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comentario">Seu Comentário</Label>
              <Textarea
                id="comentario"
                name="comentario"
                placeholder="Compartilhe sua experiência com o prato ou com o restaurante..."
                required
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="bg-amber-700 hover:bg-amber-800" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Comentário"}
            </Button>
          </form>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-amber-800 mb-4">Comentários dos Clientes</h3>

        {comentariosAprovados.map((comentario) => (
          <Card key={comentario.id} className="mb-4">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-amber-200 text-amber-800">{comentario.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{comentario.usuario}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{comentario.data}</span>
                    <span className="mx-2">•</span>
                    <span>{comentario.prato}</span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < comentario.avaliacao ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-gray-700">{comentario.comentario}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-amber-700"
                onClick={() => likeComment(comentario.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                <span>{comentario.likes}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

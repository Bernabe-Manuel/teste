"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
import { Search, Filter, ThumbsUp, Star, Trash2, Flag, CheckCircle, Eye } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { useRestaurant } from "@/contexts/restaurant-context"

export default function GestaoComentarios() {
  const { comments, approveComment, deleteComment } = useRestaurant()
  const [filtro, setFiltro] = useState("todos")
  const [busca, setBusca] = useState("")
  const [comentarioDetalhes, setComentarioDetalhes] = useState<any>(null)

  const filtrarComentarios = () => {
    let comentariosFiltrados = [...comments]

    // Filtrar por status
    if (filtro !== "todos") {
      comentariosFiltrados = comentariosFiltrados.filter((comentario) => comentario.status === filtro)
    }

    // Filtrar por busca
    if (busca) {
      const termoBusca = busca.toLowerCase()
      comentariosFiltrados = comentariosFiltrados.filter(
        (comentario) =>
          comentario.usuario.toLowerCase().includes(termoBusca) ||
          comentario.comentario.toLowerCase().includes(termoBusca) ||
          comentario.prato.toLowerCase().includes(termoBusca),
      )
    }

    return comentariosFiltrados
  }

  const comentariosFiltrados = filtrarComentarios()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Aprovado
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-amber-100 text-amber-800">
            <Flag className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Buscar comentários..."
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
                <SelectValue placeholder="Filtrar por status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os comentários</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
              <SelectItem value="aprovado">Aprovados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {comentariosFiltrados.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum comentário encontrado com os filtros atuais.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comentariosFiltrados.map((comentario) => (
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
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < comentario.avaliacao ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  {getStatusBadge(comentario.status)}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-700">{comentario.comentario}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-gray-500">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{comentario.likes} likes</span>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setComentarioDetalhes(comentario)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Detalhes do Comentário</DialogTitle>
                        <DialogDescription>Informações completas sobre o comentário</DialogDescription>
                      </DialogHeader>
                      {comentarioDetalhes && (
                        <div className="space-y-4 py-4">
                          <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarFallback className="bg-amber-200 text-amber-800">
                                {comentarioDetalhes.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-lg">{comentarioDetalhes.usuario}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <span>{comentarioDetalhes.data}</span>
                                <span className="mx-2">•</span>
                                <span>{comentarioDetalhes.prato}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${i < comentarioDetalhes.avaliacao ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            {getStatusBadge(comentarioDetalhes.status)}
                          </div>

                          <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-gray-700">{comentarioDetalhes.comentario}</p>
                          </div>

                          <div className="flex items-center text-gray-500">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{comentarioDetalhes.likes} likes</span>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Fechar</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {comentario.status === "pendente" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => approveComment(comentario.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aprovar
                    </Button>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Comentário</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteComment(comentario.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Sim, excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

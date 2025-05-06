"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, CheckCircle, Archive, Trash2, Search, Filter, Mail, Reply } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRestaurant } from "@/contexts/restaurant-context"

export default function GestaoMensagens() {
  const { messages, updateMessageStatus, deleteMessage } = useRestaurant()
  const [filtro, setFiltro] = useState("todas")
  const [busca, setBusca] = useState("")
  const [mensagemDetalhes, setMensagemDetalhes] = useState<any>(null)
  const [isRespondendo, setIsRespondendo] = useState(false)

  const filtrarMensagens = () => {
    let mensagensFiltradas = [...messages]

    // Filtrar por status
    if (filtro !== "todas") {
      mensagensFiltradas = mensagensFiltradas.filter((mensagem) => mensagem.status === filtro)
    }

    // Filtrar por busca
    if (busca) {
      const termoBusca = busca.toLowerCase()
      mensagensFiltradas = mensagensFiltradas.filter(
        (mensagem) =>
          mensagem.nome.toLowerCase().includes(termoBusca) ||
          mensagem.email.toLowerCase().includes(termoBusca) ||
          mensagem.assunto.toLowerCase().includes(termoBusca) ||
          mensagem.mensagem.toLowerCase().includes(termoBusca),
      )
    }

    return mensagensFiltradas
  }

  const mensagensFiltradas = filtrarMensagens()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "respondida":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Respondida
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-amber-100 text-amber-800">
            <Mail className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      case "arquivada":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <Archive className="h-3 w-3 mr-1" />
            Arquivada
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const marcarComoRespondida = (id: number) => {
    updateMessageStatus(id, "respondida")
    setIsRespondendo(false)
  }

  const arquivarMensagem = (id: number) => {
    updateMessageStatus(id, "arquivada")
  }

  const handleResponder = (e: React.FormEvent) => {
    e.preventDefault()
    if (mensagemDetalhes) {
      marcarComoRespondida(mensagemDetalhes.id)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Buscar mensagens..."
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
              <SelectItem value="todas">Todas as mensagens</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
              <SelectItem value="respondida">Respondidas</SelectItem>
              <SelectItem value="arquivada">Arquivadas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Assunto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mensagensFiltradas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  Nenhuma mensagem encontrada com os filtros atuais.
                </TableCell>
              </TableRow>
            ) : (
              mensagensFiltradas.map((mensagem) => (
                <TableRow key={mensagem.id}>
                  <TableCell className="font-medium">{mensagem.data}</TableCell>
                  <TableCell>{mensagem.nome}</TableCell>
                  <TableCell className="hidden md:table-cell">{mensagem.email}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{mensagem.assunto}</TableCell>
                  <TableCell>{getStatusBadge(mensagem.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                setMensagemDetalhes(mensagem)
                                setIsRespondendo(false)
                              }}
                            >
                              Ver detalhes
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            {mensagemDetalhes && !isRespondendo && (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Detalhes da Mensagem</DialogTitle>
                                  <DialogDescription>Informações completas sobre a mensagem</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Informações do Remetente</h4>
                                      <p>
                                        <span className="font-medium">Nome:</span> {mensagemDetalhes.nome}
                                      </p>
                                      <p>
                                        <span className="font-medium">Email:</span> {mensagemDetalhes.email}
                                      </p>
                                      <p>
                                        <span className="font-medium">Data:</span> {mensagemDetalhes.data}
                                      </p>
                                      <p>
                                        <span className="font-medium">Status:</span> {mensagemDetalhes.status}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Assunto</h4>
                                      <p className="font-medium">{mensagemDetalhes.assunto}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Mensagem</h4>
                                    <p className="bg-gray-50 p-3 rounded-md">{mensagemDetalhes.mensagem}</p>
                                  </div>
                                </div>
                                <DialogFooter className="flex justify-between">
                                  <div className="flex space-x-2">
                                    {mensagemDetalhes.status === "pendente" && (
                                      <Button
                                        variant="outline"
                                        onClick={() => setIsRespondendo(true)}
                                        className="border-amber-700 text-amber-700 hover:bg-amber-50"
                                      >
                                        <Reply className="h-4 w-4 mr-2" />
                                        Responder
                                      </Button>
                                    )}
                                    {mensagemDetalhes.status === "pendente" && (
                                      <Button
                                        variant="outline"
                                        onClick={() => arquivarMensagem(mensagemDetalhes.id)}
                                        className="border-gray-500 text-gray-500 hover:bg-gray-50"
                                      >
                                        <Archive className="h-4 w-4 mr-2" />
                                        Arquivar
                                      </Button>
                                    )}
                                  </div>
                                  <DialogClose asChild>
                                    <Button variant="outline">Fechar</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </>
                            )}

                            {mensagemDetalhes && isRespondendo && (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Responder Mensagem</DialogTitle>
                                  <DialogDescription>Envie uma resposta para {mensagemDetalhes.nome}</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleResponder} className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="para">Para</Label>
                                    <Input id="para" value={mensagemDetalhes.email} disabled />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="assunto">Assunto</Label>
                                    <Input id="assunto" defaultValue={`Re: ${mensagemDetalhes.assunto}`} required />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="resposta">Sua Resposta</Label>
                                    <Textarea
                                      id="resposta"
                                      className="min-h-[150px]"
                                      placeholder="Digite sua resposta aqui..."
                                      required
                                    />
                                  </div>
                                  <DialogFooter className="flex justify-between">
                                    <Button type="button" variant="outline" onClick={() => setIsRespondendo(false)}>
                                      Cancelar
                                    </Button>
                                    <Button type="submit" className="bg-amber-700 hover:bg-amber-800">
                                      Enviar Resposta
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>

                        {mensagem.status === "pendente" && (
                          <>
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    setMensagemDetalhes(mensagem)
                                    setIsRespondendo(true)
                                  }}
                                >
                                  <Reply className="h-4 w-4 mr-2 text-amber-600" />
                                  Responder
                                </DropdownMenuItem>
                              </DialogTrigger>
                            </Dialog>
                            <DropdownMenuItem onSelect={() => arquivarMensagem(mensagem.id)}>
                              <Archive className="h-4 w-4 mr-2 text-gray-600" />
                              Arquivar
                            </DropdownMenuItem>
                          </>
                        )}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir Mensagem</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMessage(mensagem.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Sim, excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

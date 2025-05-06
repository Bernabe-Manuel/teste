"use client"

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
import { Clock, MoreVertical, CheckCircle, X, Printer, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRestaurant } from "@/contexts/restaurant-context"

export default function GestaoReservas() {
  const { reservations, updateReservationStatus, cancelReservation } = useRestaurant()
  const [filtro, setFiltro] = useState("todas")
  const [busca, setBusca] = useState("")
  const [reservaDetalhes, setReservaDetalhes] = useState<any>(null)

  const confirmarReserva = (id: number) => {
    updateReservationStatus(id, "confirmada")
  }

  const cancelarReserva = (id: number) => {
    updateReservationStatus(id, "cancelada")
  }

  const filtrarReservas = () => {
    let reservasFiltradas = [...reservations]

    // Filtrar por status
    if (filtro !== "todas") {
      reservasFiltradas = reservasFiltradas.filter((reserva) => reserva.status === filtro)
    }

    // Filtrar por busca
    if (busca) {
      const termoBusca = busca.toLowerCase()
      reservasFiltradas = reservasFiltradas.filter(
        (reserva) =>
          reserva.cliente.toLowerCase().includes(termoBusca) ||
          reserva.email.toLowerCase().includes(termoBusca) ||
          reserva.data.includes(termoBusca),
      )
    }

    return reservasFiltradas
  }

  const reservasFiltradas = filtrarReservas()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmada":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmada
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-amber-100 text-amber-800">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      case "cancelada":
        return (
          <Badge className="bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" />
            Cancelada
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const imprimirRelatorio = () => {
    window.print()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Buscar por nome, email ou data..."
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
              <SelectItem value="todas">Todas as reservas</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
              <SelectItem value="confirmada">Confirmadas</SelectItem>
              <SelectItem value="cancelada">Canceladas</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={imprimirRelatorio} className="hidden sm:flex">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir Relatório
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead className="hidden md:table-cell">Horário</TableHead>
              <TableHead className="hidden md:table-cell">Pessoas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservasFiltradas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  Nenhuma reserva encontrada com os filtros atuais.
                </TableCell>
              </TableRow>
            ) : (
              reservasFiltradas.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell className="font-medium">{reserva.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{reserva.cliente}</p>
                      <p className="text-sm text-gray-500 hidden md:block">{reserva.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{reserva.data}</TableCell>
                  <TableCell className="hidden md:table-cell">{reserva.horario}</TableCell>
                  <TableCell className="hidden md:table-cell">{reserva.pessoas}</TableCell>
                  <TableCell>{getStatusBadge(reserva.status)}</TableCell>
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
                                setReservaDetalhes(reserva)
                              }}
                            >
                              Ver detalhes
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            {reservaDetalhes && (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Detalhes da Reserva #{reservaDetalhes.id}</DialogTitle>
                                  <DialogDescription>Informações completas sobre a reserva</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Informações do Cliente</h4>
                                      <p>
                                        <span className="font-medium">Nome:</span> {reservaDetalhes.cliente}
                                      </p>
                                      <p>
                                        <span className="font-medium">Email:</span> {reservaDetalhes.email}
                                      </p>
                                      <p>
                                        <span className="font-medium">Telefone:</span> {reservaDetalhes.telefone}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Informações da Reserva</h4>
                                      <p>
                                        <span className="font-medium">Data:</span> {reservaDetalhes.data}
                                      </p>
                                      <p>
                                        <span className="font-medium">Horário:</span> {reservaDetalhes.horario}
                                      </p>
                                      <p>
                                        <span className="font-medium">Pessoas:</span> {reservaDetalhes.pessoas}
                                      </p>
                                      <p>
                                        <span className="font-medium">Status:</span> {reservaDetalhes.status}
                                      </p>
                                    </div>
                                  </div>
                                  {reservaDetalhes.observacoes && (
                                    <div>
                                      <h4 className="font-semibold mb-2">Observações</h4>
                                      <p className="bg-gray-50 p-3 rounded-md">{reservaDetalhes.observacoes}</p>
                                    </div>
                                  )}
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Fechar</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                        {reserva.status === "pendente" && (
                          <DropdownMenuItem onSelect={() => confirmarReserva(reserva.id)}>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            Confirmar
                          </DropdownMenuItem>
                        )}
                        {reserva.status !== "cancelada" && (
                          <DropdownMenuItem onSelect={() => cancelarReserva(reserva.id)}>
                            <X className="h-4 w-4 mr-2 text-red-600" />
                            Cancelar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Mostrando {reservasFiltradas.length} de {reservations.length} reservas
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button variant="outline" size="sm" disabled>
            Próxima
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

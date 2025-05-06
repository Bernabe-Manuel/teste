"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, AlertCircle, CheckCircle, X } from "lucide-react"
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
import { useRestaurant } from "@/contexts/restaurant-context"

export default function MinhasReservas() {
  const { reservations, cancelReservation } = useRestaurant()

  // Filtrar apenas as reservas do cliente atual (em um sistema real, isso seria feito com base no ID do usuário)
  const minhasReservas = reservations.filter(
    (reserva) => reserva.cliente === "Cliente Logado" || reserva.email === "cliente@exemplo.com",
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmada":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmada
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {minhasReservas.length === 0 ? (
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">Nenhuma reserva encontrada</h3>
          <p className="text-gray-500 mt-2">Você ainda não possui reservas ativas.</p>
          <Button asChild className="mt-4 bg-amber-700 hover:bg-amber-800">
            <a href="/cliente/dashboard?tab=reservas">Fazer uma Reserva</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {minhasReservas.map((reserva) => (
            <Card key={reserva.id} className="overflow-hidden">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-amber-800">Reserva #{reserva.id}</CardTitle>
                {getStatusBadge(reserva.status)}
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-4 w-4 mr-2 text-amber-700" />
                      <span>Data: {reserva.data}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-amber-700" />
                      <span>Horário: {reserva.horario}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="h-4 w-4 mr-2 text-amber-700" />
                      <span>Pessoas: {reserva.pessoas}</span>
                    </div>
                  </div>
                  {reserva.observacoes && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Observações:</span> {reserva.observacoes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancelar Reserva
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Voltar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => cancelReservation(reserva.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Sim, cancelar
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

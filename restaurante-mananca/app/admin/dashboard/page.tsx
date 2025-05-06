"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GestaoReservas from "@/components/admin/gestao-reservas"
import GestaoPratos from "@/components/admin/gestao-pratos"
import GestaoComentarios from "@/components/admin/gestao-comentarios"
import GestaoMensagens from "@/components/admin/gestao-mensagens"
import { UserCog, CalendarDays, Utensils, MessageSquare, Mail } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"

export default function AdminDashboard() {
  const { reservations, comments, messages } = useRestaurant()

  // Contagem de itens pendentes
  const reservasPendentes = reservations.filter((r) => r.status === "pendente").length
  const comentariosPendentes = comments.filter((c) => c.status === "pendente").length
  const mensagensPendentes = messages.filter((m) => m.status === "pendente").length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-amber-800">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie reservas, pratos e comentários do Restaurante Manança</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="font-medium">Administrador</p>
            <p className="text-sm text-gray-500">admin@mananca.co.ao</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center">
            <UserCog className="h-5 w-5 text-amber-800" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Reservas</CardTitle>
              <CardDescription>Pendentes</CardDescription>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <CalendarDays className="h-5 w-5 text-amber-800" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{reservasPendentes}</p>
            <p className="text-sm text-amber-600 mt-1">Aguardando confirmação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Pratos</CardTitle>
              <CardDescription>Total no cardápio</CardDescription>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Utensils className="h-5 w-5 text-amber-800" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{24}</p>
            <p className="text-sm text-amber-600 mt-1">2 adicionados esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Comentários</CardTitle>
              <CardDescription>Pendentes</CardDescription>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-amber-800" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{comentariosPendentes}</p>
            <p className="text-sm text-amber-600 mt-1">Aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Mensagens</CardTitle>
              <CardDescription>Não respondidas</CardDescription>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Mail className="h-5 w-5 text-amber-800" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mensagensPendentes}</p>
            <p className="text-sm text-amber-600 mt-1">Aguardando resposta</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reservas" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="reservas">Gestão de Reservas</TabsTrigger>
          <TabsTrigger value="pratos">Gestão de Pratos</TabsTrigger>
          <TabsTrigger value="comentarios">Gestão de Comentários</TabsTrigger>
          <TabsTrigger value="mensagens">Gestão de Mensagens</TabsTrigger>
        </TabsList>

        <TabsContent value="reservas">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Reservas</CardTitle>
              <CardDescription>Visualize, confirme ou cancele as reservas realizadas pelos clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <GestaoReservas />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pratos">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Pratos</CardTitle>
              <CardDescription>Adicione, edite ou remova pratos do cardápio do restaurante</CardDescription>
            </CardHeader>
            <CardContent>
              <GestaoPratos />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comentarios">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Comentários</CardTitle>
              <CardDescription>Visualize e gerencie os comentários feitos pelos clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <GestaoComentarios />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mensagens">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Mensagens</CardTitle>
              <CardDescription>Visualize e responda às mensagens enviadas pelos clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <GestaoMensagens />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

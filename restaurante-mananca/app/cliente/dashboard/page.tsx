"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReservaForm from "@/components/cliente/reserva-form"
import MenuCliente from "@/components/cliente/menu-cliente"
import ComentariosCliente from "@/components/cliente/comentarios-cliente"
import MinhasReservas from "@/components/cliente/minhas-reservas"

export default function ClienteDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Área do Cliente</h1>

      <Tabs defaultValue="reservas" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="reservas">Fazer Reserva</TabsTrigger>
          <TabsTrigger value="minhas-reservas">Minhas Reservas</TabsTrigger>
          <TabsTrigger value="menu">Cardápio</TabsTrigger>
          <TabsTrigger value="comentarios">Comentários</TabsTrigger>
        </TabsList>

        <TabsContent value="reservas">
          <Card>
            <CardHeader>
              <CardTitle>Reservar Mesa</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo para fazer uma reserva no Restaurante Manança
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReservaForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="minhas-reservas">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Reservas</CardTitle>
              <CardDescription>Veja e gerencie suas reservas no Restaurante Manança</CardDescription>
            </CardHeader>
            <CardContent>
              <MinhasReservas />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Nosso Cardápio</CardTitle>
              <CardDescription>Conheça os pratos típicos angolanos disponíveis no Restaurante Manança</CardDescription>
            </CardHeader>
            <CardContent>
              <MenuCliente />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comentarios">
          <Card>
            <CardHeader>
              <CardTitle>Comentários</CardTitle>
              <CardDescription>Deixe sua opinião sobre nossos pratos e serviços</CardDescription>
            </CardHeader>
            <CardContent>
              <ComentariosCliente />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

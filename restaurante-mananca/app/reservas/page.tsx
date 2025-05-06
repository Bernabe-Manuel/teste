"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Calendar, Clock, Users, Info } from "lucide-react"
import Image from "next/image"

export default function ReservasPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de envio de reserva
    setTimeout(() => {
      setIsLoading(false)

      if (isLoggedIn) {
        setSuccess(true)

        // Resetar o formulário após 3 segundos
        setTimeout(() => {
          setSuccess(false)
          e.currentTarget.reset()
        }, 3000)
      } else {
        // Redirecionar para login se não estiver logado
        window.location.href = "/login"
      }
    }, 1500)
  }

  const horariosDisponiveis = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800">Reservas</h1>
        <p className="mt-4 text-xl text-gray-600">
          Reserve sua mesa no Restaurante Manança e desfrute de uma experiência gastronômica autêntica
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-amber-800">Faça sua Reserva</CardTitle>
              <CardDescription>Preencha o formulário abaixo para reservar sua mesa</CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-800">Reserva confirmada!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Sua reserva foi realizada com sucesso. Você receberá uma confirmação por email em breve.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" name="nome" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" name="telefone" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="data">Data da Reserva</Label>
                      <Input id="data" name="data" type="date" required min={new Date().toISOString().split("T")[0]} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="horario">Horário</Label>
                      <Select name="horario" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {horariosDisponiveis.map((horario) => (
                            <SelectItem key={horario} value={horario}>
                              {horario}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pessoas">Número de Pessoas</Label>
                      <Select name="pessoas" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "pessoa" : "pessoas"}
                            </SelectItem>
                          ))}
                          <SelectItem value="mais">Mais de 8 pessoas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ocasiao">Ocasião (opcional)</Label>
                    <Select name="ocasiao">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione se aplicável" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aniversario">Aniversário</SelectItem>
                        <SelectItem value="negocios">Reunião de Negócios</SelectItem>
                        <SelectItem value="romantico">Jantar Romântico</SelectItem>
                        <SelectItem value="familia">Reunião Familiar</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacoes">Observações Especiais (opcional)</Label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      className="w-full min-h-[100px] p-3 border rounded-md"
                      placeholder="Informe qualquer necessidade especial, preferência de mesa, restrições alimentares, etc."
                    />
                  </div>

                  <Alert className="bg-amber-50 border-amber-200">
                    <Info className="h-5 w-5 text-amber-600" />
                    <AlertDescription className="text-amber-700">
                      Para confirmar sua reserva, você precisa estar logado. Se ainda não tem uma conta, você será
                      redirecionado para a página de login.
                    </AlertDescription>
                  </Alert>

                  <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800" disabled={isLoading}>
                    {isLoading ? "Processando..." : "Confirmar Reserva"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <div className="relative h-64 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Restaurante Manança"
              fill
              className="object-cover"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-amber-800">Informações Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-amber-700 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Política de Reservas</p>
                  <p className="text-gray-600">
                    Recomendamos fazer sua reserva com pelo menos 24 horas de antecedência, especialmente para finais de
                    semana.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-amber-700 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Tolerância de Atraso</p>
                  <p className="text-gray-600">
                    Mantemos sua reserva por até 15 minutos após o horário marcado. Após esse período, a mesa poderá ser
                    liberada para outros clientes.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="h-5 w-5 text-amber-700 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Grupos Grandes</p>
                  <p className="text-gray-600">
                    Para grupos com mais de 8 pessoas, entre em contato diretamente pelo telefone +244 923 456 789 para
                    verificarmos a disponibilidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Info className="h-5 w-5 text-amber-700 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Cancelamentos</p>
                  <p className="text-gray-600">
                    Caso precise cancelar sua reserva, pedimos que nos informe com pelo menos 4 horas de antecedência.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

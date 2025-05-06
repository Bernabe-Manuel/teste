"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"

export default function ReservaForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { addReservation } = useRestaurant()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Get form data
    const formData = new FormData(e.currentTarget)
    const data = {
      cliente: "Cliente Logado", // Normalmente viria do contexto de autenticação
      email: "cliente@exemplo.com", // Normalmente viria do contexto de autenticação
      telefone: "+244 923 456 789", // Normalmente viria do formulário ou contexto
      data: formData.get("data") as string,
      horario: formData.get("horario") as string,
      pessoas: Number(formData.get("pessoas")),
      observacoes: (formData.get("observacoes") as string) || "",
    }

    // Simulação de envio de reserva
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)

      // Adicionar a reserva ao contexto
      addReservation(data)

      // Resetar o formulário após 3 segundos
      setTimeout(() => {
        setSuccess(false)
        if (formRef.current) {
          formRef.current.reset()
        }
      }, 3000)
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
    <div className="space-y-6">
      {success ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">Reserva confirmada!</AlertTitle>
          <AlertDescription className="text-green-700">
            Sua reserva foi realizada com sucesso. Você receberá uma confirmação por email em breve.
          </AlertDescription>
        </Alert>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data">Data da Reserva</Label>
              <Input id="data" name="data" type="date" required min={new Date().toISOString().split("T")[0]} />
            </div>

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800" disabled={isLoading}>
            {isLoading ? "Processando..." : "Confirmar Reserva"}
          </Button>
        </form>
      )}
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"
import { useRestaurant } from "@/contexts/restaurant-context"

export default function ContatoPage() {
  const { addMessage } = useRestaurant()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Get form data
    const formData = new FormData(e.currentTarget)
    const data = {
      nome: formData.get("nome") as string,
      email: formData.get("email") as string,
      assunto: formData.get("assunto") as string,
      mensagem: formData.get("mensagem") as string,
    }

    // Simulação de envio de mensagem
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)

      // Adicionar a mensagem ao contexto
      addMessage(data)

      // Resetar o formulário após 3 segundos
      setTimeout(() => {
        setSuccess(false)
        if (formRef.current) {
          formRef.current.reset()
        }
      }, 3000)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800">Contato</h1>
        <p className="mt-4 text-xl text-gray-600">Entre em contato conosco ou visite o Restaurante da Manança</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-amber-800">Envie-nos uma Mensagem</CardTitle>
              <CardDescription>Preencha o formulário abaixo para entrar em contato conosco</CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-800">Mensagem enviada!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.
                  </AlertDescription>
                </Alert>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="assunto">Assunto</Label>
                    <Input id="assunto" name="assunto" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem</Label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      className="w-full min-h-[150px] p-3 border rounded-md"
                      required
                    />
                  </div>

                  <Button type="submit" className="bg-amber-700 hover:bg-amber-800" disabled={isLoading}>
                    <Send className="h-4 w-4 mr-2" />
                    {isLoading ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <div className="relative h-64 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop"
              alt="Restaurante da Manança"
              fill
              className="object-cover"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-amber-800">Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-amber-700 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-gray-600">+244 923 003 486</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-amber-700 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@restaurantedamananca.co.ao</p>
                  <p className="text-gray-600">reservas@restaurantedamananca.co.ao</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-amber-700 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Horário de Funcionamento</p>
                  <p className="text-gray-600">Segunda a Sexta: 08:00 - 22:00</p>
                  <p className="text-gray-600">Sábado e Domingo: 08:00 - 22:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export default function RegistroPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de registro
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)

      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      {success ? (
        <Alert className="w-full max-w-md bg-green-50 border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">Cadastro realizado com sucesso!</AlertTitle>
          <AlertDescription className="text-green-700">
            Seu cadastro foi realizado com sucesso. Você será redirecionado para a página de login em instantes.
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-amber-800">Crie sua conta</CardTitle>
            <CardDescription className="text-center">Preencha os dados abaixo para se registrar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegistro}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" name="nome" placeholder="Seu nome completo" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="seu.email@exemplo.com" required type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" name="telefone" placeholder="+244 923 456 789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" name="password" required type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input id="confirmPassword" name="confirmPassword" required type="password" />
                </div>
                <Button className="w-full bg-amber-700 hover:bg-amber-800" type="submit" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Registrar"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-amber-700 hover:underline">
                Faça login
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

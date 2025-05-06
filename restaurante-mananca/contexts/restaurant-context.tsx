"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Reservation = {
  id: number
  cliente: string
  email: string
  telefone: string
  data: string
  horario: string
  pessoas: number
  status: "pendente" | "confirmada" | "cancelada"
  observacoes: string
}

type Comment = {
  id: number
  usuario: string
  avatar: string
  data: string
  prato: string
  avaliacao: number
  comentario: string
  likes: number
  status: "pendente" | "aprovado"
}

type Message = {
  id: number
  nome: string
  email: string
  assunto: string
  mensagem: string
  data: string
  status: "pendente" | "respondida" | "arquivada"
}

type Dish = {
  id: number
  nome: string
  categoria: string
  descricao: string
  preco: string
  imagem: string
  destaque?: boolean
  avaliacao?: number
}

type RestaurantContextType = {
  reservations: Reservation[]
  comments: Comment[]
  dishes: Dish[]
  messages: Message[]
  addReservation: (reservation: Omit<Reservation, "id" | "status">) => void
  updateReservationStatus: (id: number, status: "pendente" | "confirmada" | "cancelada") => void
  cancelReservation: (id: number) => void
  addComment: (comment: Omit<Comment, "id" | "status" | "likes">) => void
  approveComment: (id: number) => void
  deleteComment: (id: number) => void
  likeComment: (id: number) => void
  addDish: (dish: Omit<Dish, "id">) => void
  updateDish: (id: number, dish: Omit<Dish, "id">) => void
  deleteDish: (id: number) => void
  getDishByCategory: (category: string) => Dish[]
  addMessage: (message: Omit<Message, "id" | "status" | "data">) => void
  updateMessageStatus: (id: number, status: "pendente" | "respondida" | "arquivada") => void
  deleteMessage: (id: number) => void
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined)

// Dados iniciais
const initialReservations: Reservation[] = [
  {
    id: 1,
    cliente: "Maria Silva",
    email: "maria.silva@exemplo.com",
    telefone: "+244 923 456 789",
    data: "10/05/2025",
    horario: "19:30",
    pessoas: 4,
    status: "confirmada",
    observacoes: "Mesa próxima à janela, se possível.",
  },
  {
    id: 2,
    cliente: "João Pereira",
    email: "joao.pereira@exemplo.com",
    telefone: "+244 912 345 678",
    data: "10/05/2025",
    horario: "20:00",
    pessoas: 2,
    status: "pendente",
    observacoes: "Aniversário de casamento.",
  },
  {
    id: 3,
    cliente: "Ana Martins",
    email: "ana.martins@exemplo.com",
    telefone: "+244 934 567 890",
    data: "10/05/2025",
    horario: "13:00",
    pessoas: 6,
    status: "confirmada",
    observacoes: "",
  },
]

const initialComments: Comment[] = [
  {
    id: 1,
    usuario: "Maria Silva",
    avatar: "MS",
    data: "15/04/2025",
    prato: "Muamba de Galinha",
    avaliacao: 5,
    comentario:
      "Simplesmente delicioso! A muamba estava no ponto perfeito, com aquele sabor autêntico que me lembrou da minha infância em Luanda.",
    likes: 12,
    status: "aprovado",
  },
  {
    id: 2,
    usuario: "João Pereira",
    avatar: "JP",
    data: "10/04/2025",
    prato: "Calulu de Peixe",
    avaliacao: 4,
    comentario:
      "Muito bom! O peixe estava fresco e o molho delicioso. Recomendo a todos que querem experimentar a verdadeira culinária angolana.",
    likes: 8,
    status: "aprovado",
  },
  {
    id: 3,
    usuario: "Ana Martins",
    avatar: "AM",
    data: "02/04/2025",
    prato: "Geral",
    avaliacao: 5,
    comentario:
      "Ambiente acolhedor, atendimento excelente e comida maravilhosa. Já é o meu restaurante favorito em Viana!",
    likes: 15,
    status: "aprovado",
  },
]

// Dados iniciais das mensagens
const initialMessages: Message[] = [
  {
    id: 1,
    nome: "Carlos Mendes",
    email: "carlos.mendes@exemplo.com",
    assunto: "Reserva para evento corporativo",
    mensagem:
      "Gostaria de saber se é possível fazer uma reserva para um evento corporativo com 20 pessoas no próximo mês. Quais seriam as opções de menu e preços?",
    data: "05/05/2025",
    status: "pendente",
  },
  {
    id: 2,
    nome: "Sofia Almeida",
    email: "sofia.almeida@exemplo.com",
    assunto: "Dúvida sobre estacionamento",
    mensagem:
      "Olá! Gostaria de saber se o restaurante possui estacionamento próprio ou se há algum estacionamento próximo. Obrigada!",
    data: "03/05/2025",
    status: "respondida",
  },
]

// Dados iniciais dos pratos
const initialDishes: Dish[] = [
  {
    id: 1,
    nome: "Moamba de Jinguba",
    categoria: "entradas",
    descricao: "Entrada tradicional feita com pasta de amendoim e especiarias angolanas",
    preco: "1.500 Kz",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kxjbFXA0x2pJtRucqW68AvhZGDOEbE.png",
    avaliacao: 4.7,
  },
  {
    id: 2,
    nome: "Rissóis de Camarão",
    categoria: "entradas",
    descricao: "Pastéis fritos recheados com camarão e molho bechamel",
    preco: "1.800 Kz",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OdAqPTW7LGGs6bO7Kfe3be4BrXFtCT.png",
    avaliacao: 4.5,
  },
  {
    id: 3,
    nome: "Salada de Feijão Frade",
    categoria: "entradas",
    descricao: "Feijão frade com cebola, pimentão e azeite de dendê",
    preco: "1.200 Kz",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8MVt1RsdJGSJDdMgmiidO82sOjhjF4.png",
    avaliacao: 4.3,
  },
  {
    id: 4,
    nome: "Muamba de Galinha",
    categoria: "principais",
    descricao: "Tradicional guisado de galinha com óleo de palma, amendoim e quiabos",
    preco: "3.500 Kz",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fzEVhM886scTAqfOl46C4f8jl0WZLs.png",
    avaliacao: 4.9,
    destaque: true,
  },
  {
    id: 5,
    nome: "Calulu de Peixe",
    categoria: "principais",
    descricao: "Peixe seco cozido com quiabos, bertalha e jindungo",
    preco: "3.800 Kz",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6x76OaNz1D2teGhKHMrOycT0r3MDpZ.png",
    avaliacao: 4.6,
  },
  {
    id: 6,
    nome: "Funge com Mufete",
    categoria: "principais",
    descricao: "Peixe grelhado servido com funge (pirão de mandioca) e molho de cebola",
    preco: "4.200 Kz",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QGdjnHkjsG0OwmS9iCtKrSTmOUGOSG.png",
    avaliacao: 4.8,
    destaque: true,
  },
  {
    id: 7,
    nome: "Kizaka com Carne Seca",
    categoria: "principais",
    descricao: "Folhas de mandioca cozidas com carne seca e óleo de palma",
    preco: "3.200 Kz",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FkpGlovJGgG4kycRXXtmQEfu6WiITT.png",
    avaliacao: 4.5,
  },
  {
    id: 8,
    nome: "Cocada Amarela",
    categoria: "sobremesas",
    descricao: "Doce tradicional feito com coco ralado, açúcar e gemas de ovo",
    preco: "1.200 Kz",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c2UWPbWKsXUh6sQtWVX9iJ90OlUfXU.png",
    avaliacao: 4.7,
    destaque: true,
  },
  {
    id: 9,
    nome: "Paracuca",
    categoria: "sobremesas",
    descricao: "Doce crocante de amendoim torrado com açúcar caramelizado",
    preco: "900 Kz",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oRlOziZNaZbemkcGG9sF8gq1q56EKR.png",
    avaliacao: 4.4,
  },
  {
    id: 10,
    nome: "Bolo de Mandioca",
    categoria: "sobremesas",
    descricao: "Bolo úmido feito com mandioca ralada, coco e canela",
    preco: "1.100 Kz",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A2TIHFZ33huWpHL71eKGxWYUc1nfgf.png",
    avaliacao: 4.6,
  },
  {
    id: 11,
    nome: "Kissangua",
    categoria: "bebidas",
    descricao: "Bebida fermentada tradicional feita com milho e frutas",
    preco: "800 Kz",
    imagem: "/images/kissangua.png",
    avaliacao: 4.3,
  },
  {
    id: 12,
    nome: "Suco de Múcua",
    categoria: "bebidas",
    descricao: "Suco refrescante feito com fruta do baobá",
    preco: "1.000 Kz",
    imagem: "/images/suco-mucua.png",
    avaliacao: 4.5,
  },
  {
    id: 13,
    nome: "Cerveja Cuca",
    categoria: "bebidas",
    descricao: "Cerveja local angolana, servida bem gelada",
    preco: "700 Kz",
    imagem: "/images/cerveja-cuca.png",
    avaliacao: 4.4,
  },
]

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    // Tenta recuperar do localStorage se estiver no cliente
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("restaurantReservations")
      return saved ? JSON.parse(saved) : initialReservations
    }
    return initialReservations
  })

  const [comments, setComments] = useState<Comment[]>(() => {
    // Tenta recuperar do localStorage se estiver no cliente
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("restaurantComments")
      return saved ? JSON.parse(saved) : initialComments
    }
    return initialComments
  })

  const [dishes, setDishes] = useState<Dish[]>(() => {
    // Tenta recuperar do localStorage se estiver no cliente
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("restaurantDishes")
      return saved ? JSON.parse(saved) : initialDishes
    }
    return initialDishes
  })

  const [messages, setMessages] = useState<Message[]>(() => {
    // Tenta recuperar do localStorage se estiver no cliente
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("restaurantMessages")
      return saved ? JSON.parse(saved) : initialMessages
    }
    return initialMessages
  })

  // Salvar no localStorage quando o estado mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("restaurantReservations", JSON.stringify(reservations))
      localStorage.setItem("restaurantComments", JSON.stringify(comments))
      localStorage.setItem("restaurantDishes", JSON.stringify(dishes))
      localStorage.setItem("restaurantMessages", JSON.stringify(messages))
    }
  }, [reservations, comments, dishes, messages])

  const addReservation = (reservation: Omit<Reservation, "id" | "status">) => {
    const newReservation = {
      ...reservation,
      id: reservations.length > 0 ? Math.max(...reservations.map((r) => r.id)) + 1 : 1,
      status: "pendente" as const,
    }
    setReservations([...reservations, newReservation])
  }

  const updateReservationStatus = (id: number, status: "pendente" | "confirmada" | "cancelada") => {
    setReservations(
      reservations.map((reservation) => (reservation.id === id ? { ...reservation, status } : reservation)),
    )
  }

  const cancelReservation = (id: number) => {
    setReservations(reservations.filter((reservation) => reservation.id !== id))
  }

  const addComment = (comment: Omit<Comment, "id" | "status" | "likes">) => {
    const newComment = {
      ...comment,
      id: comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
      status: "pendente" as const,
      likes: 0,
    }
    setComments([newComment, ...comments])
  }

  const approveComment = (id: number) => {
    setComments(comments.map((comment) => (comment.id === id ? { ...comment, status: "aprovado" } : comment)))
  }

  const deleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id))
  }

  const likeComment = (id: number) => {
    setComments(comments.map((comment) => (comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment)))
  }

  // Funções para gerenciar pratos
  const addDish = (dish: Omit<Dish, "id">) => {
    const newDish = {
      ...dish,
      id: dishes.length > 0 ? Math.max(...dishes.map((d) => d.id)) + 1 : 1,
    }
    setDishes([...dishes, newDish])
  }

  const updateDish = (id: number, dish: Omit<Dish, "id">) => {
    setDishes(dishes.map((d) => (d.id === id ? { ...dish, id } : d)))
  }

  const deleteDish = (id: number) => {
    setDishes(dishes.filter((dish) => dish.id !== id))
  }

  const getDishByCategory = (category: string) => {
    return dishes.filter((dish) => dish.categoria === category)
  }

  // Funções para gerenciar mensagens
  const addMessage = (message: Omit<Message, "id" | "status" | "data">) => {
    const newMessage = {
      ...message,
      id: messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1,
      status: "pendente" as const,
      data: new Date().toLocaleDateString("pt-BR"),
    }
    setMessages([newMessage, ...messages])
  }

  const updateMessageStatus = (id: number, status: "pendente" | "respondida" | "arquivada") => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, status } : message)))
  }

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id))
  }

  return (
    <RestaurantContext.Provider
      value={{
        reservations,
        comments,
        dishes,
        messages,
        addReservation,
        updateReservationStatus,
        cancelReservation,
        addComment,
        approveComment,
        deleteComment,
        likeComment,
        addDish,
        updateDish,
        deleteDish,
        getDishByCategory,
        addMessage,
        updateMessageStatus,
        deleteMessage,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant() {
  const context = useContext(RestaurantContext)
  if (context === undefined) {
    throw new Error("useRestaurant must be used within a RestaurantProvider")
  }
  return context
}

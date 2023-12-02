"use client"

import { useState, useEffect, createContext } from "react"
import axios from "axios"
import { Categoria, Producto } from "@prisma/client"

interface Children {
  children: React.ReactNode
}

interface ExtendedCategoria extends Categoria {
  productos?: Producto[]
}

export const KioskoContext = createContext<{
  categorias: ExtendedCategoria[],
  categoriaActual: ExtendedCategoria,
  handleClickCategoria: (id: number) => void
}>({
  categorias: [],
  categoriaActual: {
    id: 0,
    nombre: "",
    icono: ""
  },
  handleClickCategoria: (id: number) => {}
})

export const KioskoProvider = ({ children }: Children) => {
  const [ categorias, setCategorias ] = useState<ExtendedCategoria[]>([])
  const [ categoriaActual, setCategoriaActual ] = useState({
    id: 0,
    nombre: "",
    icono: ""
  })

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias")

    setCategorias(data)
  }

  useEffect(() => {
    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])

  const handleClickCategoria = (id: number) => {
    // me busca la categoria actual en toda la lista de categorias
    const categoria = categorias.filter(cat => cat.id === id)

    setCategoriaActual(categoria[0])
  }

  return (
    <KioskoContext.Provider value={{
      categorias,
      categoriaActual,
      handleClickCategoria
    }}>
      {children}
    </KioskoContext.Provider>
  )
}

export default KioskoContext
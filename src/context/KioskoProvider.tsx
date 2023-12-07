"use client"

import { useState, useEffect, createContext } from "react"
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify'
import axios from "axios"
import { Categoria, Producto } from "@prisma/client"

interface Children {
  children: React.ReactNode;
}

interface ExtendedCategoria extends Categoria {
  productos?: Producto[];
}

interface ProductoPedido extends Producto {
  cantidad: number;
}

export interface ProductoPedidoFormateado extends Omit<ProductoPedido, "categoriaId"> {}

export const KioskoContext = createContext<{
  categorias: ExtendedCategoria[],
  categoriaActual: ExtendedCategoria,
  handleClickCategoria: (id: number) => void,
  producto: any,
  handleSetProducto: (p: Producto) => void,
  modal: boolean,
  handleShowModal: () => void,
  handleAgregarPedido: (p: ProductoPedido) => void,
  pedido: ProductoPedidoFormateado[],
  handleEditarCantidades: (id: number) => void,
  handleEliminarProducto: (id: number) => void,
  nombre: string,
  setNombre: (n: string) => void,
  colocarOrden: (e: React.FormEvent<HTMLFormElement>) => void,
  total: number
}>({
  categorias: [],
  categoriaActual: {
    id: 0,
    nombre: "",
    icono: ""
  },
  handleClickCategoria: (id: number) => {},
  producto: {},
  handleSetProducto: (p: Producto) => {},
  modal: false,
  handleShowModal: () => {},
  handleAgregarPedido: (p: ProductoPedido) => {},
  pedido: [],
  handleEditarCantidades: (id: number) => {},
  handleEliminarProducto: (id: number) => {},
  nombre: "",
  setNombre: (n: string) => {},
  colocarOrden: (e: React.FormEvent<HTMLFormElement>) => {},
  total: 0
})

export const KioskoProvider = ({ children }: Children) => {
  const router = useRouter()
  const [ categorias, setCategorias ] = useState<ExtendedCategoria[]>([])
  const [ categoriaActual, setCategoriaActual ] = useState({
    id: 0,
    nombre: "",
    icono: ""
  })
  const [ producto, setProducto ] = useState({})
  const [ modal, setModal ] = useState(false)
  const [ pedido, setPedido ] = useState<ProductoPedidoFormateado[]>([])
  const [ nombre, setNombre ] = useState("")
  const [ total, setTotal ] = useState(0)

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

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)

    setTotal(nuevoTotal)
  }, [pedido])

  const handleClickCategoria = (id: number) => {
    // me busca la categoria actual en toda la lista de categorias
    const categoria = categorias.filter(cat => cat.id === id)

    setCategoriaActual(categoria[0])
    router.push("/")
  }

  const handleSetProducto = (producto: Producto) => {
    setProducto(producto)
  }

  const handleShowModal = () => {
    setModal(!modal)
  }

  // lo que hace el siguiente destructuring es que del objeto producto me toma el resto de las props menos categoriaId ya que no lo preciso
  const handleAgregarPedido = ({ categoriaId, ...producto}: ProductoPedido) => {
    if (pedido.some(productoState => productoState.id === producto.id)) {
      // si el producto ya existe entonces actualizar la cantidad
      const pedidoActualizado = pedido.map(prodState => prodState.id === producto.id ? producto : prodState)

      setPedido(pedidoActualizado)
      toast.success("Guardado Correctamente")
    } else {
      // el producto no existe en el pedido general por lo tanto lo agrega
      setPedido([...pedido, producto])
      toast.success("Agregado al Pedido")
    }

    setModal(false)
  }

  const handleEditarCantidades = (id: number) => {
    const productoActualizar = pedido.filter(productoState => productoState.id === id)

    setProducto(productoActualizar[0])
    setModal(!modal)
  }

  const handleEliminarProducto = (id: number) => {
    const pedidoActualizado = pedido.filter(productoState => productoState.id !== id)

    setPedido(pedidoActualizado)
  }

  const colocarOrden = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await axios.post("/api/ordenes", {
      pedido,
      nombre,
      total,
      fecha: Date.now().toString()
    })

    // resetear la app
    setCategoriaActual(categorias[0])
    setPedido([])
    setNombre("")
    setTotal(0)

    toast.success("Pedido Realizado Correctamente")

    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  return (
    <KioskoContext.Provider value={{
      categorias,
      categoriaActual,
      handleClickCategoria,
      producto,
      handleSetProducto,
      modal,
      handleShowModal,
      handleAgregarPedido,
      pedido,
      handleEditarCantidades,
      handleEliminarProducto,
      nombre,
      setNombre,
      colocarOrden,
      total
    }}>
      {children}
    </KioskoContext.Provider>
  )
}

export default KioskoContext
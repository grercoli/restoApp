"use client"

import useSWR from 'swr'
import axios from 'axios'
import { OrdenComponent } from '@/src/components/Orden'
import { Orden } from '@prisma/client'
import { ProductoPedidoFormateado } from '@/src/context/KioskoProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface OrdenFormateada extends Omit<Orden, "pedido"> {
  pedido: ProductoPedidoFormateado[]
}

const Admin = () => {
  // es una consulta a la API pero utilizando la forma de promises (then) con axios
  const fetcher = () => axios("/api/ordenes").then(datos => datos.data)

  const { data, error, isLoading } = useSWR("/api/ordenes", fetcher, { refreshInterval: 100 })

  return (
    <>
      <h1 className="text-4xl font-black">Panel de Administracion</h1>
      <p className="text-2xl my-10">Administra las Ordenes</p>

      {data && data.length ? data.map((orden: OrdenFormateada) => (
        <OrdenComponent key={orden.id} orden={orden} />
      )) : (
        <p>No hay ordenes pendientes</p>
      )}

      <ToastContainer />
    </>
  )
}

export default Admin

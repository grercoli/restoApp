"use client"

import { productos } from "@/prisma/data/productos";
import Sidebar from "../components/Sidebar";
import Producto from "../components/Producto";
import useKiosko from "../hooks/useKiosko";

// esto es un React Server Component, codigo que se ejecuta en el BE y como esta en el BE puede llamar codigo a otra ruta (route.ts)
const Home = () => {
  const { categoriaActual } = useKiosko();

  return (
    <div className="md:flex">
      <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
        <Sidebar />
      </aside>
      <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
        <div className="p-10">
          <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
          <p className="text-2xl my-10">Elige y personaliza tu pedido a continuación</p>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {categoriaActual?.productos?.map(producto => <Producto {...producto} key={producto.id} />)}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home;
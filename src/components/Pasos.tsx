'use client'

import { useRouter, usePathname } from "next/navigation"

const pasos = [
  { paso: 1, nombre: "Menú", url: "/" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Datos y Total", url: "/total" },
]

const Pasos = () => {
  const router = useRouter()
  const pathname = usePathname()

  const calcularProgreso = () => {
    // return (paso / 3) * 100
    let valor

    switch (pathname) {
      case "/":
        valor = 2
        break
      case "/resumen":
        valor = 50
        break
      case "/total":
        valor = 100
        break
    }

    return valor
  }

  return (
    <>
      <div className="flex justify-between mb-5">
        {pasos.map(paso => (
          <button 
            key={paso.paso} 
            className="text-2xl font-bold" 
            onClick={() => router.push(paso.url)}
          >
            {paso.nombre}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 mb-10">
        <div 
          className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white" 
          style={{ width: `${calcularProgreso()}%` }}
        ></div>
      </div>
    </>
  )
}

export default Pasos

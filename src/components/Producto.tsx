import { Producto } from "@prisma/client"
import Image from "next/image"
import { formatearDinero } from "@/src/helpers/index"
import useKiosko from "../hooks/useKiosko";

interface ProductoProps {
  producto: Producto
}

const Producto: React.FC<ProductoProps> = ({producto }) => {
  const { nombre, imagen, precio } = producto;
  const { handleSetProducto, handleShowModal } = useKiosko();

  return (
    <div className="border p-3">
      <Image src={`/assets/img/${imagen}.jpg`} alt={`Imagen platillo ${nombre}`} width={400} height={500} />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>
        <button 
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
          onClick={() => {
            handleShowModal()
            handleSetProducto(producto)
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  )
}

export default Producto

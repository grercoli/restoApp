import { Producto } from "@prisma/client"
import Image from "next/image"
import { formatearDinero } from "@/src/helpers/index"

const Producto: React.FC<Producto> = ({ nombre, imagen, precio }) => {
  return (
    <div className="border p-3">
      <Image src={`/assets/img/${imagen}.jpg`} alt={`Imagen platillo ${nombre}`} width={400} height={500} />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>
      </div>
    </div>
  )
}

export default Producto

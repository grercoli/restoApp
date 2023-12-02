import { Categoria } from "@prisma/client"
import Image from "next/image"
import useKiosko from "../hooks/useKiosko";

const Categoria: React.FC<Categoria> = ({ nombre, icono, id }) => {
  const { categoriaActual, handleClickCategoria } = useKiosko();

  return (
    <div className={`${categoriaActual?.id === id ? "bg-amber-400 " : ""}flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:cursor-pointer`}>
      <Image width={70} height={70} alt="imagen icono" src={`/assets/img/icono_${icono}.svg`} />

      <button type="button" className="text-2xl font-bold" onClick={() => handleClickCategoria(id)}>{nombre}</button>
    </div>
  )
}

export default Categoria

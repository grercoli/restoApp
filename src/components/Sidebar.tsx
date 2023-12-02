"use client"

import Image from "next/image"
import useKiosko from "../hooks/useKiosko"
import Categoria from "./Categoria";

const Sidebar = () => {
  const { categorias } = useKiosko();

  return (
    <>
      <Image width={300} height={100} src="/assets/img/logo.svg" alt="imagen logo" />

      <nav className="mt-10">
        {categorias.map(categoria => <Categoria {...categoria} key={categoria.id} />)}
      </nav>
    </>
  )
}

export default Sidebar

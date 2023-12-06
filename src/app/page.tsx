"use client"

import Modal from "react-modal"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Producto from "../components/Producto";
import ModalProducto from "../components/ModalProducto";

import useKiosko from "../hooks/useKiosko";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// esto es un React Server Component, codigo que se ejecuta en el BE y como esta en el BE puede llamar codigo a otra ruta (route.ts)
const Home = () => {
  const { categoriaActual, modal } = useKiosko();

  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">Elige y personaliza tu pedido a continuación</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categoriaActual?.productos?.map(producto => <Producto producto={producto} key={producto.id} />)}
      </div>

      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto />
        </Modal>
      )}

      <ToastContainer />
    </>
  )
}

export default Home;
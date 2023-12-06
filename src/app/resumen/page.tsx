'use client'

import Modal from "react-modal"
import { ToastContainer } from "react-toastify";
import useKiosko from "@/src/hooks/useKiosko"
import ResumenProducto from "@/src/components/ResumenProducto"
import ModalProducto from "@/src/components/ModalProducto";

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

const Resumen = () => {
  const { pedido, modal } = useKiosko()

  return (
    <>
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu pedido</p>

      {pedido.length === 0 ? (
        <p className="text-center text-2xl">No hay elementos en tu pedido</p>
      ) : (
        pedido.map(producto => (
          <ResumenProducto key={producto.id} producto={producto} />
        ))
      )}

      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto />
        </Modal>
      )}

      <ToastContainer />
    </>
  )
}

export default Resumen

import { useContext } from "react"
import KioskoContext from "../context/KioskoProvider"

const useKiosko = () => {
  const context = useContext(KioskoContext)

  if (!context) {
    throw new Error("useKiosko must be used within a KioskoProvider");
  }

  return context
}

export default useKiosko

import { NextResponse } from "next/server";
import { prisma } from "@/src/libs/prisma"

export async function GET() {
  try {
    // busca todos los registros dentro de una tabla
    // con el include te agregue el campo productos asociado que tiene categoria, por lo tanto trae todos los productos de la categoria en cuestion. A esto se lo conoce como eager loading
    const categorias = await prisma.categoria.findMany({
      include: {
        productos: true
      }
    });

    return NextResponse.json(categorias)
  } catch(error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    }
  }
}
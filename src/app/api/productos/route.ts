// para pedir a la base de datos listado de productos completo

import { NextResponse } from "next/server";
import { prisma } from "@/src/libs/prisma"

export async function GET() {
  try {
    // busca todos los registros dentro de una tabla
    const productos = await prisma.producto.findMany();

    return NextResponse.json(productos)
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

// para crear voy a tener que recibir datos, por lo tanto voy a recibir un request con la info
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { nombre, precio } = body;
  
//     const newProduct = await prisma.producto.create({
//       data: {
//         nombre,
//         precio
//       }
//     })
  
//     return NextResponse.json(newProduct)
//   } catch(error) {
//     if (error instanceof Error) {
//       return NextResponse.json({
//         message: error.message
//       }, {
//         status: 500
//       })
//     }
//   }
// }

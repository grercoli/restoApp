// para pedir a la base de datos un producto en especifico (a traves del id).. lo que va dentro del corchete es que va a variar osea va a ser dinamico [id]. El corchete con el id significa que el texto que viene despues va a ser dinamico

import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client"
import { prisma } from "@/src/libs/prisma"

interface Params {
  params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const product = await prisma.producto.findFirst({
      where: {
        id: Number(params.id)
      }
    })

    if (!product) {
      return NextResponse.json({
        message: "Product not found",
        status: 404
      })
    }
  
    return NextResponse.json(product)
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

// export async function DELETE(request: Request, { params }: Params) {
//   try {
//     const deletedProduct = await prisma.producto.delete({
//       where: {
//         id: Number(params.id)
//       }
//     })

//     if (!deletedProduct) {
//       return NextResponse.json({
//         message: "Product not found",
//         status: 404
//       })
//     }
  
//     return NextResponse.json(deletedProduct)
//   } catch(error) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2025") {
//         return NextResponse.json({
//           message: "Product not found"
//         }, {
//           status: 404
//         })
//       }

//       return NextResponse.json({
//         message: error.message
//       }, {
//         status: 500
//       })
//     }
//   }
// }

// export async function PUT(request: Request, { params }: Params) {
//  ...
// }
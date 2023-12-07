import { NextResponse } from "next/server";
import { prisma } from "@/src/libs/prisma"

interface Params {
  params: { id: string }
}

export async function POST(request: Request, { params }: Params) {
  try {
    const ordenActualizada = await prisma.orden.update({
      where: {
        id: Number(params.id)
      },
      data: {
        estado: true
      }
    })

    if (!ordenActualizada) {
      return NextResponse.json({
        message: "Orden not found",
        status: 404
      })
    }
  
    return NextResponse.json(ordenActualizada)
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
import { NextResponse } from "next/server";
import { prisma } from "@/src/libs/prisma"

export async function GET() {
  try {
    const ordenes = await prisma.orden.findMany({
      where: {
        estado: false
      }
    });

    return NextResponse.json(ordenes)
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, pedido, total, fecha } = body;

    const nuevoPedido = await prisma.orden.create({
      data: {
        nombre,
        total,
        pedido,
        fecha
      }
    })
  
    return NextResponse.json(nuevoPedido)
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

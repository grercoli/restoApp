import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined;
}

// con esto podemos llamar la conexion a Prisma
export const prisma = global.prisma || new PrismaClient();

// setear la variable global con prisma solo si es en modo desarrollo
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

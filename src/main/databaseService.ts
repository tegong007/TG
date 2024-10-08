import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addLog(message: string): Promise<void> {
  await prisma.log.create({
    data: {
      message,
    },
  })
}

export async function getAllLogs() {
  return await prisma.log.findMany()
}

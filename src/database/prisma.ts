import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
    /**
     * Verifica se esta em ambiente de producao.
     * Se estiver em ambiente de desenvolvimento, exibimos as queries no log
     * 
     */
    log: process.env.NODE_ENV === "production" ? [] : ["query"]
})

export { prisma }
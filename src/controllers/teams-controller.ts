import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"

class TeamsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(5),
            description: z.string()
        })

        const { name, description } = bodySchema.parse(request.body)

        const team = await prisma.teams.create({
            data: {
                name, description
            }
        })

        response.json("Teams here!")
    }

    async index(request: Request, response: Response) {
        const teams = await prisma.teams.findMany()

        return response.json(teams)
    }

}

export { TeamsController }
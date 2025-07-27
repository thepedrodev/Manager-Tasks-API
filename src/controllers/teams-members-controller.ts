import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/appError"

class TeamsMembersController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            team_id: z.string().uuid()
        })

        const { team_id, user_id } = bodySchema.parse(request.body)

        const user = await prisma.user.findFirst(
            { where: { id: user_id } }
        )

        const team = await prisma.teams.findFirst(
            { where: { id: team_id } }
        )

        if (!user) {
            throw new AppError("This user dont exist")
        }

        if (!team) {
            throw new AppError("This team dont exist")
        }

        const teamMember = await prisma.teamMembers.create(
            { data: { userId: user_id, teamId: team_id } }
        )

        return response.json(teamMember)
    }

    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const member = await prisma.teamMembers.findFirst({
            where: { userId: id },
            include: { user: { select: { name: true } }, team: {select:{name: true}} }
        })

        return response.json(member)
    }
}

export { TeamsMembersController }
import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/appError"

class TasksController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            title: z.string().trim().min(5),
            description: z.string(),
            priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
            user_id: z.string().uuid(),
            team_id: z.string().uuid()
        })

        const { title, description, priority, team_id, user_id } = bodySchema.parse(request.body)

        const userReferenceTask = await prisma.user.findFirst({ where: { id: user_id } })

        if (!userReferenceTask) {
            throw new AppError("This user dont exist")
        }

        const teamReferenceTask = await prisma.teams.findFirst({ where: { id: team_id } })

        if (!teamReferenceTask) {
            throw new AppError("This team dont exist")
        }

        const task = await prisma.tasks.create(
            {
                data: {
                    title,
                    description,
                    priority,
                    teamId: team_id,
                    assignedToId: user_id
                }
            }
        )

        return response.json(task)
    }

    async index(request: Request, response: Response) {
        const user_id = request.user?.id

        const tasks = await prisma.tasks.findMany(
            {
                include: {
                    assignedTo: { select: { name: true } },
                    team: { select: { name: true } }

                },
                where: {
                    assignedToId: user_id
                }
            }
        )

        return response.json(tasks)
    }

    async delete(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const task = await prisma.tasks.findFirst({where:{id}})

        if(!task){
            throw new AppError("This tasks not exist")
        }

        await prisma.tasksHistory.deleteMany({where: {taskId:id}})

        await prisma.tasks.delete({where:{id}})

        return response.json(task)
    }
}

export { TasksController }
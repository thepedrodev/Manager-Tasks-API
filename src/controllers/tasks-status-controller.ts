import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/appError"

class TasksStatusController {
    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const bodySchema = z.object({
            changed_by: z.string(),
            old_status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
            new_status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"])
        })

        const { id } = paramsSchema.parse(request.params)
        const { changed_by, old_status, new_status } = bodySchema.parse(request.body)

        const task = await prisma.tasks.findFirst({ where: { id } })

        if (!task) throw new AppError("This task does not exist")

        const author = await prisma.user.findFirst({ where: { id: changed_by } })

        if (!author) throw new AppError("This author does not exist")

        if (old_status !== task.status) throw new AppError("Invalid old status")

        if (new_status === old_status) throw new AppError("Unable to change to current state")

        await prisma.tasks.update({ where: { id }, data: { status: new_status } })

        await prisma.tasksHistory.create({
            data: {
                taskId: id,
                changedBy: changed_by,
                newStatus: new_status,
                oldStatus: old_status,
                changedAt: new Date()
            }
        })

        return response.status(204).send()
    }
}

export { TasksStatusController }

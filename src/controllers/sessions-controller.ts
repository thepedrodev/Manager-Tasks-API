import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/appError"
import { z } from "zod"
import { compare } from "bcrypt"
import { authConfig } from "@/configs/authConfig"
import jwt from "jsonwebtoken"
import { env } from "@/env"

class SessionsController {
    async create(request: Request, response: Response, next: NextFunction) {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string()
        })

        const { email, password } = bodySchema.parse(request.body)

        const user = await prisma.user.findFirst({
            where: { email }
        })

        if (!user) {
            throw new AppError("This user dont exist")
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError("Invalid Email or password")
        }

        const { expiresIn } = authConfig.jwt

        const token = jwt.sign({ role: user.role ?? "MEMBER" }, env.JWT_SECRET, {
            subject: user.id,
            expiresIn
        })

        const { password: hashedPassword, ...userWithoutPassword } = user

        return response.json({ token, user: userWithoutPassword })
    }
}

export { SessionsController }
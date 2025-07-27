import { z } from "zod"

const environmentSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string()
})

const env = environmentSchema.parse(process.env)

export { env }
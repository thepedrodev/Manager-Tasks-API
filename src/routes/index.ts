import { Router } from "express";
import { usersRoutes } from "@/routes/users-routes"
import { sessionRoutes } from "@/routes/sessions-routes"
import { teamsRoutes } from "@/routes/teams-routes"
import { teamsMembersRoutes } from "@/routes/teams-members-routes"
import { tasksRoutes } from "@/routes/tasks-routes"

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/teams", teamsRoutes)
routes.use("/teams-members", teamsMembersRoutes)
routes.use("/tasks", tasksRoutes)

export { routes }
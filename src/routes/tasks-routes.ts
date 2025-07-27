import { Router } from "express"
import { TasksController } from "@/controllers/tasks-controller"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"
import { TasksStatusController } from "@/controllers/tasks-status-controller"

const tasksRoutes = Router()
const tasksController = new TasksController()
const tasksStatusController = new TasksStatusController()

tasksRoutes.use(ensureAuthenticated)

tasksRoutes.post("/", verifyUserAuthorization(["ADMIN"]), tasksController.create)
tasksRoutes.patch("/:id/status", tasksStatusController.update)
tasksRoutes.get("/", tasksController.index)
tasksRoutes.delete("/:id", verifyUserAuthorization(["ADMIN"]), tasksController.delete)

export { tasksRoutes }
import { Router } from "express"
import { TeamsController } from "@/controllers/teams-controller"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.use(ensureAuthenticated)
teamsRoutes.use(verifyUserAuthorization(["ADMIN"]))

teamsRoutes.post("/", teamsController.create)
teamsRoutes.get("/" ,teamsController.index)

export { teamsRoutes }
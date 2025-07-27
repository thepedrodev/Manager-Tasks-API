import { Router } from "express";
import { TeamsMembersController } from "@/controllers/teams-members-controller"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamsMembersRoutes = Router()
const teamsMembersController = new TeamsMembersController()

teamsMembersRoutes.use(ensureAuthenticated)
teamsMembersRoutes.use(verifyUserAuthorization(["ADMIN"]))

teamsMembersRoutes.post("/", teamsMembersController.create)
teamsMembersRoutes.get("/:id", teamsMembersController.show)

export { teamsMembersRoutes }
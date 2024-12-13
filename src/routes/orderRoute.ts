import Express, {Router} from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import catchAsync from "../services/catchAsync";
import OrderController from "../controllers/OrderController";


const router:Router = Express.Router()



router.route("/").post(authMiddleware.isAuthenticated,catchAsync(OrderController.createOrder))



export default router
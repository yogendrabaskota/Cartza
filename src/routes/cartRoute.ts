import Express, {Router} from "express";
import cartController from "../controllers/cartController";
import catchAsync from "../services/catchAsync";
import authMiddleware from "../middleware/authMiddleware";

const router:Router = Express.Router()



router.route("/")
    .post(authMiddleware.isAuthenticated,catchAsync(cartController.addToCart))
    .get(authMiddleware.isAuthenticated, catchAsync(cartController.getMyCart))

export default router
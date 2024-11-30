import Express, {Router} from "express";
import cartController from "../controllers/cartController";
import catchAsync from "../services/catchAsync";
import authMiddleware from "../middleware/authMiddleware";

const router:Router = Express.Router()



router.route("/")
    .post(authMiddleware.isAuthenticated,catchAsync(cartController.addToCart))
    .get(authMiddleware.isAuthenticated, catchAsync(cartController.getMyCart))

router.route(":/productId")
    .delete(authMiddleware.isAuthenticated, catchAsync(cartController.deleteMyCartItem))
   // .patch(authMiddleware.isAuthenticated, catchAsync(cartController.updateCartItem))

export default router
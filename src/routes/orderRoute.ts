import Express, {Router} from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import catchAsync from "../services/catchAsync";
import OrderController from "../controllers/OrderController";


const router:Router = Express.Router()



router.route("/")
    .post(authMiddleware.isAuthenticated,catchAsync(OrderController.createOrder))
router.route('/verify')
    .post(authMiddleware.isAuthenticated,catchAsync(OrderController.verifyTransaction))
router.route('/customer')
    .post(authMiddleware.isAuthenticated,catchAsync(OrderController.fetchMyOrders))


router.route('/customer/:id')
    .patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Customer),catchAsync(OrderController.cancelMyOrder))
    .get(authMiddleware.isAuthenticated,catchAsync(OrderController.fetchOrderDetails))

export default router
import Express, {Router} from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import catchAsync from "../services/catchAsync";
import OrderController from "../controllers/OrderController";


const router:Router = Express.Router()



router.route("/")
    .post(authMiddleware.isAuthenticated,catchAsync(OrderController.createOrder))
    .get(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),catchAsync(OrderController.fetchAllOrders))
router.route('/verify')
    .post(authMiddleware.isAuthenticated,catchAsync(OrderController.verifyTransaction))
router.route('/customer')
    .get(authMiddleware.isAuthenticated,catchAsync(OrderController.fetchMyOrders))


router.route('/customer/:id')
    .patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Customer),catchAsync(OrderController.cancelMyOrder))
    .get(authMiddleware.isAuthenticated,catchAsync(OrderController.fetchOrderDetails))

router.route("/admin/payment/:id")
    .patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),catchAsync(OrderController.changePaymentStatus))


router.route("/admin/:id")
    .patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),catchAsync(OrderController.changeOrderStatus))
    .delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),catchAsync(OrderController.deleteOrder))



export default router
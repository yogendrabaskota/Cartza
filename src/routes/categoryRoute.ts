import Express, {Router} from "express";
import categoryController from "../controllers/categoryController";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import catchAsync from "../services/catchAsync";


const router:Router = Express.Router()



router.route("/")
    .post(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Admin),catchAsync(categoryController.addCategory))
    .get(catchAsync(categoryController.getCategories))

router.route("/:id")
    .delete(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Admin), catchAsync(categoryController.deleteCategory))
    .patch(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Admin), catchAsync(categoryController.updateCategory))


export default router
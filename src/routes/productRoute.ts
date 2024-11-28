import Express, {Router} from "express";
import catchAsync from "../services/catchAsync";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import productController from "../controllers/productController";
import {multer, storage} from '../middleware/multerMiddleware'


const upload = multer({storage : storage})
const router:Router = Express.Router()



router.route("/")
    .post(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Admin),upload.single('image'),catchAsync(productController.addProduct))
    .get(catchAsync(productController.getAllProduct))
router.route("/:id")
    .get(productController.getSingleProduct)
    .delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),catchAsync(productController.deleteProduct))

export default router
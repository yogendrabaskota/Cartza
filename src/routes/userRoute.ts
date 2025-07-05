import express,{Router} from 'express'
import AuthController from '../controllers/userController'
import catchAsync from '../services/catchAsync'
import authMiddleware, { Role } from '../middleware/authMiddleware'
const router:Router = express.Router()


router.route("/register")
    .post(catchAsync(AuthController.registeruser))
router.route("/login")
    .post(catchAsync(AuthController.loginUser))

router.route("/users")
    .get(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Admin),catchAsync(AuthController.fetchAllUsers))

    
export default router 
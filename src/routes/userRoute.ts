import express,{Router} from 'express'
import AuthController from '../controllers/userController'
import catchAsync from '../services/catchAsync'
const router:Router = express.Router()


router.route("/register")
    .post(catchAsync(AuthController.registeruser))
router.route("/login")
    .post(catchAsync(AuthController.loginUser))



    
export default router 
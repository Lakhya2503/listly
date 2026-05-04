import { Router } from "express";
import AuthRouter from '../modules/user/user.route'


const router = Router()


router.use("/auth" , AuthRouter)


export default router;

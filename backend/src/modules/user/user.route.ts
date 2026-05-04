import { Router } from "express";
import { getUser, loginUser, logoutUser, registerUser } from "./user.controller";
import { verifyJWT } from '../../middleware/auth.middleware';

const router = Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.use(verifyJWT as any)

router.get("/get-me" ,getUser)

router.get("/logout",  logoutUser)


export default router;

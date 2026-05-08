import { Router } from "express";
import { getUser, loginUser, logoutUser, registerUser, updateUserAvatar } from "./user.controller";
import { verifyJWT } from '../../middleware/auth.middleware';
import { uploadImage } from "../../middleware/multer.middleware";

const router = Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.use( verifyJWT as any)

router.get("/get-me" ,getUser)

router.get("/logout",  logoutUser)

router.put("/update-avatar",uploadImage.fields([
  {
    name : "avatar",
    maxCount : 1
  }
]) , updateUserAvatar)

export default router;

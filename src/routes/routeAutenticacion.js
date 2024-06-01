import { Router } from "express";
import  {Login}  from "../controllers/LoginControllers.js";

const authRouter = Router();

authRouter.post('/login', Login);

export default authRouter;
import { Router } from "express";
import { register, login } from "../controllers/user.controllers.js";

const route = Router();

route.post("/user/signin", login);
route.post("/user/signup", register);

export default route;

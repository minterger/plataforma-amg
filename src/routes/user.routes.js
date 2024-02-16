import { Router } from "express";
import { register } from "../controllers/user.controllers.js";

const route = Router();

route.post("/user/signin");
route.post("/user/signup", register);

export default route;

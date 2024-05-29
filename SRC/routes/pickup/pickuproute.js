import express from "express";
import {requestPickup,getAllrequest} from '../../controllers/pickupcontroller.js'
import protectRoute from "../../middleware/protectedapp.js";


const router = express.Router()

router.post("/request",protectRoute,requestPickup)
router.get('/',getAllrequest)

export default router;
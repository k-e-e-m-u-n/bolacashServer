import express from "express";
import {requestPickup,getAllrequest,cancelSingleOrder,updateOrderStatus} from '../../controllers/pickupcontroller.js'
import protectRoute from "../../middleware/protectedapp.js";


const router = express.Router()

router.post("/request",protectRoute,requestPickup)
router.get('/',protectRoute,getAllrequest)


router.put("/order/:id/status",protectRoute,updateOrderStatus)
router.delete("/cancelOrder/:id",protectRoute,cancelSingleOrder)

export default router;
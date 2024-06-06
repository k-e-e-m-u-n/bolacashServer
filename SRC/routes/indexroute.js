import express from "express";
import authroute from '../routes/auth/authroute.js'
import pickuproute from '../routes/pickup/pickuproute.js'
import ecotipsroute from '../routes/ecotips/ecotipsroute.js'

const router = express.Router()

router.use('/auth', authroute)
router.use('/pickup', pickuproute)
router.use('/ecotips',ecotipsroute)

export default router;

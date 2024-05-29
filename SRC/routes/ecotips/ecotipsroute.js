import express from 'express';
import { createPost, deletePost, getAllPosts, getSinglePost } from "../../controllers/ecotipscontroller.js";


const router = express.Router()

router.post("/add",createPost)
router.get("/",getAllPosts)
router.get("/:id",getSinglePost)
router.delete("/:id",deletePost)

export default router
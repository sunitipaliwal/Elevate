import express from "express"

import {
analyzeResume,
generateOptimizedResume,
saveOptimizedResume
} from "../../controllers/optimizer/optimizer.controller.js"

import { protect } from "../../middlewares/auth.middleware.js"

const router = express.Router()

router.post(
"/analyze",
protect,
analyzeResume
)

router.post(
"/generate",
protect,
generateOptimizedResume
)



router.post(
  "/save",
  protect,
  saveOptimizedResume
)

export default router
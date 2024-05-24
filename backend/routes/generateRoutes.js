import { Router } from "express";
import {
  generateCopy,
  insertCopy,
  regenerateCopy,
} from "../controllers/generateController.js";

const router = Router();

// Route for generating copy
router.post("/generate", generateCopy);

// Route for inserting generated copy into the database
router.post("/insert", insertCopy);

// Route for regenerating copy based on user selection
router.post("/regenerate", regenerateCopy);

export default router;

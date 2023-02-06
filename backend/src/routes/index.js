import express from 'express';

import allRouter from "./allRouter"
const router = express.Router();

router.use('/all', allRouter);
export default router;

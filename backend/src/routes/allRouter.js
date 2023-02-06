import express from 'express';
import { del, list, save ,update} from '../controllers/allController';

const router = express.Router();
router.get("/list",list);
router.post("/save",save)
router.delete('/del/:name?', del);
router.put('/uptade/:_id',update);



export default router;
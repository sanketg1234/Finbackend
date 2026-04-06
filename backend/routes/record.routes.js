import express from 'express';
import { 
    createRecord, 
    getRecords, 
    updateRecord, 
    deleteRecord 
} from '../controllers/record.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect); 

router.get('/', authorize('Analyst', 'Admin'), getRecords);
router.post('/', authorize('Admin'), createRecord);
router.put('/:id', authorize('Admin'), updateRecord);
router.delete('/:id', authorize('Admin'), deleteRecord);

export default router;
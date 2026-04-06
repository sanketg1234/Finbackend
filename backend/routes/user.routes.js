import express from 'express';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import { registerUser, loginUser, getUserById,
    getUsers, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.use(protect);
router.use(authorize('Admin'));

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
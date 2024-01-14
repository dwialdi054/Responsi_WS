import express from "express";
import {
    getUsers,
    getUserById,
    createUsers,
    updateUsers,
    deleteUsers
} from "../controllers/UserController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/users', createUsers);
router.put('/users/:id', verifyUser, adminOnly, updateUsers);
router.delete('/users/:id', verifyUser, adminOnly, deleteUsers);

export default router;
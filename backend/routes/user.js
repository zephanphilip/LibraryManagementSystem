const express = require('express');
const { signupUser, loginUser, addNotification, getNotifications, getUserDetails,updateUserDetails,getAllUsers,blockUser, deleteUser } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/signup', signupUser);

// Protected routes
router.use(requireAuth);

router.get('/notifications', getNotifications);
router.post('/notifications', addNotification);

router.get('/me', getUserDetails);
router.put('/me', updateUserDetails);

router.get('/all', getAllUsers);
router.delete('/:id', deleteUser);
router.patch('/block/:id', blockUser);

module.exports = router;


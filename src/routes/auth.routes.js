const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const router = express.Router();
const { registerUserSchema, loginUserSchema } = require('../validators');
const validateRequest = require('../middleware/validateMiddleware');

router.post('/register', validateRequest(registerUserSchema), register);
router.post('/login', validateRequest(loginUserSchema), login);

module.exports = router;
